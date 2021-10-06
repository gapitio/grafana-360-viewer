import { get } from "svelte/store";
import {
  currentSceneKeyStore,
  sceneConfigListStore,
  viewerStore,
} from "~/stores";

export const setFov = (fov: number): void => {
  const viewer = get(viewerStore);

  viewer.view().setFov((fov * Math.PI) / 180);
};

export const resetFov = (): void => {
  const sceneConfigList = get(sceneConfigListStore);
  const currentSceneKey = get(currentSceneKeyStore);

  const sceneConfig = sceneConfigList.find(
    ({ scene_key }) => scene_key === currentSceneKey
  );

  setFov(sceneConfig?.fov ?? 100);
};
