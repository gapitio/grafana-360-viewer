window.htmlNode = document
  .getElementById("shadow-container")
  .attachShadow({ mode: "open" }) as HTMLNode;

htmlNode.onpanelupdate = () => null;

htmlNode.innerHTML = `<style>@import "./build/bundle.css"</style>
<div
  id="panorama-container"
  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
>
  <div id="hotspot">Drag me</div>
</div>`;
