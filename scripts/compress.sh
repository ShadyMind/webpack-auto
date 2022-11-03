#/bin/sh

for file in `find "./build" -type "f" -name "*.js"`; do
  base_name=$(basename $file '.js')
  terser $file \
    --compress \
    --output=./build/$base_name.min.js
done