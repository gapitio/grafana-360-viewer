import Marzipano from "marzipano";
import {
  autoRotateStore,
  currentEditableHotspotStore,
  viewerStore,
} from "~/stores";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function enableAutoRotation(viewer) {
  const autorotate = Marzipano.autorotate({ yawSpeed: 0.1, targetPitch: 0 });

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
  viewerStore.subscribe((viewer) => {
    if (!viewer) return;

    autoRotateStore.subscribe((autoRotate) => {
      const shouldAutoRotate = autoRotate !== "False";
      shouldAutoRotate
        ? enableAutoRotation(viewer)
        : disableAutoRotation(viewer);

      currentEditableHotspotStore.subscribe((key) => {
        if (key) disableAutoRotation(viewer);
        else if (shouldAutoRotate) enableAutoRotation(viewer);
      });
    });
  });
}
