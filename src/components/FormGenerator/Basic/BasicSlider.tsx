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

import { ChartStyleConfig } from '@/types/ChartConfig';
import { Slider } from 'antd';
import isUndefined from 'lodash/isUndefined';
import { FC, memo } from 'react';
import { ItemLayoutProps } from '../types';
import { itemLayoutComparer } from '../utils';
import { BW } from './components/BasicWrapper';

const BasicSlider: FC<ItemLayoutProps<ChartStyleConfig>> = memo(
  ({ ancestors, translate: t = (title) => title, data: row, onChange }) => {
    const { comType, options, ...rest } = row;

    return (
      <BW label={t(row.label, true)}>
        <Slider
          {...rest}
          {...options}
          min={!isUndefined(options?.min) ? Number(options?.min) : 1}
          max={!isUndefined(options?.max) ? Number(options?.max) : 10}
          step={!isUndefined(options?.step) ? Number(options?.step) : 1}
          dots={isUndefined(options?.dots) ? true : options?.dots}
          defaultValue={rest?.default}
          onChange={(value) => onChange?.(ancestors, value)}
        />
      </BW>
    );
  },
  itemLayoutComparer,
);

export default BasicSlider;
