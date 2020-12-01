/* eslint-disable consistent-return */
import mapboxgl from 'mapbox-gl';
import { hexToHSL } from './colorFormat';

export enum ColorTypeName {
  'fill-color' = 'fill-color',
  'line-color' = 'line-color',
  'text-color' = 'text-color',
  'text-halo-color' = 'text-halo-color',
}
export enum WeightTypeName {
  'line-width' = 'line-width',
  'text-halo-width' = 'text-halo-width',
  'icon-opacity' = 'icon-opacity',
}
export type colorType = keyof typeof ColorTypeName;
export type weightType = keyof typeof WeightTypeName;

interface ApplyColorProps {
  map: mapboxgl.Map;
  layerNames: string[];
  color?: string;
  type?: colorType | weightType;
  saturation?: number;
  lightness?: number;
  weight?: string;
  visibility?: string;
}

export function applyColor({
  map,
  layerNames,
  color = '#000',
  type,
  saturation,
  lightness,
}: ApplyColorProps): void {
  if (!type) return;
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

export function applyVisibility({
  map,
  layerNames,
  visibility,
}: ApplyColorProps): void {
  layerNames.forEach((layerName) => {
    map.setLayoutProperty(layerName, 'visibility', visibility);
  });
}

export function applyWeight({
  map,
  layerNames,
  type,
  weight,
}: ApplyColorProps): void {
  if (!type) return;

  layerNames.forEach((layerName) => {
    map.setPaintProperty(layerName, type, Number(weight));
  });
}
