import { WorkbenchState } from '@/pages/ChartWorkbenchPage/slice/types';
import { BoardState } from '@/pages/DashBoardPage/pages/Board/slice/types';
import { EditBoardState } from '@/pages/DashBoardPage/pages/BoardEditor/slice/types';
import { MemberState } from '@/pages/MainPage/pages/MemberPage/slice/types';
import { PermissionState } from '@/pages/MainPage/pages/PermissionPage/slice/types';
import { ScheduleState } from '@/pages/MainPage/pages/SchedulePage/slice/types';
import { SourceState } from '@/pages/MainPage/pages/SourcePage/slice/types';
import { VariableState } from '@/pages/MainPage/pages/VariablePage/slice/types';
import { ViewState } from '@/pages/MainPage/pages/ViewPage/slice/types';
import { VizState } from '@/pages/MainPage/pages/VizPage/slice/types';
import { MainState } from '@/pages/MainPage/slice/types';
import { SharePageState } from '@/pages/SharePage/slice/types';
import { StoryBoardState } from '@/pages/StoryBoardPage/slice/types';
import { AppState } from '@/slice/types';
import { CSSProp } from 'styled-components';
import { ThemeState } from './styles/theme/slice/types';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}

export interface RootState {
  theme?: ThemeState;
  app?: AppState;
  main?: MainState;
  member?: MemberState;
  permission?: PermissionState;
  variable?: VariableState;
  source?: SourceState;
  schedule?: ScheduleState;
  view?: ViewState;
  viz?: VizState;
  board?: BoardState;
  storyBoard?: StoryBoardState;
  editBoard?: EditBoardState;
  workbench?: WorkbenchState;
  share?: SharePageState;
}
export interface APIResponse<T> {
  success: boolean;
  errCode: number;
  message: string;
  exception: string;
  data: T;
  warnings: string[];
}

// dinero.js
export declare type Currency<TAmount> = {
  /**
   * The unique code of the currency.
   */
  readonly code: string;
  /**
   * The base, or radix of the currency.
   */
  readonly base: TAmount;
  /**
   * The exponent of the currency.
   */
  readonly exponent: TAmount;
};

export type ValueOf<T> = T[keyof T];

export type Nullable<T> = T | null | undefined;

export interface IFontDefault {
  fontFamily: string;
  fontSize: number | string;
  fontWeight: number | string;
  fontStyle: string;
  color: string;
}
