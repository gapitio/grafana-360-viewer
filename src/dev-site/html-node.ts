const shadowContainer = document.getElementById("shadow-container");

if (shadowContainer)
  window.htmlNode = shadowContainer.attachShadow({ mode: "open" }) as HTMLNode;

htmlNode.onpanelupdate = () => null;

htmlNode.innerHTML = `<style>@import "./build/bundle.css"</style><div></div>`;
