/**
 * Asynchronously loads the component for NotFoundPage
 */

import { LoadingOutlined } from '@ant-design/icons';
import { lazyLoad } from 'utils/loadable';

export const NotFoundPage = lazyLoad(
  () => import('./index'),
  (module) => module.NotFoundPage,
  {
    fallback: <LoadingOutlined />,
  },
);
