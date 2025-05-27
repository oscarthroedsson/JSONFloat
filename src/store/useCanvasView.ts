import { create } from "zustand";
import type { ViewPort } from "react-zoomable-ui/dist/ViewPort";

interface InitalCanvas {
  view: ViewPort | null;
}

interface CanvasAction {
  setView: (viewPort: ViewPort) => void;

  setViewCenter: () => void;
  setZoomFactor: (zoom: number) => void;
  setGraphPosition: (
    position: { x: "left" | "center" | "right"; y: "top" | "center" | "bottom" },
    zoom: number
  ) => void;
}

const initialCanvas: InitalCanvas = {
  view: null,
};

export const useCanvasView = create<InitalCanvas & CanvasAction>((set, get) => ({
  ...initialCanvas,
  setView: (view: ViewPort) => {
    console.log("🧨 SETTING VIEW: ", view);
    set({ view });
  },
  setViewCenter: () => {
    const viewPort = get().view;
    if (!viewPort) return;
    console.log("INSIDE CENTER VIEW");

    const canvas = document.querySelector("._container_1ryvh_1") as HTMLElement | null;
    if (!canvas) return;

    console.log("✅ Centering canvas:", canvas);

    requestAnimationFrame(() => {
      viewPort.updateContainerSize();
      viewPort.camera?.centerFitElementIntoView(canvas);
      console.log("📸 Called centerFitElementIntoView");
    });
  },
  setZoomFactor: (zoom: number) => {
    const viewPort = get().view;
    if (!viewPort) return;

    viewPort.camera?.recenter(viewPort.centerX, viewPort.centerY, zoom);
  },
  // does not work
  setGraphPosition: (position: { x: "left" | "center" | "right"; y: "top" | "center" | "bottom" }, zoomFactor = 1) => {
    const viewPort = get().view;
    if (!viewPort) return;

    viewPort.updateContainerSize();

    const contentWidth = viewPort.width ?? 0;
    const contentHeight = viewPort.height ?? 0;

    let targetX = 0;
    let targetY = 0;

    // Horizontal position
    if (position.x === "center") targetX = 0;
    else if (position.x === "right") targetX = -contentWidth / 2; // right
    else targetX = contentWidth / 2; // ⬅️ left

    // Vertical position
    if (position.y === "center") targetY = viewPort.centerY;
    else if (position.y === "bottom") targetY = contentHeight;
    else targetY = contentHeight; // top

    console.log({ targetX, targetY });
    requestAnimationFrame(() => {
      setTimeout(() => viewPort.camera.recenter(targetX, targetY, zoomFactor));
    });
  },
}));
