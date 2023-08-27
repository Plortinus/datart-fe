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
import { FC, memo } from 'react';
import { ItemLayout } from '../Layout';
import { ItemLayoutProps } from '../types';
import { itemLayoutComparer } from '../utils';

const template = {
  label: `viz.palette.style.nameLocation.title`,
  key: 'nameLocation',
  default: 'center',
  comType: 'select',
  options: {
    translateItemLabel: true,
    items: [
      { label: 'viz.palette.style.nameLocation.start', value: 'start' },
      { label: 'viz.palette.style.nameLocation.center', value: 'center' },
      { label: 'viz.palette.style.nameLocation.end', value: 'end' },
    ],
  },
};

const NameLocation: FC<ItemLayoutProps<ChartStyleConfig>> = memo(
  ({
    ancestors,
    translate: t = (title) => title,
    data,
    dataConfigs,
    onChange,
  }) => {
    const props = {
      ancestors,
      data: Object.assign({}, data, {
        label: data?.label || template.label,
        key: data?.key || template.key,
        default: data?.default || template.default,
        options: data?.options || template.options,
        comType: 'select',
      }),
      translate: t,
      onChange,
      dataConfigs,
    };

    return <ItemLayout {...props} />;
  },
  itemLayoutComparer,
);

export default NameLocation;
