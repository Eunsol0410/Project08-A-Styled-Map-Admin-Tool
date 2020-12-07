import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from '../../../utils/styles/styled';
import { RootState } from '../../../store/index';
import useHistoryFeature from '../../../hooks/map/useHistoryFeature';
import { HistoryPropsType } from '../../../store/common/type';

const HistoryWapper = styled.div`
  z-index: 30;
  width: 515px;
  background-color: white;
  padding: 15px 20px;
  position: fixed;
  top: 110px;
  right: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px ${(props) => props.theme.GREY};
  display: flex;
  flex-direction: column;
`;

const HistoryItem = styled.div`
  margin-bottom: 5px;
`;

const HistoryTitle = styled.div`
  margin-bottom: 5px;
  text-align: center;
`;

interface HistoryProps {
  isHistoryOpen: boolean;
}
function History({ isHistoryOpen }: HistoryProps): ReactElement {
  const { initHistoryStatus } = useHistoryFeature();
  useEffect(() => {
    initHistoryStatus();
  }, []);

  const { log } = useSelector<RootState>(
    (state) => state.history
  ) as HistoryPropsType;

  if (!isHistoryOpen) return <></>;

  return (
    <>
      <HistoryWapper>
        <HistoryTitle text-align="center">HISTORY LIST</HistoryTitle>
        {log ? (
          log.map((item) => (
            <HistoryItem key={item.id}>{item.display}</HistoryItem>
          ))
        ) : (
          <></>
        )}
      </HistoryWapper>
    </>
  );
}

export default History;
