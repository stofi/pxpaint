# PxPaint

Simple pixel drawing app, that prints out coördinates of the pixels. Made to help me plot a drawing for [PixelBot 128](https://www.facebook.com/pixelbot128/) facebook page.

Try it [here](https://stofi.github.io/pxpaint)!

## Development

## Todo:

- Color picker
- Clear button
- Undo
- Number input min/max constrains
- Collapsable dialogs

## Discussion

- Capture pointer position in the Display component instead of on Pixel. 
- Implement the command pattern. Queue commands and draw pixels from queue.
- There are reactivity side-effect with objects, consider refactoring to an array. (There may be some performance issues.)