<script lang="ts">
  export let value: number;
</script>

<div>
  <slot />
  <input type="number" bind:value />
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
  }
</style>
