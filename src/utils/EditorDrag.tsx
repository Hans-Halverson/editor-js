class EditorDrag {
  static _isDragging: boolean = false;

  static isDragging(): boolean {
    return EditorDrag._isDragging;
  }

  static startDragging() {
    EditorDrag._isDragging = true;
  }

  static stopDragging() {
    EditorDrag._isDragging = false;
  }

  static init() {
    window.addEventListener("mouseup", EditorDrag.stopDragging, true);
  }
}

export default EditorDrag;
