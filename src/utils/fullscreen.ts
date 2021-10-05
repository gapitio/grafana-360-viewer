export const toggleFullscreen = (
  e: KeyboardEvent & {
    currentTarget: EventTarget & HTMLElement;
  }
): void => {
  if (e.key === "f") {
    e.stopPropagation();
    if (htmlNode.fullscreenElement) document.exitFullscreen();
    else e.currentTarget.requestFullscreen();
  }
};
