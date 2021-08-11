<script lang="ts">
  export let deleteFunc: () => void;

  let active = false;
</script>

<div>
  {#if active}
    <button class="confirm" on:click={deleteFunc}>Confirm deletion</button>
    <button class="cancel" on:click={() => (active = false)}>Cancel</button>
  {:else}
    <button on:click={() => (active = true)}>Delete</button>
  {/if}
</div>

<style>
  div {
    display: flex;
  }

  button {
    width: 100%;
  }

  .confirm {
    background-color: lightgreen;
  }

  .cancel {
    background-color: lightcoral;
  }
</style>
