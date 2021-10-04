import { get } from "svelte/store";
import { currentAreaKeyStore } from "../stores";
import { getFullAPIPath } from "./apiPath";
import type {
  AreaConfig,
  Config,
  HotspotConfig,
  SceneConfig,
} from "./getConfig";
import { getRequest, Params } from "./getRequest";

async function getAreaConfig(params: Params = {}) {
  return getRequest<AreaConfig[]>(`${getFullAPIPath()}areas`, params);
}

async function getSceneConfig(params: Params = {}) {
  return getRequest<SceneConfig[]>(`${getFullAPIPath()}scenes`, params);
}

async function getHotspotConfig(params: Params = {}) {
  return getRequest<HotspotConfig[]>(`${getFullAPIPath()}hotspots`, params);
}

export async function getConfigFromAPI(): Promise<Config> {
  const areaKey = get(currentAreaKeyStore);

  const areas = await getAreaConfig();
  const scenes = await getSceneConfig({ area_key: `eq.${areaKey}` });
  const hotspots = await getHotspotConfig({ area_key: `eq.${areaKey}` });

  areas.sort((a, b) => a.area_key - b.area_key);
  scenes.sort((a, b) => a.scene_key - b.scene_key);
  hotspots.sort((a, b) => Number(a.hotspot_key) - Number(b.hotspot_key));

  return {
    areas,
    scenes,
    hotspots,
  };
}
