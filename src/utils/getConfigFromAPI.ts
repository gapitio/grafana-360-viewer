import { get } from "svelte/store";
import { currentAreaKeyStore } from "../stores";
import { getFullAPIPath } from "./apiPath";
import type {
  AreaConfig,
  Config,
  HotspotConfig,
  SceneConfig,
} from "./getConfig";
export interface Params {
  [key: string]: string;
}

class RequstConfig {
  aborter = new AbortController();

  async request<T>(urlString: string, params: Params = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      const url = new URL(urlString);

      for (const param of Object.entries(params)) {
        url.searchParams.append(...param);
      }

      fetch(url.href, { signal: this.aborter.signal })
        .then((res) => res.json().then(resolve).catch(reject))
        .catch(reject);
    });
  }
}

const requestConfig = new RequstConfig();

async function getAreaConfig(params: Params = {}) {
  return requestConfig.request<AreaConfig[]>(
    `${getFullAPIPath()}areas`,
    params
  );
}

async function getSceneConfig(params: Params = {}) {
  return requestConfig.request<SceneConfig[]>(
    `${getFullAPIPath()}scenes`,
    params
  );
}

async function getHotspotConfig(params: Params = {}) {
  return requestConfig.request<HotspotConfig[]>(
    `${getFullAPIPath()}hotspots`,
    params
  );
}

export async function getConfigFromAPI(): Promise<Config> {
  const areaKey = get(currentAreaKeyStore);

  requestConfig.aborter.abort();
  requestConfig.aborter = new AbortController();

  return new Promise((resolve, reject) => {
    Promise.all([
      getAreaConfig(),
      getSceneConfig({ area_key: `eq.${areaKey}` }),
      getHotspotConfig({ area_key: `eq.${areaKey}` }),
    ])
      .then(([areas, scenes, hotspots]) => {
        areas.sort((a, b) => a.area_key - b.area_key);
        scenes.sort((a, b) => a.scene_key - b.scene_key);
        hotspots.sort((a, b) => Number(a.hotspot_key) - Number(b.hotspot_key));
        resolve({ areas, scenes, hotspots });
      })
      .catch(reject);
  });
}
