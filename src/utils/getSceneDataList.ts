/* eslint-disable @typescript-eslint/no-explicit-any */
import Marzipano from "marzipano";
import type { SceneConfig } from "./getConfig";

export interface SceneData {
  name: string;
  key: number;
  scene: any;
}

export function getSceneDataList(
  sceneConfig: SceneConfig[],
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  viewer: any
): SceneData[] {
  viewer.destroyAllScenes();

  const scenes = sceneConfig.map((sceneConfig) => {
    const source = Marzipano.ImageUrlSource.fromString(sceneConfig.image);

    const geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);

    const limiter = Marzipano.util.compose(
      Marzipano.RectilinearView.limit.vfov(0, 3),
      Marzipano.RectilinearView.limit.hfov(0, 3),
      Marzipano.RectilinearView.limit.pitch(-Math.PI / 2, Math.PI / 2)
    );
    const view = new Marzipano.RectilinearView(
      {
        yaw: sceneConfig.facing_yaw,
        pitch: sceneConfig.facing_pitch,
        fov: (sceneConfig.fov * Math.PI) / 180,
      },
      limiter
    );

    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true,
    });

    return {
      name: sceneConfig.scene_name,
      key: sceneConfig.scene_key,
      scene: scene,
    };
  });

  return scenes;
}
