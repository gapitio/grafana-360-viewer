/* eslint-disable @typescript-eslint/no-explicit-any */
import Marzipano from "marzipano";
import { get } from "svelte/store";
import { imageURLObjectsStore } from "../stores";
import type { SceneConfig } from "./getConfig";

export interface SceneData {
  name: string;
  key: number;
  scene: any;
}

async function getSceneImage(sceneKey: number) {
  const r = new RegExp("^(?:[a-z]+:)?//", "i");
  const isRelativeURL = !r.test(customProperties.api);

  const url = new URL(
    (isRelativeURL ? window.location.origin : "") +
      customProperties.api +
      "scenes"
  );
  url.searchParams.append("scene_key", `eq.${sceneKey}`);
  url.searchParams.append("select", "image");

  const res = await fetch(url.href, {
    headers: { Accept: "application/octet-stream" },
  });

  const blob = await res.blob();

  const imageURL = URL.createObjectURL(blob);

  imageURLObjectsStore.update((e) => ({
    ...e,
    ...{ [sceneKey]: imageURL },
  }));

  return imageURL;
}

export async function getSceneDataList(
  sceneConfig: SceneConfig[],
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  viewer: any
): Promise<SceneData[]> {
  viewer.destroyAllScenes();

  const scenes = Promise.all(
    sceneConfig.map(async (sceneConfig) => {
      const image =
        get(imageURLObjectsStore)[sceneConfig.scene_key] ??
        sceneConfig.image ??
        (await getSceneImage(sceneConfig.scene_key));

      const source = Marzipano.ImageUrlSource.fromString(image);

      const geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);

      const limiter = Marzipano.util.compose(
        Marzipano.RectilinearView.limit.vfov(0.1, 3),
        Marzipano.RectilinearView.limit.hfov(0.1, 3),
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
    })
  );

  return scenes;
}
