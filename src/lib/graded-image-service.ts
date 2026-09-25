// Astro's sharp image service with one house grade applied first, so stock
// photos and AI-generated interiors read as one set. Every photo that goes
// through astro:assets (all of src/assets/photos/) gets it at build time,
// then Astro resizes and encodes to AVIF/WebP as usual.
import sharpService from 'astro/assets/services/sharp';
import sharp from 'sharp';
import type { LocalImageService } from 'astro';

// Slightly muted colour, shadows lifted and pushed cool (towards slate),
// highlights left almost untouched. Output = gain * input + lift, per channel.
// Tune here: saturation 1 = unchanged; lift = where pure black lands (a cool slate).
export const HOUSE_GRADE = {
  saturation: 0.9,
  gain: [0.95, 0.955, 0.94] as [number, number, number],
  lift: [6, 10, 18] as [number, number, number],
};

// Part of every image's filename hash, so changing the grade re-renders every
// photo instead of reusing a cached ungraded (or differently graded) file.
const GRADE_KEY = `s${HOUSE_GRADE.saturation}g${HOUSE_GRADE.gain.join('_')}l${HOUSE_GRADE.lift.join('_')}`;

const gradedService: LocalImageService = {
  ...sharpService,
  propertiesToHash: ['src', 'width', 'height', 'format', 'quality', 'fit', 'position', 'background', 'grade'],
  async validateOptions(options, imageConfig, logger) {
    const validated = sharpService.validateOptions
      ? await sharpService.validateOptions(options, imageConfig, logger)
      : options;
    return { ...validated, grade: GRADE_KEY };
  },
  async transform(inputBuffer, transform, config, logger) {
    let graded = inputBuffer;
    try {
      const data = await sharp(inputBuffer, { failOn: 'none' })
        .rotate() // apply EXIF orientation before the metadata is dropped
        .modulate({ saturation: HOUSE_GRADE.saturation })
        .linear(HOUSE_GRADE.gain, HOUSE_GRADE.lift)
        .png({ compressionLevel: 1 }) // lossless hand-off; Astro encodes the final AVIF/WebP
        .toBuffer();
      graded = new Uint8Array(data);
    } catch {
      logger.warn(`Could not grade "${transform.src}", using it ungraded.`);
    }
    return sharpService.transform(graded, transform, config, logger);
  },
};

export default gradedService;
