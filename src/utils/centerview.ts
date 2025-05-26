export function centerCanvasView() {
  viewPort?.updateContainerSize();
  const canvas = document.querySelector(".jsoncrack-canvas");
  if (canvas) {
    viewPort?.camera?.centerFitElementIntoView(canvas);
  }
}
