/* eslint-disable no-nested-ternary */
/* eslint-disable no-case-declarations */
import { stylingProps } from '.';
import transitLayers from '../rendering-data/layers/transit.json';
import {
  StyleKeyType,
  ElementNameType,
  SubElementNameType,
} from '../../store/common/type';
import {
  applyVisibility,
  applyColor,
  applyWeight,
  ColorType,
  WeightType,
  StyleTypes,
} from '../../utils/applyStyle';

enum layerTypes {
  all = 'all',
  section = 'section',
  line = 'line',
  labelText = 'labelText',
}

interface GetLayerNamesProps {
  subFeature: string;
  element: ElementNameType;
  subElement: SubElementNameType;
  key: StyleKeyType;
}

const transitLayerIds = transitLayers.transit.map(({ id }) => id);

const getLayerNames = ({
  subFeature,
  element,
  subElement,
  key,
}: GetLayerNamesProps) => {
  const isInvalidOrder = () =>
    subElement === SubElementNameType.fill && key === StyleKeyType.weight;

  if (isInvalidOrder()) return [];

  const isLineOrNot = (layerName: string) =>
    element === ElementNameType.section &&
    subElement === SubElementNameType.stroke
      ? layerName.includes(layerTypes.line)
      : !layerName.includes(layerTypes.line);

  const isLabelOrNot = (layerName: string) =>
    element === ElementNameType.section
      ? !layerName.includes(layerTypes.labelText)
      : layerName.includes(layerTypes.labelText);

  const getSubfeatureLayer = (layerName: string) =>
    subFeature === layerTypes.all || layerName.includes(subFeature);

  const layerNames = transitLayerIds
    .filter(isLabelOrNot)
    .filter(isLineOrNot)
    .filter(getSubfeatureLayer);

  return layerNames;
};

function transitStyling({
  map,
  subFeature,
  key,
  element,
  subElement,
  style,
}: stylingProps): void {
  if (element === ElementNameType.labelIcon) return;

  const layerNames: string[] = getLayerNames({
    subFeature,
    element,
    subElement,
    key,
  });

  if (layerNames.length === 0) return;

  const styleKey = key as StyleKeyType;
  const { [styleKey]: styleValue } = style;
  let layerPropertyType: StyleTypes;

  switch (styleKey) {
    case StyleKeyType.visibility:
      applyVisibility({
        map,
        layerNames,
        visibility: styleValue as string,
      });
      break;

    case StyleKeyType.color:
    case StyleKeyType.saturation:
    case StyleKeyType.lightness:
      layerPropertyType =
        element === ElementNameType.labelText
          ? subElement === SubElementNameType.fill
            ? ColorType.text
            : ColorType.textHalo
          : subElement === SubElementNameType.fill
          ? ColorType.fill
          : ColorType.line;

      const satureOrLight =
        key === StyleKeyType.saturation
          ? { saturation: +style[StyleKeyType.saturation] }
          : key === StyleKeyType.lightness
          ? { lightness: +style[StyleKeyType.lightness] }
          : {};
      applyColor({
        map,
        layerNames,
        type: layerPropertyType,
        color: style[StyleKeyType.color],
        ...satureOrLight,
      });
      break;

    case StyleKeyType.weight:
      layerPropertyType =
        element === ElementNameType.labelText
          ? WeightType.textHalo
          : WeightType.line;
      applyWeight({
        map,
        layerNames,
        type: layerPropertyType,
        weight: styleValue as number,
      });

      break;

    default:
      break;
  }
}

export default transitStyling;
