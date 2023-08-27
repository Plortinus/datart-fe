import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      name: '登录页',
      path: '/login',
      component: './LoginPage',
    },
  ],
  proxy: {
    '/api/v1': {
      changeOrigin: true,
      target: 'http://localhost:8080/',
    },
    '/resources': {
      changeOrigin: true,
      target: 'http://localhost:8080/',
    },
  },
  npmClient: 'pnpm',
});
