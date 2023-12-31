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

import { ChartLifecycle } from '@/constants';
import { ChartDrillOption } from '@/models/ChartDrillOption';
import { ValueOf } from 'types';
import { ChartConfig, SelectedItem } from './ChartConfig';
import ChartDataSetDTO from './ChartDataSet';

export type BrokerLifecycleEvent = ValueOf<typeof ChartLifecycle>;

export type BrokerContext = {
  window: Window;
  document: Document;
  width?: number;
  height?: number;
  translator?: (key: string, disablePrefix?: boolean, options?: any) => string;
};

export type BrokerOption = {
  containerId: string;
  dataset?: ChartDataSetDTO;
  config?: ChartConfig;
  widgetSpecialConfig?: { env: string | undefined; [x: string]: any };
  drillOption?: ChartDrillOption;
  selectedItems?: Array<SelectedItem>;
};
