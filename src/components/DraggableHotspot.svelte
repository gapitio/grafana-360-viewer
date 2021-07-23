<script lang="ts">
  import { viewerStore } from "../stores";

  export let hotspot: any;

  const viewer = $viewerStore;
  const { editable } = customProperties;

  let element: HTMLElement;
  let lastX: number, lastY: number;

  function onMouseDown(
    event: MouseEvent & {
      currentTarget: EventTarget & HTMLElement;
    }
  ) {
    lastX = event.x;
    lastY = event.y;

    viewer.controls().disable();

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
    viewer.controls().enable();
    console.info("Hotspot position", hotspot.position());

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }
</script>

{#if editable}
  <section bind:this={element} on:mousedown={onMouseDown} class="draggable">
    <slot />
  </section>
{:else}
  <slot />
{/if}

<style>
  .draggable {
    user-select: none;
    cursor: move;
    border: solid 1px gray;
    position: absolute;
  }
</style>
