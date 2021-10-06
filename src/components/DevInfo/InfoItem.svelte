<script lang="ts">
  export let label: string;
  export let value: string;
</script>

<div>
  <span>{label}</span>
  <span>{value}</span>
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
  }
</style>
