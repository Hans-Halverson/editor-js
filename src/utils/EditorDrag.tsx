class EditorDrag {
  static _isDragging: boolean = false;

  static isDragging(): boolean {
    return EditorDrag._isDragging;
  }

  static startDragging() {
    EditorDrag._isDragging = true;
  }

  static init() {
    document.body.addEventListener(
      "mouseup",
      () => {
        EditorDrag._isDragging = false;
      },
      true
    );
  }
}

export default EditorDrag;
