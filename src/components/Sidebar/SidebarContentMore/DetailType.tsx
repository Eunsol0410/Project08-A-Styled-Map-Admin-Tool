import React from 'react';
import styled from '../../../utils/styles/styled';
import useSidebarType, {
  SidebarHookType,
} from '../../../hooks/sidebar/useSidebarType';
import ListItem, { paddingStepType, paddingStep } from './DetailTypeItem';
import useDetailType, {
  UseDetailHookType,
} from '../../../hooks/sidebar/useDetailType';
import Styler from './Styler';
import {
  ElementNameType,
  SubElementNameType,
} from '../../../store/common/type';

interface PaddingProp {
  padding: paddingStepType;
}

const DetailWrapper = styled.div`
  width: 230px;
  height: 100%;
  padding: 20px;

  overflow-y: scroll;
  border-left: 1px solid ${(props) => props.theme.LIGHTGREY};
`;

const Title = styled.h2`
  padding-bottom: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
`;

const List = styled.ul`
  position: relative;
  margin-bottom: 30px;
`;

const Text = styled.h3<PaddingProp>`
  margin: 10px 0;
  padding-left: ${(props) => paddingStep[props.padding]};
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREY};
`;

const Check = styled.div`
  position: absolute;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREEN};
`;

const CheckRight = styled.div`
  position: absolute;
  left: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREEN};
`;

function DetailType(): React.ReactElement {
  const {
    feature,
    element,
    subElement,
    sidebarTypeClickHandler,
    sidebarSubTypeClickHandler,
  }: SidebarHookType = useSidebarType();

  const {
    detail: { section, labelText, labelIcon },
    styleClickHandler,
    checkIsSelected,
  }: UseDetailHookType = useDetailType({
    sidebarTypeClickHandler,
    sidebarSubTypeClickHandler,
  });

  if (!feature) {
    return <></>;
  }

  return (
    <>
      <DetailWrapper>
        <Title>세부 유형</Title>
        {section ? (
          <List>
            <Text padding="first">구역</Text>
            {section?.fill.isChanged ? <Check>✓</Check> : <></>}
            <ListItem
              isSelected={checkIsSelected(
                ElementNameType.section,
                SubElementNameType.fill
              )}
              padding="second"
              clickHandler={() => {
                styleClickHandler(
                  ElementNameType.section,
                  SubElementNameType.fill
                );
              }}
              name="채우기"
            />
            {section?.stroke.isChanged ? <Check>✓</Check> : <></>}
            <ListItem
              isSelected={
                element === ElementNameType.section &&
                subElement === SubElementNameType.stroke
              }
              padding="second"
              clickHandler={() => {
                styleClickHandler(
                  ElementNameType.section,
                  SubElementNameType.stroke
                );
              }}
              name="윤곽선"
            />
          </List>
        ) : (
          <></>
        )}
        <List>
          {labelText ? (
            <>
              <Text padding="first">라벨</Text>
              <List>
                <Text padding="second">텍스트</Text>
                {labelText?.fill.isChanged ? <CheckRight>✓</CheckRight> : <></>}
                <ListItem
                  isSelected={checkIsSelected(
                    ElementNameType.labelText,
                    SubElementNameType.fill
                  )}
                  padding="third"
                  clickHandler={() => {
                    styleClickHandler(
                      ElementNameType.labelText,
                      SubElementNameType.fill
                    );
                  }}
                  name="채우기"
                />
                {labelText?.stroke.isChanged ? (
                  <CheckRight>✓</CheckRight>
                ) : (
                  <></>
                )}
                <ListItem
                  isSelected={checkIsSelected(
                    ElementNameType.labelText,
                    SubElementNameType.stroke
                  )}
                  padding="third"
                  clickHandler={() => {
                    styleClickHandler(
                      ElementNameType.labelText,
                      SubElementNameType.stroke
                    );
                  }}
                  name="윤곽선"
                />
              </List>
            </>
          ) : (
            <></>
          )}
          {labelIcon ? (
            <>
              {labelIcon.isChanged ? <Check>✓</Check> : <></>}
              <ListItem
                isSelected={checkIsSelected(ElementNameType.labelIcon)}
                padding="second"
                clickHandler={() => {
                  styleClickHandler(ElementNameType.labelIcon);
                }}
                name="아이콘"
              />
            </>
          ) : (
            <></>
          )}
        </List>
      </DetailWrapper>
      {element ? <Styler /> : <></>}
      {/* // feature={feature}
      // subFeature={subFeature}
      // element={element as ElementNameType}
      // subElement={subElement as SubElementNameType} */}
    </>
  );
}

export default DetailType;
