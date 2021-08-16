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
  file_id: number;
  facing_yaw: number;
  facing_pitch: number;
  fov: number;
}

export interface HotspotConfig {
  hotspot_key: number;
  scene_key: number;
  area_key: number;
  type: string | null;
  title: string | null;
  description: string | null;
  metric: string | null;
  unit: string | null;
  decimals: number | null;
  color: string | null;
  go_to_scene_key: number | null;
  yaw: number;
  pitch: number;
  extra_transforms: string | null;
  link: string | null;
  new?: boolean;
}

export function getConfig(): Config {
  const [areas, scenes, hotspots] = ["areas", "scenes", "hotspots"].map(
    (seriesName) => {
      let value: AreaConfig[] | SceneConfig[] | HotspotConfig[];

      try {
        value = customProperties.editable
          ? []
          : JSON.parse(
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
  ) as [AreaConfig[], SceneConfig[], HotspotConfig[]];

  areas.sort((a, b) => a.area_key - b.area_key);
  scenes.sort((a, b) => a.scene_key - b.scene_key);
  hotspots.sort((a, b) => a.hotspot_key - b.hotspot_key);

  return { areas, scenes, hotspots };
}
