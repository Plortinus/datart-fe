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

import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { LazyMainPage } from './pages/MainPage/Loadable';
import { selectSystemInfo } from './slice/selectors';
import { getToken } from './utils/auth';

export function LoginAuthRoute() {
  const logged = !!getToken();
  const systemInfo = useSelector(selectSystemInfo);

  if (logged) {
    return <Route path="/" component={LazyMainPage} />;
  }

  if (systemInfo) {
    return <Redirect to={systemInfo.initialized ? '/login' : '/setup'} />;
  } else {
    // TODO: add system info load fail page
    return null;
  }
}
