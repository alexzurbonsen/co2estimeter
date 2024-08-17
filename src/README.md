Generating a color pallette with node

```
> var convert = require('color-convert');
undefined
> for (let i = 0; i < 40; i++) {}
undefined
> for (let i = 0; i < 40; i++) {
... const randomRed = Math.floor(Math.random() * 128) + 127;
... const hsl = convert.rgb.hsl(randomRed, 251, 27);
... console.log(`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`);
... }
```
