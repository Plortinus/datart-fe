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

import {
  ChartDataSectionFieldActionType,
  DataViewFieldType,
} from '@/constants';
import useStateModal, { StateModalSize } from '@/hooks/useStateModal';
import FilterActions from '@/pages/ChartWorkbenchPage/components/ChartOperationPanel/components/ChartFieldAction/FilterAction';
import { ChartDataConfig } from '@/types/ChartConfig';
import { ChartDataConfigSectionProps } from '@/types/ChartDataConfigSection';
import { CloneValueDeep } from '@/utils/object';
import { BarsOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC, memo, useState } from 'react';
import BaseDataConfigSection from './BaseDataConfigSection';
import { dataConfigSectionComparer } from './utils';

const FilterTypeSection: FC<ChartDataConfigSectionProps> = memo(
  ({
    ancestors,
    config,
    translate = (title) => title,
    onConfigChanged,
    aggregation,
  }) => {
    const [openStateModal, contextHolder] = useStateModal({});
    const [currentConfig, setCurrentConfig] = useState(config);
    const [originalConfig, setOriginalConfig] = useState(config);
    const [enableExtraAction] = useState(false);
    const extendedConfig = Object.assign(
      {
        allowSameField: true,
        disableAggregate: false,
        disableAggregateComputedField: true,
      },
      {
        actions: {
          [DataViewFieldType.NUMERIC]: [ChartDataSectionFieldActionType.Filter],
          [DataViewFieldType.STRING]: [ChartDataSectionFieldActionType.Filter],
          [DataViewFieldType.DATE]: [ChartDataSectionFieldActionType.Filter],
        },
      },
      config,
    );

    const handleExtraConfigChange = (config: ChartDataConfig) => {
      setCurrentConfig(CloneValueDeep(config));
    };

    const handleConfigChange = (ancestors, config: ChartDataConfig) => {
      setOriginalConfig(config);
      setCurrentConfig(config);
      onConfigChanged(ancestors, config, true);
    };

    const handleShowExtraFunctionDialog = () => {
      const props = {
        config: currentConfig,
        onConfigChange: handleExtraConfigChange,
      };

      const handleExtraButtonConfirm = (close) => {
        handleConfigChange(ancestors, currentConfig);
        close?.();
      };

      const handleExtraButtonCancel = (close) => {
        setCurrentConfig(originalConfig);
        close?.();
      };

      (openStateModal as Function)({
        title: translate('title'),
        width: { small: 600, middle: 1000, large: 1600 }['middle'],
        style: { maxHeight: 1000, overflowY: 'scroll', overflowX: 'auto' },
        modalSize: StateModalSize.SMALL,
        onOk: handleExtraButtonConfirm,
        content: <FilterActions.ArrangeFilterAction {...props} />,
        onCancel: handleExtraButtonCancel,
      });
    };

    return (
      <>
        <BaseDataConfigSection
          ancestors={ancestors}
          modalSize={StateModalSize.MIDDLE}
          translate={translate}
          config={extendedConfig}
          onConfigChanged={handleConfigChange}
          extra={() =>
            enableExtraAction ? (
              <Button
                size="small"
                icon={<BarsOutlined />}
                onClick={handleShowExtraFunctionDialog}
              >
                {translate('arrange')}
              </Button>
            ) : null
          }
        />
        {contextHolder}
      </>
    );
  },
  dataConfigSectionComparer,
);

export default FilterTypeSection;
