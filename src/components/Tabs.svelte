<script lang="ts">
  import type { SvelteComponent } from "svelte";

  export let tabs: { label: string; component: typeof SvelteComponent }[];
  export let initSelectedNr = 0;

  let selected = tabs[initSelectedNr];
</script>

<div class="tabs">
  {#each tabs as tab}
    <button
      class={tab === selected ? "active" : ""}
      on:click={() => (selected = tab)}>{tab.label}</button
    >
  {/each}
</div>

<svelte:component this={selected.component} />

<style>
  /* Style the tab */
  .tabs {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
  }

  /* Style the buttons inside the tab */
  .tabs button {
    background-color: inherit;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
  }

  /* Change background color of buttons on hover */
  .tabs button:hover {
    background-color: #ddd;
  }

  /* Create an active/current tablink class */
  .tabs button.active {
    background-color: #ccc;
  }
</style>
