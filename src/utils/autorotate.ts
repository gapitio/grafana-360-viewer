import Marzipano from "marzipano";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function enableAutoRotation(viewer): void {
  const autorotate = Marzipano.autorotate({
    yawSpeed: 0.1, // Yaw rotation speed
    targetPitch: 0, // Pitch value to converge to
    targetFov: Math.PI / 2, // Fov value to converge to
  });

  // Autorotate will start after 3s of idle time
  viewer.setIdleMovement(3000, autorotate);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function disableAutoRotation(viewer) {
  // Disable idle movement
  viewer.setIdleMovement(Infinity);
  viewer.stopMovement();
}
