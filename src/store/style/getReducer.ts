import renderingData from '../../utils/rendering-data/featureTypeData';

import {
  FeatureState,
  FeatureType,
  ActionType,
  SubElementNameType,
  objType,
  ElementNameType,
  SubElementType,
} from '../common/type';
import { getDefaultFeature } from './properties';
import { INIT, SET } from './action';
import { checkStyleIsChanged, checkFeatureIsChanged } from './compareStyle';

interface ReducerType {
  (state: FeatureState, action: ActionType): FeatureState;
}

export default function getReducer(IDX: number): ReducerType {
  const subFeatures = [
    'all',
    ...(renderingData[IDX].features?.map((v) => v.key) as string[]),
  ];

  const initialState = subFeatures.reduce((acc: FeatureState, cur: string) => {
    acc[cur] = getDefaultFeature({
      featureName: renderingData[IDX].typeKey,
      subFeatureName: cur,
    });
    return acc;
  }, {});

  return function reducer(
    state: FeatureState = initialState,
    action: ActionType
  ): FeatureState {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET: {
        const {
          feature,
          subFeature,
          element,
          subElement,
          style,
        } = action.payload;

        if (feature !== renderingData[IDX].typeKey) return state;

        style.isChanged = checkStyleIsChanged({
          targetStyle: style,
          featureName: feature,
          subFeatureName: subFeature,
          elementName: element,
          subElementName: subElement,
        });
        const newState: FeatureState = JSON.parse(JSON.stringify(state));
        const newFeature: FeatureType = newState[subFeature as string];

        let prevIsChanged;
        if (element === ElementNameType.labelIcon) {
          prevIsChanged = newFeature[element]?.isChanged;
          newFeature[element] = style;
        } else {
          prevIsChanged = (newFeature[element] as SubElementType)[
            subElement as SubElementNameType
          ].isChanged;
          (newFeature[element] as SubElementType)[
            subElement as SubElementNameType
          ] = style;
        }

        if (prevIsChanged !== style.isChanged) {
          delete (newFeature as objType).isChanged;
          const featureIsChanged = checkFeatureIsChanged(newFeature);
          newFeature.isChanged = featureIsChanged;
        }

        return newState;
      }
      default:
        return state;
    }
  };
}
