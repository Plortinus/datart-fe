import { IW } from '@/components/IconWrapper';
import { CHART_DRAG_ELEMENT_TYPE } from '@/globalConstants';
import { ColumnRole } from '@/pages/MainPage/pages/ViewPage/slice/types';
import { FONT_SIZE_TITLE, INFO } from '@/styles/StyleConstants';
import { CalendarOutlined } from '@ant-design/icons';
import { Row } from 'antd';
import { useDrag } from 'react-dnd';
import styled from 'styled-components/macro';
import { dateLevelFieldsProps } from '../../../../slice/types';
import { handleDateLevelsName } from '../../utils';

function DateLevelFieldContainer({
  onClearCheckedList,
  folderRole,
  item,
}: {
  onClearCheckedList?: () => any;
  folderRole?: string;
  item: dateLevelFieldsProps;
}) {
  const [, drag] = useDrag(
    () => ({
      type: CHART_DRAG_ELEMENT_TYPE.DATASET_COLUMN,
      canDrag: true,
      item: {
        field: item.field,
        colName: item?.name,
        type: item?.type,
        category: item?.category,
        expression: item?.expression,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: onClearCheckedList,
    }),
    [],
  );

  return (
    <ItemWrapper ref={drag}>
      <Row>
        <IW fontSize={FONT_SIZE_TITLE}>
          {<CalendarOutlined style={{ color: INFO }} />}
        </IW>
        <p>
          {folderRole === ColumnRole.Hierarchy
            ? handleDateLevelsName(item)
            : item?.displayName}
        </p>
      </Row>
    </ItemWrapper>
  );
}
export default DateLevelFieldContainer;

const ItemWrapper = styled.div`
  color: ${(p) => p.theme.textColorSnd};
`;
