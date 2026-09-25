#!/usr/bin/env sh
# Rebuilds the two self-hosted font files from their Fontsource packages:
#   src/assets/fonts/big-shoulders-subset.woff2  headings (heavy condensed grotesk)
#   src/assets/fonts/archivo-subset.woff2        body text (weight axis only)
# Only the characters an English site uses are kept. Needs Python fonttools + brotli:
#   pip install fonttools brotli
set -e
UNICODES="U+0020-007E,U+00A0,U+00A9,U+00B7,U+00D7,U+00E9,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2022,U+2026,U+2032,U+2033,U+2190,U+2192,U+2212"
FEATURES="kern,liga,calt,tnum,lnum,case,ccmp,locl,mark,mkmk"

pyftsubset node_modules/@fontsource-variable/big-shoulders-display/files/big-shoulders-display-latin-wght-normal.woff2 \
  --output-file=src/assets/fonts/big-shoulders-subset.woff2 --flavor=woff2 \
  --unicodes="$UNICODES" --layout-features="$FEATURES" --no-hinting --desubroutinize

pyftsubset node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2 \
  --output-file=src/assets/fonts/archivo-subset.woff2 --flavor=woff2 \
  --unicodes="$UNICODES" --layout-features="$FEATURES" --no-hinting --desubroutinize

ls -l src/assets/fonts/*.woff2
