export const toggleFullscreen = (
  e: KeyboardEvent & {
    currentTarget: EventTarget & HTMLElement;
  }
): void => {
  if (e.key === "f") {
    if (htmlNode.fullscreenElement) document.exitFullscreen();
    else e.currentTarget.requestFullscreen();
  }
};
