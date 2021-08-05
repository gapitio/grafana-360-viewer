import { get } from "svelte/store";
import { currentAreaKeyStore } from "../stores";
import { getFullAPIPath } from "./apiPath";
import type { Config } from "./getConfig";

async function getAreaConfig(api: string) {
  const url = new URL(getFullAPIPath(api) + "areas");

  const res = await fetch(url.href);
  const data = await res.json();
  return data;
}

async function getSceneConfig(api: string, areaKey: number) {
  const url = new URL(getFullAPIPath(api) + "scenes");
  url.searchParams.append("area_key", `eq.${areaKey}`);
  url.searchParams.append(
    "select",
    "scene_key,area_key, scene_name,facing_yaw,facing_pitch,fov"
  );

  const res = await fetch(url.href);
  const data = await res.json();
  return data;
}

async function getHotspotConfig(api: string, areaKey: number) {
  const url = new URL(getFullAPIPath(api) + "hotspots");
  url.searchParams.append("area_key", `eq.${areaKey}`);

  const res = await fetch(url.href);
  const data = await res.json();
  return data;
}

export async function getConfigFromAPI(): Promise<Config> {
  const {
    database: { api },
  } = customProperties;

  const areaKey = get(currentAreaKeyStore);

  const areaConfig = await getAreaConfig(api);
  const sceneConfig = await getSceneConfig(api, areaKey);
  const hotspotConfig = await getHotspotConfig(api, areaKey);

  return {
    areas: areaConfig,
    scenes: sceneConfig,
    hotspots: hotspotConfig,
  };
}
