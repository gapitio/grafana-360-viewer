window.htmlNode = document
  .getElementById("shadow-container")
  .attachShadow({ mode: "open" }) as HTMLNode;

htmlNode.onpanelupdate = () => null;

htmlNode.innerHTML = `<style>@import "./build/bundle.css"</style><div></div>`;
