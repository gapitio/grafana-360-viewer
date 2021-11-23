import Marzipano from "marzipano";
import { get } from "svelte/store";
import {
  autoRotateStore,
  currentEditableHotspotStore,
  currentSceneConfigStore,
  viewerStore,
} from "~/stores";
import type { SceneConfig } from "./getConfig";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function enableAutoRotation(viewer, sceneConfig: SceneConfig) {
  const { fov } = sceneConfig;

  const autorotate = Marzipano.autorotate({
    yawSpeed: 0.1,
    targetPitch: 0,
    targetFov: (fov * Math.PI) / 180,
  });

  // Autorotate will start after 3s of idle time
  viewer.setIdleMovement(3000, autorotate);
  viewer.startMovement(autorotate);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function disableAutoRotation(viewer) {
  // Disable idle movement
  viewer.setIdleMovement(Infinity);
  viewer.stopMovement();
}

export function autoRotate(): void {
  let unsubscribeAutoRotate;
  currentSceneConfigStore.subscribe((sceneConfig) => {
    const viewer = get(viewerStore);
    if (!sceneConfig || !viewer) return;

    if (unsubscribeAutoRotate) unsubscribeAutoRotate();

    unsubscribeAutoRotate = autoRotateStore.subscribe((autoRotate) => {
      const shouldAutoRotate = autoRotate !== "False";
      shouldAutoRotate
        ? enableAutoRotation(viewer, sceneConfig)
        : disableAutoRotation(viewer);
    });
  });

  currentEditableHotspotStore.subscribe((key) => {
    const viewer = get(viewerStore);
    const sceneConfig = get(currentSceneConfigStore);
    if (!sceneConfig || !viewer) return;

    const shouldAutoRotate = get(autoRotateStore) !== "False";
    if (key) disableAutoRotation(viewer);
    else if (shouldAutoRotate) enableAutoRotation(viewer, sceneConfig);
  });
}
