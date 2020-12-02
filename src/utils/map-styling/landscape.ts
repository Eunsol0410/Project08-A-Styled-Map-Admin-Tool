import { stylingProps } from './index';
import {
  applyColor,
  applyWeight,
  applyVisibility,
  WeightType,
  ColorType,
  StyleTypes,
} from '../applyStyle';
import {
  StyleKeyType,
  ElementNameType,
  StyleType,
} from '../../store/common/type';

const SECTION = 'section';
const LABELTEXT = 'labelText';
const LABELICON = 'labelIcon';

const ALL = 'all';

type LandscapeSubFeature =
  | 'all'
  | 'human-made'
  | 'building'
  | 'natural'
  | 'landcover';

const humanMadeLayers: string[] = ['landscape-human-made'];

const buildingLayers: string[] = [
  'landscape-building',
  'building-outline',
  'building',
];

const naturalLayers: string[] = ['landscape-natural'];

const landcoverLayers: string[] = ['landscape-landcover'];

interface SubDetailType {
  fill: string[];
  stroke: string[];
}

interface DetailType {
  section: SubDetailType;
  labelText: SubDetailType;
  labelIcon: SubDetailType;
}

function makeSubDetail(
  fillLayers: string[],
  strokeLayers: string[]
): SubDetailType {
  return { fill: fillLayers, stroke: strokeLayers };
}

const layersByType: { [key in LandscapeSubFeature]: DetailType } = {
  'human-made': {
    [SECTION]: makeSubDetail([], []),
    [LABELTEXT]: makeSubDetail([], []),
    [LABELICON]: makeSubDetail([], []),
  },
  building: {
    [SECTION]: makeSubDetail([], []),
    [LABELTEXT]: makeSubDetail([], []),
    [LABELICON]: makeSubDetail([], []),
  },
  natural: {
    [SECTION]: makeSubDetail([], []),
    [LABELTEXT]: makeSubDetail([], []),
    [LABELICON]: makeSubDetail([], []),
  },
  landcover: {
    [SECTION]: makeSubDetail([], []),
    [LABELTEXT]: makeSubDetail([], []),
    [LABELICON]: makeSubDetail([], []),
  },
  all: {
    [SECTION]: makeSubDetail([], []),
    [LABELTEXT]: makeSubDetail([], []),
    [LABELICON]: makeSubDetail([], []),
  },
};

const VISIBLE = 1;
const INVISIBLE = 0;

const mappingDetailToFunc = {
  labelText: {
    fill: {
      color: {
        typeName: ColorType.text,
        funcName: applyColor,
      },
      saturation: {
        typeName: ColorType.text,
        funcName: applyColor,
      },
      lightness: {
        typeName: ColorType.text,
        funcName: applyColor,
      },
      weight: {
        typeName: null,
        funcName: () => null,
      },
      visibility: {
        typeName: 'what is my name?',
        funcName: applyVisibility,
      },
      isChanged: {
        typeName: null,
        funcName: () => null,
      },
    },
    stroke: {
      color: {
        typeName: ColorType.textHalo,
        funcName: applyColor,
      },
      saturation: {
        typeName: ColorType.textHalo,
        funcName: applyColor,
      },
      lightness: {
        typeName: ColorType.textHalo,
        funcName: applyColor,
      },
      weight: {
        typeName: WeightType.textHalo,
        funcName: applyWeight,
      },
      visibility: {
        typeName: WeightType.textHalo,
        funcName: applyWeight,
      },
      isChanged: {
        typeName: null,
        funcName: () => null,
      },
    },
  },
  labelIcon: {
    color: {
      typeName: null,
      funcName: () => null,
    },
    saturation: {
      typeName: null,
      funcName: () => null,
    },
    lightness: {
      typeName: null,
      funcName: () => null,
    },
    weight: {
      typeName: null,
      funcName: () => null,
    },
    visibility: {
      typeName: ColorType.icon,
      funcName: applyWeight,
    },
    isChanged: {
      typeName: null,
      funcName: () => null,
    },
  },
  section: {
    fill: {
      color: {
        typeName: ColorType.fill,
        funcName: applyColor,
      },
      saturation: {
        typeName: ColorType.fill,
        funcName: applyColor,
      },
      lightness: {
        typeName: ColorType.fill,
        funcName: applyColor,
      },
      weight: {
        typeName: null,
        funcName: () => null,
      },
      visibility: {
        typeName: ColorType.fill,
        funcName: applyVisibility,
      },
      isChanged: {
        typeName: null,
        funcName: () => null,
      },
    },
    stroke: {
      color: {
        typeName: ColorType.line,
        funcName: applyColor,
      },
      saturation: {
        typeName: ColorType.line,
        funcName: applyColor,
      },
      lightness: {
        typeName: ColorType.line,
        funcName: applyColor,
      },
      weight: {
        typeName: WeightType.line,
        funcName: applyWeight,
      },
      visibility: {
        typeName: WeightType.line,
        funcName: applyVisibility,
      },
      isChanged: {
        typeName: null,
        funcName: () => null,
      },
    },
  },
};

function landscapeStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  key,
  style,
}: stylingProps): void {
  let type = null;
  let func = null;

  console.log(subFeatureName, detailName, subDetailName, key);

  if (
    detailName === ElementNameType.section ||
    detailName === ElementNameType.labelText
  ) {
    const { typeName, funcName } = mappingDetailToFunc[detailName][
      subDetailName
    ][key as StyleKeyType];
    type = typeName;
    func = funcName;
  } else {
    const { typeName, funcName } = mappingDetailToFunc[detailName][
      key as StyleKeyType
    ];
    type = typeName;
    func = funcName;
  }

  if (!type) {
    return;
  }
  if (
    key === 'visibility' &&
    (type === ColorType.icon || type === WeightType.textHalo)
  ) {
    func({
      map,
      layerNames:
        layersByType[subFeatureName as LandscapeSubFeature][detailName][
          subDetailName
        ],
      type,
      weight: style.visibility === 'none' ? INVISIBLE : VISIBLE,
    });
    return;
  }
  if (key === 'visibility') {
    console.log(func);
    func({
      map,
      layerNames:
        layersByType[subFeatureName as LandscapeSubFeature][detailName][
          subDetailName
        ],
      visibility: style.visibility,
    });
  }

  func({
    map,
    layerNames:
      layersByType[subFeatureName as LandscapeSubFeature][detailName][
        subDetailName
      ],
    type: type as StyleTypes,
    color: style.color,
    [key]: style[key as StyleKeyType],
  });
}

export default landscapeStyling;
