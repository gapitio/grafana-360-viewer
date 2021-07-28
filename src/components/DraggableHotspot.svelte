<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { viewerStore } from "../stores";

  export let hotspot: any;
  export let editable: boolean;

  const viewer = $viewerStore;

  const dispatch =
    createEventDispatcher<{ newposition: { yaw: number; pitch: number } }>();

  let element: HTMLElement;
  let lastX: number, lastY: number;

  function onMouseDown(
    event: MouseEvent & {
      currentTarget: EventTarget & HTMLElement;
    }
  ) {
    lastX = event.x;
    lastY = event.y;

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(
    event: MouseEvent & {
      currentTarget: EventTarget & HTMLElement;
    }
  ) {
    const { x: offsetX, y: offsetY } = viewer
      .domElement()
      .getBoundingClientRect();

    const { x: elementX, y: elementY } = element.getBoundingClientRect();

    const deltaX = event.x - lastX;
    const deltaY = event.y - lastY;

    const x = deltaX + elementX - offsetX;
    const y = deltaY + elementY - offsetY;

    lastX = event.x;
    lastY = event.y;

    hotspot.setPosition(viewer.view().screenToCoordinates({ x, y }));
  }

  function onMouseUp() {
    console.info("Hotspot position", hotspot.position());
    dispatch("newposition", hotspot.position());

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }
</script>

{#if editable}
  <div bind:this={element} on:mousedown={onMouseDown} class="draggable">
    <slot />
  </div>
{:else}
  <div>
    <slot />
  </div>
{/if}

<style>
  .draggable {
    user-select: none;
    cursor: move;
    position: absolute;
  }
</style>
