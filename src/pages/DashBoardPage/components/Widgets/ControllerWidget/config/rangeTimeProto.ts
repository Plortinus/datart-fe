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

import { ORIGINAL_TYPE_MAP } from '@/pages/DashBoardPage/constants';
import {
  WidgetMeta,
  WidgetProto,
  WidgetToolkit,
} from '@/pages/DashBoardPage/types/widgetTypes';
import { WHITE } from '@/styles/StyleConstants';
import { controlWidgetTpl, getControlDropDownList } from '.';
import {
  ImmediateQueryI18N,
  PaddingI18N,
  TitleI18N,
  initBackgroundTpl,
  initBorderTpl,
  initPaddingTpl,
  initWidgetName,
} from '../../../WidgetManager/utils/init';

const NameI18N = {
  zh: '时间范围',
  en: 'RangeTime',
};
export const widgetMeta: WidgetMeta = {
  icon: 'control-widget',
  originalType: ORIGINAL_TYPE_MAP.rangeTime,
  canWrapped: true,
  controllable: true,
  linkable: false,
  canFullScreen: false,
  singleton: false,

  i18ns: [
    {
      lang: 'zh-CN',
      translation: {
        desc: '',
        widgetName: NameI18N.zh,
        action: {},
        title: TitleI18N.zh,
        immediateQuery: ImmediateQueryI18N.zh,
        background: { backgroundGroup: '背景' },
        padding: PaddingI18N.zh,

        border: { borderGroup: '边框' },
      },
    },
    {
      lang: 'en-US',
      translation: {
        desc: '',
        widgetName: NameI18N.en,
        action: {},
        title: TitleI18N.en,
        immediateQuery: ImmediateQueryI18N.en,
        background: { backgroundGroup: 'Background' },
        padding: PaddingI18N.en,

        border: { borderGroup: 'Border' },
      },
    },
  ],
};

export const widgetToolkit: WidgetToolkit = {
  create: (opt) => {
    const widget = controlWidgetTpl(opt);
    widget.id = widgetMeta.originalType + widget.id;
    widget.config.originalType = widgetMeta.originalType;
    widget.config.name = opt.name || '';
    widget.config.rect.height = 60;
    const addProps = [
      { ...initBackgroundTpl(WHITE) },
      { ...initPaddingTpl() },
      { ...initBorderTpl() },
    ];
    widget.config.customConfig.props?.forEach((ele) => {
      if (ele.key === 'titleGroup') {
        ele.rows?.forEach((row) => {
          if (row.key === 'showTitle') {
            row.value = true;
          }
        });
      }
    });
    widget.config.customConfig.props =
      widget.config.customConfig.props?.concat(addProps);
    return widget;
  },
  getName(key) {
    return initWidgetName(NameI18N, key);
  },
  getDropDownList(...arg) {
    return getControlDropDownList(false);
  },
  edit() {},
  save() {},
  // lock() {},
  // unlock() {},
  // copy() {},
  // paste() {},
  // delete() {},
  // changeTitle() {},
  // getMeta() {},
  // getWidgetName() {},
  // //
};

const rangeTimeProto: WidgetProto = {
  originalType: widgetMeta.originalType,
  meta: widgetMeta,
  toolkit: widgetToolkit,
};
export default rangeTimeProto;
