import { get, Writable } from "svelte/store";

/** Dispatch event on click outside of node */
export function clickOutside(
  node: HTMLElement,
  {
    attachToNode = htmlNode,
    ignoreNodes = [],
    ignoreNodesStores = [],
  }: {
    attachToNode?: Node;
    ignoreNodes?: Node[];
    ignoreNodesStores?: Writable<Node[]>[];
  } = {}
): {
  destroy(): void;
} {
  const handleClick = (
    event: MouseEvent & {
      target: Node;
    }
  ) => {
    const composedPath = event.composedPath();
    const nodes = [node, ...ignoreNodes].concat(
      ...ignoreNodesStores.map((store) => get(store))
    );

    if (
      !nodes.some((node) => composedPath.includes(node)) &&
      !event.defaultPrevented
    ) {
      node.dispatchEvent(new CustomEvent<HTMLElement>("outsideclick"));
    }
  };

  attachToNode.addEventListener("mousedown", handleClick, true);

  return {
    destroy() {
      attachToNode.removeEventListener("mousedown", handleClick, true);
    },
  };
}
