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

import echartsDefaultTheme from '@/assets/theme/echarts_default_theme.json';
import { ConfigProvider, message } from 'antd';
import { registerTheme } from 'echarts';
import { useEffect, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginAuthRoute } from './LoginAuthRoute';
import { StorageKeys } from './globalConstants';
import useI18NPrefix from './hooks/useI18NPrefix';
import { antdLocales } from './locales/i18n';
import { LazyActivationPage } from './pages/ActivationPage/Loadable';
import { LazyAuthorizationPage } from './pages/AuthorizationPage/Loadable';
import { LazyForgetPasswordPage } from './pages/ForgetPasswordPage/Loadable';
import { LazyLoginPage } from './pages/LoginPage/Loadable';
import { LazyRegisterPage } from './pages/RegisterPage/Loadable';
import { LazySetupPage } from './pages/SetupPage/Loadable';
import { useAppSlice } from './slice';
import { getSystemInfo, logout, setLoggedInUser } from './slice/thunks';
import { GlobalStyles } from './styles/globalStyles';
import { getToken } from './utils/auth';

registerTheme('default', echartsDefaultTheme);

export function AppRouter() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const logged = !!getToken();
  const t = useI18NPrefix('global');
  useAppSlice();

  useLayoutEffect(() => {
    if (logged) {
      dispatch(setLoggedInUser());
    } else {
      if (localStorage.getItem(StorageKeys.LoggedInUser)) {
        message.warning(t('tokenExpired'));
      }
      dispatch(logout());
    }
  }, [dispatch, t, logged]);

  useEffect(() => {
    dispatch(getSystemInfo());
  }, [dispatch]);

  return (
    <ConfigProvider locale={antdLocales[i18n.language]}>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - Datart"
          defaultTitle="Datart"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="Data Art" />
        </Helmet>
        <Routes>
          <Route path="/setup" Component={LazySetupPage} />
          <Route path="/login" Component={LazyLoginPage} />
          <Route path="/register" Component={LazyRegisterPage} />
          <Route path="/activation" Component={LazyActivationPage} />
          <Route path="/forgetPassword" Component={LazyForgetPasswordPage} />
          <Route path="/authorization" Component={LazyAuthorizationPage} />
          <LoginAuthRoute />
        </Routes>
        <GlobalStyles />
      </BrowserRouter>
    </ConfigProvider>
  );
}
