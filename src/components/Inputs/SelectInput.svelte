<script lang="ts">
  import Select from "svelte-select";

  export let items: { label: string; value: string | number }[];
  export let value: string | number;

  let selectedOption = items.find((option) => option.value == value);

  $: value = selectedOption?.value;
</script>

<div>
  <slot />
  <div class="select-container">
    <Select bind:value={selectedOption} {items} isCreatable />
  </div>
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
  }

  .select-container {
    --height: 22px;
    --inputPadding: 2px;
    --itemPadding: 4px;
    --inputFontSize: 13.3333px;
    --border-radius: 2px;
    --margin: 1px 0 0 1px;
    --clearSelectTop: 1px;
    --clearSelectBottom: 0;

    display: inline-block;
    color: black;
    width: 158px;
    font-size: var(--inputFontSize);
    margin-left: 10px;
  }

  :global(.selectContainer) {
    padding: 2px !important;
  }
</style>
