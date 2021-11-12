<script lang="ts">
  export let value: number | null;
  export let step = 1;
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
</script>

<div>
  <slot />
  <input type="number" bind:value {step} {min} {max} />
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
    white-space: pre;
  }

  input {
    margin-left: 10px;
    width: 150px;
  }
</style>
