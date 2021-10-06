<script lang="ts">
  import ViewPosition from "./ViewPosition.svelte";
</script>

<div class="dev-info"><ViewPosition /></div>

<style>
  .dev-info {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    padding: 20px;
    color: #fcfcfc;
    background-color: #1b191c55;
  }
</style>
