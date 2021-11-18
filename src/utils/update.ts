import equal from "fast-deep-equal";
import { get } from "svelte/store";
import {
  configStore,
  currentAreaKeyStore,
  currentSceneKeyStore,
  autoRotateStore,
} from "../stores";
import { getConfig } from "./getConfig";
import { getConfigFromAPI } from "./getConfigFromAPI";
import { viewerStore } from "../stores";

export async function update(): Promise<void> {
  currentAreaKeyStore.updateVariable(get(currentAreaKeyStore));
  currentSceneKeyStore.updateVariable(get(currentSceneKeyStore));
  autoRotateStore.updateVariable(get(autoRotateStore));

  const newConfig = customProperties.editable
    ? await getConfigFromAPI()
    : getConfig();
  if (newConfig && !equal(get(configStore), newConfig)) {
    configStore.set(newConfig);
  }

  // Update the view size when the panel is resized
  const viewer = get(viewerStore);
  viewer && viewer.updateSize();
}
