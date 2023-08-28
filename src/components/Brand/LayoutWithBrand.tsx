import { SPACE_TIMES } from '@/styles/StyleConstants';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Brand } from './Brand';

interface LayoutWithBrandProps {
  className?: string;
  children?: ReactNode;
}

const Layout = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${SPACE_TIMES(30)};

  &.alert {
    margin-top: ${SPACE_TIMES(20)};
  }
`;

export function LayoutWithBrand({ className, children }: LayoutWithBrandProps) {
  return (
    <Layout {...(className && { className })}>
      <Brand />
      {children}
    </Layout>
  );
}
