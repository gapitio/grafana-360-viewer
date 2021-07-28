<script lang="ts">
  import { currentSceneKeyStore } from "../../stores";

  export let go_to_scene_key: number | null;

  function goToScene() {
    if (!go_to_scene_key) {
      console.warn("Missing go_to_scene_key");
      return;
    }
    if (customProperties.editable) return;

    currentSceneKeyStore.setKey(go_to_scene_key);
  }
</script>

<div class="hotspot" on:click={goToScene}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 95 95"
  >
    <g id="Group_2" data-name="Group 2" transform="translate(-1406 -828)">
      <circle
        id="Ellipse_1"
        data-name="Ellipse 1"
        cx="47.5"
        cy="47.5"
        r="47.5"
        transform="translate(1406 828)"
        fill="#1b191c"
        opacity="0.88"
      />
      <path
        id="Path_1"
        data-name="Path 1"
        d="M846.277,2011.457l19.539-19.539,19.539,19.539"
        transform="translate(587.223 -1126.417)"
        fill="none"
        stroke="#f5f5f5"
        stroke-width="5"
      />
    </g>
  </svg>
</div>

<style>
  .hotspot {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }
</style>
