import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'React Text Maker',
  description: '一个用于创建和编辑文本的 React 组件',
  vite: {
    plugins: [react()],
    resolve: {
      alias: {
        'react-text-maker': resolve(__dirname, '../../src/ReactTextMaker.tsx')
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    }
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples' },
      { text: 'API', link: '/guide/api' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shiyangzhaoa/react-text-maker' }
    ]
  }
}); 