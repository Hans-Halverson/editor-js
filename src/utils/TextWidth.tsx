class TextWidth {
  static charWidth: number;

  static init() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context == null) {
      return;
    }

    context.font = "14px/21px Consolas, 'Liberation Mono', Courier, monospace";
    const metrics = context.measureText(" ");

    TextWidth.charWidth = metrics.width;
  }

  static getCharWidth(): number {
    return TextWidth.charWidth;
  }
}

export default TextWidth;
