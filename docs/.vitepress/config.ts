import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'React Text Maker',
  description: 'A React component for text highlighting and annotation',
  base: '/react-text-maker/',
  vite: {
    plugins: [react()],
    resolve: {
      alias: {
        'react-text-maker': resolve(__dirname, '../../src/ReactTextMaker.tsx')
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
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