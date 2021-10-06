<script lang="ts">
  import { viewerStore } from "~/stores";
  import GeneralInfo from "./GeneralInfo.svelte";
  import MouseCoordinates from "./MouseCoordinates.svelte";
  import ViewCoordinates from "./ViewCoordinates.svelte";
</script>

<div class="dev-info">
  {#if $viewerStore}
    <GeneralInfo viewer={$viewerStore} />
    <ViewCoordinates viewer={$viewerStore} />
    <MouseCoordinates />
  {/if}
</div>

<style>
  .dev-info {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    padding: 10px 20px;
    color: #fcfcfc;
    background-color: #1b191c55;
  }

  .dev-info > :global(div:not(:last-child)) {
    margin-right: 20px;
  }
</style>
