import { get } from "svelte/store";
import { viewerStore } from "~/stores";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const logMousePosition = (e: MouseEvent): void => {
  const viewer = get(viewerStore);

  const { x: offsetX, y: offsetY } = viewer
    .domElement()
    .getBoundingClientRect();

  const x = e.x - offsetX;
  const y = e.y - offsetY;

  const mousePosition = viewer.scene().view().screenToCoordinates({ x, y });

  console.info("Mouse position", mousePosition);
};
