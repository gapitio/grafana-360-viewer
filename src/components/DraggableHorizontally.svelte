<script lang="ts">
  export let width: number;

  let offset: number;

  function onMouseDown(event: MouseEvent) {
    offset = event.x - width;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(event: MouseEvent) {
    width = event.x - offset;

    if (width < 100) width = 100;
    else if (width > window.innerWidth - 100) width = window.innerWidth - 100;
  }

  function onMouseUp() {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }
</script>

<div class="draggable" on:mousedown={onMouseDown} />

<style>
  .draggable {
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    width: 12px;
    transform: translateX(12px);
    cursor: e-resize;
    user-select: none;
  }
</style>
