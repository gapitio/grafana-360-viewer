<script lang="ts">
  let elt: HTMLElement;
</script>

<div bind:this={elt} class="hotspot">Hello</div>

<style>
  div {
    color: white;
    transform: translate(-50%, -50%);
  }
</style>
