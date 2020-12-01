/* eslint-disable no-debugger */
/* eslint-disable no-case-declarations */
import mapboxgl from 'mapbox-gl';
import { StyleKeyName } from '../store/common/type';
import { hexToHSL } from './colorFormat';

export enum VisibilityType {
  visibility = 'visibility',
}

export enum ColorTypeName {
  'fill-color' = 'fill-color',
  'line-color' = 'line-color',
  'text-color' = 'text-color',
  'text-halo-color' = 'text-halo-color',
}
export enum WeightTypeName {
  'line-width' = 'line-width',
  'text-size' = 'text-size',
  'text-halo-width' = 'text-halo-width',
}
type ColorType = keyof typeof ColorTypeName;
type WeightType = keyof typeof WeightTypeName;
export type styleTypes = VisibilityType | ColorType | WeightType;

interface ApplyColorProps {
  map: mapboxgl.Map;
  layerNames: string[];
  color: string;
  type: styleTypes;
  saturation?: number;
  lightness?: number;
}

export function applyVisibility(
  map: mapboxgl.Map,
  layerNames: string[],
  visibility: string
): void {
  return layerNames.forEach((layerName) => {
    map.setLayoutProperty(layerName, VisibilityType.visibility, visibility);
  });
}

export function applyColor({
  map,
  layerNames,
  type,
  color,
  saturation,
  lightness,
}: ApplyColorProps): void {
  const { h, s, l } = hexToHSL(color);

  if (saturation) {
    return layerNames.forEach((layerName) => {
      map.setPaintProperty(
        layerName,
        type,
        `hsl(${h}, ${50 + saturation / 2}%, ${l}%)`
      );
    });
  }
  if (lightness) {
    return layerNames.forEach((layerName) => {
      map.setPaintProperty(
        layerName,
        type,
        `hsl(${h}, ${s}%, ${50 + lightness / 2}%)`
      );
    });
  }

  return layerNames.forEach((layerName) => {
    map.setPaintProperty(layerName, type, `hsl(${h}, ${s}%, ${l}%)`);
  });
}

export function applyWeight(
  map: mapboxgl.Map,
  layerNames: string[],
  type: WeightType,
  weight: string
): void {
  return layerNames.forEach((layerName) => {
    map.setPaintProperty(layerName, type, +weight * 3 + 1);
  });
}

export function applyTextSize(
  map: mapboxgl.Map,
  layerNames: string[],
  type: WeightType,
  size: string
): void {
  return layerNames.forEach((layerName) => {
    map.setLayoutProperty(layerName, type, +size * 3);
  });
}
