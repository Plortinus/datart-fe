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

import { ListSwitch } from '@/components';
import useI18NPrefix from '@/hooks/useI18NPrefix';
import { selectOrgId } from '@/pages/MainPage/slice/selectors';
import { SPACE_XS } from '@/styles/StyleConstants';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components/macro';
import { MemberList } from './MemberList';
import { RoleList } from './RoleList';

export const Sidebar = memo(() => {
  const [selectedKey, setSelectedKey] = useState('');
  const history = useHistory();
  const orgId = useSelector(selectOrgId);
  const { url } = useRouteMatch();
  const t = useI18NPrefix('member.sidebar');

  useEffect(() => {
    const urlArr = url.split('/');
    setSelectedKey(urlArr[urlArr.length - 1]);
  }, [url]);

  const titles = useMemo(
    () => [
      { key: 'members', icon: <UserOutlined />, text: t('member') },
      {
        key: 'roles',
        icon: <TeamOutlined />,
        text: t('role'),
      },
    ],
    [t],
  );

  const switchSelect = useCallback(
    (key) => {
      history.push(`/organizations/${orgId}/${key}`);
    },
    [history, orgId],
  );

  return (
    <Wrapper>
      <ListSwitch
        titles={titles}
        selectedKey={selectedKey}
        onSelect={switchSelect}
      />
      {selectedKey === 'members' && <MemberList />}
      {selectedKey === 'roles' && <RoleList />}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 320px;
  padding: ${SPACE_XS} 0;
  background-color: ${(p) => p.theme.componentBackground};
  border-right: 1px solid ${(p) => p.theme.borderColorSplit};
`;
