// Finds the photo file for a slot in src/assets/photos/, if one has been added.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

export const findPhoto = (name: string): ImageMetadata | undefined =>
  Object.entries(files).find(([file]) => file.split('/').pop()?.replace(/\.[a-z]+$/i, '') === name)?.[1].default;
