import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../../store';
import {
  StyleType,
  StyleKeyType,
  ElementNameType,
  SubElementNameType,
  PayloadPropsType,
} from '../../store/common/type';
import { setStyle } from '../../store/style/action';
import * as mapStyling from '../../utils/map-styling';

import { hexToHSL, hslToHEX } from '../../utils/colorFormat';
import useHistoryFeature from '../map/useHistoryFeature';

export interface UseStyleHookType {
  styleElement: StyleType;
  onStyleChange: (key: StyleKeyType, value: string | number) => void;
  element: ElementNameType | null;
}

const colorRelatedKeysArr: StyleKeyType[] = [
  StyleKeyType.color,
  StyleKeyType.lightness,
  StyleKeyType.saturation,
];

const getNewColorStyle = (
  key: StyleKeyType,
  value: string | number,
  styleElement: StyleType
) => {
  const { color, saturation, lightness } = styleElement;
  const newStyleObj = {
    color,
    saturation,
    lightness,
  };

  const { h: beforeColor, s: beforeSaturation, l: beforeLight } = hexToHSL(
    color
  );

  switch (key) {
    case StyleKeyType.saturation:
      newStyleObj.saturation = value as number;
      newStyleObj.color = hslToHEX(
        `hsl(${beforeColor}, ${value}%, ${beforeLight}%)`
      );
      break;

    case StyleKeyType.lightness:
      newStyleObj.lightness = value as number;
      newStyleObj.color = hslToHEX(
        `hsl(${beforeColor}, ${beforeSaturation}%, ${value}%)`
      );
      break;

    case StyleKeyType.color:
      // eslint-disable-next-line no-case-declarations
      const { s: newSaturation, l: newLightness } = hexToHSL(value as string);
      newStyleObj.color = value as string;
      newStyleObj.saturation = newSaturation;
      newStyleObj.lightness = newLightness;
      break;

    default:
      break;
  }

  return newStyleObj;
};

function useStyleType(): UseStyleHookType {
  const dispatch = useDispatch();

  const { addHistory } = useHistoryFeature();
  const { feature, subFeature, element, subElement } = useSelector<RootState>(
    (state) => state.sidebar
  ) as PayloadPropsType;
  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;
  const styleElement = useSelector<RootState>((state) => {
    if (!feature || !subFeature || !element) {
      return null;
    }

    const newFeature = state[feature][subFeature];
    if (element === ElementNameType.labelIcon) return newFeature[element];
    return newFeature[element][subElement as SubElementNameType];
  }) as StyleType;

  const onStyleChange = useCallback(
    (key: StyleKeyType, value: string | number) => {
      if (!feature || !subFeature || !element) return;

      const newStyleObj = colorRelatedKeysArr.includes(key)
        ? getNewColorStyle(key, value, styleElement)
        : { [key]: value };

      mapStyling[feature]({
        map,
        subFeature,
        key,
        element,
        subElement: subElement as SubElementNameType,
        style: {
          ...styleElement,
          ...newStyleObj,
        },
      });

      dispatch(
        setStyle({
          feature,
          subFeature,
          element,
          subElement: subElement as SubElementNameType,
          style: {
            ...styleElement,
            ...newStyleObj,
          },
        })
      );

      addHistory({
        changedKey: key,
        value,
        feature,
        subFeature,
        element,
        subElement,
        style: {
          ...styleElement,
          [key]: value,
        },
      });
    },
    [feature, subFeature, element, subElement, styleElement]
  );

  return {
    styleElement,
    onStyleChange,
    element,
  };
}

export default useStyleType;
