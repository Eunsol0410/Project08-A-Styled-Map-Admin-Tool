import {
  getLabel,
  getSection,
  LabelType,
  CommonType,
} from '../common/commonProperties';

import {
  INIT,
  SET_SECTION,
  SET_LABEL_TEXT,
  SET_LABEL_ICON,
  ActionType,
} from '../common/action';

export interface MarkerType {
  isChanged: boolean;
  section: CommonType;
  label: LabelType;
}

const initialState = {
  isChanged: false,
  section: getSection(),
  label: getLabel(),
};

export default function markerReducer(
  state: MarkerType = initialState,
  action: ActionType
): MarkerType {
  switch (action.type) {
    case INIT:
      return initialState;
    case SET_SECTION: {
      const { element, style } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      newState.section[element as string] = style;

      return newState;
    }
    case SET_LABEL_TEXT: {
      const { element, style } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      newState.label.text[element as string] = style;

      return newState;
    }
    case SET_LABEL_ICON: {
      const { style } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      newState.icon = style;

      return newState;
    }
    default:
      return state;
  }
}
