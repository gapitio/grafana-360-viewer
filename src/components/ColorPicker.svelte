<script lang="ts">
  import { clickOutside } from "../utils/clickOutside";
  import { hexToRGB } from "../utils/hexToRGB";

  export let value = "#48ADE0";

  let values = [["#7A36D2", "#17C1B6", "#48ADE0", "#D648E0"]];

  let toggled = false;
  let caratColor = "black";

  const toggleDropdown = () => (toggled = !toggled);

  const clickOutsideDropdown = () => (toggled = false);

  const changeValue = (innerValue: string) => {
    value = innerValue;
    toggled = false;
  };

  $: {
    const rgb = hexToRGB(value);

    const brightness =
      rgb && Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);

    caratColor = brightness > 125 ? "black" : "white";
  }
</script>

<div
  class="color-picker-holder"
  use:clickOutside
  on:outsideclick={clickOutsideDropdown}
>
  color
  <div class="color-picker-inner">
    <button
      class="select-color"
      style="background: {value}"
      on:click={toggleDropdown}
    >
      <div
        class="caret"
        class:toggled
        style="border-top-color: {caratColor}; border-bottom-color: {caratColor}"
      />
    </button>
    <input type="text" bind:value />
  </div>

  {#if toggled}
    <div class="values-dropdown">
      <div class="values-dropdown-grid">
        {#each values as val}
          {#each val as innerValue}
            <button
              class:active={innerValue == value}
              style="background: {innerValue};"
              on:click={() => changeValue(innerValue)}
              class="color-block"
            />
          {/each}
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .color-picker-holder {
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .color-picker-inner {
    display: flex;
    height: 22px;
  }

  .select-color {
    border: 1px solid transparent;
    border-radius: 4px;
    margin-right: 0.4rem;
  }

  .caret {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #000;
  }

  .caret.toggled {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #000;
    border-top: none;
  }

  .active {
    box-shadow: inset 0 0 0 1px #fff, 0 0 3px 1px rgba(0, 0, 0, 0.25);
  }

  .color-block {
    border-radius: 0.2rem;
    width: 24px;
    height: 24px;
    line-height: 0;
    font-size: 0;
  }

  .values-dropdown {
    padding: 8px;
    position: absolute;
    z-index: 1;
    top: 40px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    cursor: default;
  }

  .values-dropdown-grid {
    grid-template-columns: repeat(2, 24px);
    grid-gap: 4px;
    display: grid;
  }

  .values-dropdown button {
    border: none;
  }
</style>
