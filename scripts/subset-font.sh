#!/usr/bin/env sh
# Rebuilds src/assets/fonts/archivo-subset.woff2 from the Fontsource package.
# Keeps both variable axes (weight 100-900, width 62-125%) but only the
# characters an English site uses. Needs Python fonttools + brotli:
#   pip install fonttools brotli
set -e
SRC=node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2
OUT=src/assets/fonts/archivo-subset.woff2
pyftsubset "$SRC" \
  --output-file="$OUT" \
  --flavor=woff2 \
  --unicodes="U+0020-007E,U+00A0,U+00A9,U+00B7,U+00D7,U+00E9,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2022,U+2026,U+2032,U+2033,U+2190,U+2192,U+2212" \
  --layout-features="kern,liga,calt,tnum,lnum,case,ccmp,locl,mark,mkmk" \
  --no-hinting \
  --desubroutinize
ls -l "$OUT"
