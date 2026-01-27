#!/bin/bash
set -euo pipefail

# Check dependencies
missing=()
command -v oxipng >/dev/null 2>&1 || missing+=(oxipng)
command -v jpegoptim >/dev/null 2>&1 || missing+=(jpegoptim)

if [ ${#missing[@]} -gt 0 ]; then
  echo "Missing: ${missing[*]}"
  echo "Run: brew install ${missing[*]}"
  exit 1
fi

DIR="${1:-public/images/}"

if [ ! -d "$DIR" ]; then
  echo "Directory not found: $DIR"
  exit 1
fi

# Calculate size before
size_before=$(find "$DIR" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -exec stat -f%z {} + 2>/dev/null | awk '{s+=$1} END {print s+0}')

# Optimize PNGs
find "$DIR" -type f -iname '*.png' -exec oxipng -o 4 --strip safe {} +

# Optimize JPGs
find "$DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -exec jpegoptim --strip-all {} +

# Calculate size after
size_after=$(find "$DIR" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -exec stat -f%z {} + 2>/dev/null | awk '{s+=$1} END {print s+0}')

saved=$((size_before - size_after))
echo "Before: $((size_before / 1024))KB"
echo "After:  $((size_after / 1024))KB"
echo "Saved:  $((saved / 1024))KB"
