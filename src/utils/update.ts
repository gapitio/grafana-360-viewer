import equal from "fast-deep-equal";
import { get } from "svelte/store";
import {
  imageURLObjectsStore,
  configStore,
  currentAreaKeyStore,
  currentSceneKeyStore,
  autoRotateStore,
} from "../stores";
import { getConfig } from "./getConfig";
import { getConfigFromAPI } from "./getConfigFromAPI";
import { viewerStore } from "../stores";

export async function update(): Promise<void> {
  const newConfig = customProperties.editable
    ? await getConfigFromAPI()
    : getConfig();
  if (!equal(get(configStore), newConfig)) {
    imageURLObjectsStore.clear();
    configStore.set(newConfig);
  }

  const viewer = get(viewerStore);
  viewer && viewer.updateSize();

  currentAreaKeyStore.updateVariable(get(currentAreaKeyStore));
  currentSceneKeyStore.updateVariable(get(currentSceneKeyStore));
  autoRotateStore.updateVariable(get(autoRotateStore));
}
