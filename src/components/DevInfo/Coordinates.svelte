<script lang="ts">
  import InfoItem from "./InfoItem.svelte";

  export let pitch: number;
  export let yaw: number;
  export let decimals: number = 4;
</script>

<div class="container">
  <InfoItem label="Pitch" value={pitch.toFixed(decimals)} />
  <InfoItem label="Yaw" value={yaw.toFixed(decimals)} />
</div>

<style>
  .container {
    width: 100px;
  }
</style>
