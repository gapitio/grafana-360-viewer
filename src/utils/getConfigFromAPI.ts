import { get } from "svelte/store";
import { currentAreaKeyStore } from "../stores";
import { getFullAPIPath } from "./apiPath";
import type {
  AreaConfig,
  Config,
  HotspotConfig,
  SceneConfig,
} from "./getConfig";

async function getAreaConfig() {
  const url = new URL(`${getFullAPIPath()}areas`);

  const res = await fetch(url.href);
  const data: AreaConfig[] = await res.json();
  return data;
}

async function getSceneConfig(areaKey: number) {
  const url = new URL(`${getFullAPIPath()}scenes`);
  url.searchParams.append("area_key", `eq.${areaKey}`);

  const res = await fetch(url.href);
  const data: SceneConfig[] = await res.json();
  return data;
}

async function getHotspotConfig(areaKey: number) {
  const url = new URL(`${getFullAPIPath()}hotspots`);
  url.searchParams.append("area_key", `eq.${areaKey}`);

  const res = await fetch(url.href);
  const data: HotspotConfig[] = await res.json();
  return data;
}

export async function getConfigFromAPI(): Promise<Config> {
  const areaKey = get(currentAreaKeyStore);

  const areas = await getAreaConfig();
  const scenes = await getSceneConfig(areaKey);
  const hotspots = await getHotspotConfig(areaKey);

  areas.sort((a, b) => a.area_key - b.area_key);
  scenes.sort((a, b) => a.scene_key - b.scene_key);
  hotspots.sort((a, b) => Number(a.hotspot_key) - Number(b.hotspot_key));

  return {
    areas,
    scenes,
    hotspots,
  };
}
