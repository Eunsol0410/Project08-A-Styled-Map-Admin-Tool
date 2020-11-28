import React from 'react';
import styled from '../../../utils/styles/styled';

export type paddingStepType = 'first' | 'second' | 'third';

interface ListItemProps {
  isSelected: boolean;
  padding: paddingStepType;
  clickHandler: () => void;
  name: string;
}

interface PaddingProp {
  padding: paddingStepType;
}

interface ItemProps extends PaddingProp {
  isSelected: boolean;
}

export const paddingStep = {
  first: '0px',
  second: '15px',
  third: '30px',
};

const Item = styled.li<ItemProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding-left: ${(props) => paddingStep[props.padding]};
  font-size: 1.7rem;
  color: ${(props) =>
    props.isSelected ? props.theme.GREEN : props.theme.DARKGREY};
  cursor: pointer;

  &:hover {
    color: ${(props) =>
      props.isSelected ? props.theme.GREEN : props.theme.BLACK};
  }
`;

const Pointer = styled.span``;

function DetailTypeItem({
  isSelected,
  padding,
  clickHandler,
  name,
}: ListItemProps): React.ReactElement {
  return (
    <Item isSelected={isSelected} padding={padding} onClick={clickHandler}>
      <span>{name}</span>
      <Pointer>{'>'}</Pointer>
    </Item>
  );
}

export default DetailTypeItem;
