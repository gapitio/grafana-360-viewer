import { get } from "svelte/store";
import { currentAreaKeyStore } from "../stores";
import { getFullAPIPath } from "./apiPath";
import type { Config } from "./getConfig";

async function getAreaConfig() {
  const url = new URL(`${getFullAPIPath()}areas`);

  const res = await fetch(url.href);
  const data = await res.json();
  return data;
}

async function getSceneConfig(areaKey: number) {
  const url = new URL(`${getFullAPIPath()}scenes`);
  url.searchParams.append("area_key", `eq.${areaKey}`);

  const res = await fetch(url.href);
  const data = await res.json();
  return data;
}

async function getHotspotConfig(areaKey: number) {
  const url = new URL(`${getFullAPIPath()}hotspots`);
  url.searchParams.append("area_key", `eq.${areaKey}`);

  const res = await fetch(url.href);
  const data = await res.json();
  return data;
}

export async function getConfigFromAPI(): Promise<Config> {
  const areaKey = get(currentAreaKeyStore);

  const areaConfig = await getAreaConfig();
  const sceneConfig = await getSceneConfig(areaKey);
  const hotspotConfig = await getHotspotConfig(areaKey);

  return {
    areas: areaConfig,
    scenes: sceneConfig,
    hotspots: hotspotConfig,
  };
}
