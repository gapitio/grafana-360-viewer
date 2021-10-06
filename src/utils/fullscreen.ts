export const toggleFullscreen = (elt: HTMLElement): void => {
  if (htmlNode.fullscreenElement) document.exitFullscreen();
  else elt.requestFullscreen();
};
