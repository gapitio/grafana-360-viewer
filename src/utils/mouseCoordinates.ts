import { get } from "svelte/store";
import { mouseCoordinates, viewerStore } from "~/stores";

export const updateMouseCoordinates = (
  e: MouseEvent & {
    currentTarget: EventTarget & HTMLDivElement;
  }
): void => {
  if (!e.altKey) mouseCoordinates.set(getMouseCoordinates(e));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getMouseCoordinates = (
  e: MouseEvent
): { pitch: number; yaw: number } => {
  const viewer = get(viewerStore);

  if (!(viewer && viewer.view())) return { pitch: 0, yaw: 0 };

  const { x: offsetX, y: offsetY } = viewer
    .domElement()
    .getBoundingClientRect();

  const x = e.x - offsetX;
  const y = e.y - offsetY;

  return viewer.view().screenToCoordinates({ x, y });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const logMouseCoordinates = (e: MouseEvent): void => {
  console.info("Mouse Coordinates", getMouseCoordinates(e));
};
