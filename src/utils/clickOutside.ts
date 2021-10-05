/** Dispatch event on click outside of node */
export function clickOutside(node: HTMLElement): {
  destroy(): void;
} {
  const handleClick = (
    event: MouseEvent & {
      target: HTMLDivElement;
    }
  ) => {
    if (
      node &&
      !event.composedPath().includes(node) &&
      !event.defaultPrevented
    ) {
      node.dispatchEvent(new CustomEvent<HTMLElement>("outsideclick"));
    }
  };

  htmlNode.addEventListener("mousedown", handleClick, true);

  return {
    destroy() {
      htmlNode.removeEventListener("mousedown", handleClick, true);
    },
  };
}
