import { resetFov } from "./fov";
import { toggleFullscreen } from "./fullscreen";

export const onKeyInput = (
  e: KeyboardEvent & {
    currentTarget: EventTarget & HTMLElement;
  }
): void => {
  switch (e.key) {
    case "f":
      e.stopPropagation();
      toggleFullscreen(e.currentTarget);
      break;

    case "r":
      resetFov();
      break;
  }
};
