import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setWholeStyle, replaceWholeStyle } from '../../store/style/action';
import {
  WholeStyleActionPayload,
  FeatureState,
  FeatureNameType,
  StyleStoreType,
} from '../../store/common/type';
import { useEffect, useState } from 'react';
import setFeatureStyle from '../../utils/setFeatureStyle';

interface WholeStyleHook {
  flag: boolean;
  getWholeStyle: () => StyleStoreType;
  changeStyle: (inputStyle: WholeStyleActionPayload) => void;
  replaceStyle: (inputStyle: StyleStoreType) => void;
}

export type WholeStyleStoreType = {
  [featureName in FeatureNameType]: FeatureState;
};

function useWholeStyle(): WholeStyleHook {
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;
  const { poi, landscape, administrative, road, transit, water } = useSelector<
    RootState
  >((state) => state) as WholeStyleStoreType;

  useEffect(() => {
    if (!flag || !map) return;
    const stores: WholeStyleStoreType = {
      poi,
      landscape,
      administrative,
      road,
      transit,
      water,
    };

    const features = Object.keys(stores) as FeatureNameType[];
    // eslint-disable-next-line no-restricted-syntax
    for (const feature of features) {
      setFeatureStyle({
        map,
        feature: feature as FeatureNameType,
        featureState: stores[feature] as FeatureState,
      });
    }
    setFlag(false);
  }, [flag]);

  const getWholeStyle = () => {
    return {
      poi,
      landscape,
      administrative,
      road,
      transit,
      water,
    };
  };

  const changeStyle = (inputStyle: WholeStyleActionPayload): void => {
    dispatch(setWholeStyle(inputStyle));
    setFlag(true);
  };

  const replaceStyle = (inputStyle: StyleStoreType): void => {
    dispatch(replaceWholeStyle(inputStyle));
    setFlag(true);
  };

  return {
    flag,
    getWholeStyle,
    changeStyle,
    replaceStyle,
  };
}

export default useWholeStyle;
