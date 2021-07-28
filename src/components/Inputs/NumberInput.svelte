<script lang="ts">
  export let value: number | null;
  export let step = 1;
</script>

<div>
  <slot />
  <input type="number" bind:value {step} />
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
  }
</style>
