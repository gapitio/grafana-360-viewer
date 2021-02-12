/*
  Loads on-render and executes it each time the refresh button is pressed
*/

import { updateData } from "./data";

function makeRequest(method: string, url: string) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}

function renderHandler() {
  updateData();
  // eslint-disable-next-line @typescript-eslint/ban-types
  let onRender: Function | null;
  const ON_RENDER_PATH = "./build/on-render.js";
  const SOURCE_MAP_PATH = ON_RENDER_PATH + ".map";

  const refreshButton = document.getElementById(
    "refresh-button"
  ) as HTMLDivElement;

  const panelUpdateEvent = new CustomEvent("panelupdate");

  window.onload = () => {
    htmlNode.onpanelupdate();
    htmlNode.dispatchEvent(panelUpdateEvent);
  };

  refreshButton.onclick = async function () {
    updateData();
    htmlNode.dispatchEvent(panelUpdateEvent);
    htmlNode.onpanelupdate();
    if (!refreshButton.classList.contains("executed")) {
      console.warn(
        "Executing onRender through a Function object. Line numbers might be inaccurate."
      );

      // Get the onRender code
      const onRenderResponse = await makeRequest("GET", ON_RENDER_PATH);
      onRender = new Function(
        `${onRenderResponse}\n//# sourceMappingURL=${SOURCE_MAP_PATH}`
      );

      refreshButton.classList.add("executed");
    }
    onRender();
  };
}

renderHandler();
