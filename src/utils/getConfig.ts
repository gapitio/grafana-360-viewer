import { getSeriesFromName } from "@gapit/grafana-metric";

export interface Config {
  areas: AreaConfig[];
  scenes: SceneConfig[];
  hotspots: HotspotConfig[];
}

export interface AreaConfig {
  area_key: number;
  area_name: string;
}

export interface SceneConfig {
  scene_key: number;
  area_key: number;
  scene_name: string;
  image: string;
  facing_yaw: number;
  facing_pitch: number;
  fov: number;
}

export interface HotspotConfig {
  hotspot_key: number;
  scene_key: number;
  area_key: number;
  type: string;
  title: string;
  description: string;
  metric: string;
  unit: string;
  color: string;
  go_to_scene_key: number;
  yaw: number;
  pitch: number;
  extra_transforms: string;
  new?: boolean;
}

export function getConfig(): Config {
  const [areas, scenes, hotspots] = ["areas", "scenes", "hotspots"].map(
    (seriesName) => {
      let value: unknown[];

      try {
        value = JSON.parse(
          getSeriesFromName(seriesName)
            .fields.find((field: Field) => field.name == "Value")
            .values.get(0)
        );
      } catch (e) {
        throw new Error(`Couldn't parse series "${seriesName}": ${e}`);
      }

      if (!(value instanceof Array)) {
        throw new Error(`Series "${seriesName}" is not an Array`);
      }

      return value;
    }
  );

  return { areas, scenes, hotspots };
}
