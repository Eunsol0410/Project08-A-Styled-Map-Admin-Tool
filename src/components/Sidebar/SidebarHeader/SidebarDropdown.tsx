import React from 'react';
import styled from '../../../utils/styles/styled';
import ImportModal from '../SidebarModal/ImportModal';
import useSidebarDropdown, {
  useSidebarDropdownType,
} from '../../../hooks/sidebar/useSidebarDropdown';

const DropdownWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: -100px;
  width: 150px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.WHITE};
  box-shadow: 0 0 10px ${(props) => props.theme.GREY};
  border-radius: 7px;
  z-index: 10;
`;

const DropdownItem = styled.div`
  width: 90%;
  margin: 10px 0;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.GREEN};
  }
`;

interface SidebarDropdownProps {
  isOpened: boolean;
  dropdownToggleHandler: () => void;
}

function SidebarDropdownPresenter({
  isOpened,
  dropdownToggleHandler,
}: SidebarDropdownProps): React.ReactElement {
  const {
    importModalToggleHandler,
    resetClickHandler,
    isModalOpened,
  }: useSidebarDropdownType = useSidebarDropdown({
    isOpened,
    dropdownToggleHandler,
  });

  return (
    <>
      {isOpened ? (
        <DropdownWrapper>
          <DropdownItem onClick={resetClickHandler}>초기화</DropdownItem>
          <DropdownItem onClick={importModalToggleHandler}>
            JSON 불러오기
          </DropdownItem>
        </DropdownWrapper>
      ) : (
        <></>
      )}

      {isModalOpened ? (
        <ImportModal importModalToggleHandler={importModalToggleHandler} />
      ) : (
        <></>
      )}
    </>
  );
}

export default SidebarDropdownPresenter;
