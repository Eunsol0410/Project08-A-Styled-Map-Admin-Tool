import React from 'react';
import styled from '../../../utils/styles/styled';
import UndoIcon from '../../Icon/UndoIcon';
import MoreVertIcon from '../../Icon/MoreVertIcon';

const HeaderWrapper = styled.header`
  height: 5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  background-color: ${(props) => props.theme.GREEN};
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  color: white;
  width: 60%;
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  height: 100%;
`;

const UndoBtn = styled(UndoIcon)`
  margin: 0 0 0 auto;
  fill: white;
`;

const DropdownBtn = styled(MoreVertIcon)`
  fill: white;
`;

function SidebarHeaderPresenter(): React.ReactElement {
  return (
    <HeaderWrapper>
      <HeaderTitle>스타일 맵 만들기</HeaderTitle>
      <Btns>
        <UndoBtn />
        <DropdownBtn />
      </Btns>
    </HeaderWrapper>
  );
}

export default SidebarHeaderPresenter;
