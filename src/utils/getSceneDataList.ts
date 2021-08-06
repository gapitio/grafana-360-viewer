/* eslint-disable @typescript-eslint/no-explicit-any */
import Marzipano from "marzipano";
import { get } from "svelte/store";
import type { imageURLObjectsStore as ImageURLObjectsStore } from "../stores";
import type { SceneConfig } from "./getConfig";
import { getFullAPIPath } from "./apiPath";

export interface SceneData {
  name: string;
  key: number;
  scene: any;
}

async function getSceneImage(
  sceneKey: number,
  imageURLObjectsStore: typeof ImageURLObjectsStore
) {
  const {
    database: { api, imageTypeIsBytes },
  } = customProperties;

  const url = new URL(getFullAPIPath(api) + "scenes");
  url.searchParams.append("scene_key", `eq.${sceneKey}`);
  url.searchParams.append("select", "image");

  const getBase64Image = async () => {
    const res = await fetch(url.href, {
      headers: { Accept: "application/vnd.pgrst.object+json" },
    });

    const data = await res.json();

    return data.image;
  };

  const getBlobImage = async () => {
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
  };

  return imageTypeIsBytes ? getBlobImage() : getBase64Image();
}

export async function getSceneDataList(
  sceneConfig: SceneConfig[],
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  viewer: any,
  imageURLObjectsStore: typeof ImageURLObjectsStore
): Promise<SceneData[]> {
  viewer.destroyAllScenes();

  const imageURLObjects = get(imageURLObjectsStore);

  const scenes = Promise.all(
    sceneConfig.map(async (sceneConfig) => {
      const image =
        sceneConfig.image ??
        imageURLObjects[sceneConfig.scene_key] ??
        (await getSceneImage(sceneConfig.scene_key, imageURLObjectsStore));

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
