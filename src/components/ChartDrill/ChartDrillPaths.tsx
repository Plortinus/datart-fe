/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import ChartDrillContext from '@/contexts/ChartDrillContext';
import { DrillMode } from '@/models/ChartDrillOption';
import { SPACE_SM, SPACE_XS } from '@/styles/StyleConstants';
import { ChartConfig } from '@/types/ChartConfig';
import { getColumnRenderName } from '@/utils/chartHelper';
import { Breadcrumb } from 'antd';
import { FC, memo, useContext } from 'react';
import styled from 'styled-components/macro';

const ChartDrillPaths: FC<{ chartConfig?: ChartConfig }> = memo(
  ({ chartConfig }) => {
    const { drillOption, onDrillOptionChange } = useContext(ChartDrillContext);
    const menuHidden = !!chartConfig?.datas?.filter(
      (v) => v.drillContextMenuVisible,
    ).length;
    if (!drillOption || drillOption.mode === DrillMode.Normal || menuHidden) {
      return <div></div>;
    }

    const drilledFields = drillOption.getDrilledFields();
    return (
      <StyledChartDrillPaths>
        <Breadcrumb>
          {drilledFields.map((f) => {
            return (
              <StyledDrillNode
                key={f.uid}
                isActive={Boolean(
                  drillOption
                    ?.getCurrentFields()
                    ?.some((df) => df.uid === f.uid),
                )}
                onClick={() => {
                  if (drillOption.mode === DrillMode.Drill) {
                    drillOption.drillUp(f);
                  } else if (drillOption.mode === DrillMode.Expand) {
                    drillOption.expandUp(f);
                  }
                  onDrillOptionChange?.(drillOption);
                }}
              >
                {getColumnRenderName(f)}
              </StyledDrillNode>
            );
          })}
        </Breadcrumb>
      </StyledChartDrillPaths>
    );
  },
);

export default ChartDrillPaths;

const StyledChartDrillPaths = styled.div`
  padding: ${SPACE_XS} ${SPACE_SM};
`;

const StyledDrillNode = styled(Breadcrumb.Item)<{ isActive: boolean }>`
  color: ${(p) => (p.isActive ? p.theme.primary : p.theme.normal)} !important;
  cursor: pointer;
  user-select: none;
`;
