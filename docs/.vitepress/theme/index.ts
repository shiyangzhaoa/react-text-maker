import DefaultTheme from 'vitepress/theme';

import ExamplesWrapper from './ExamplesWrapper.vue';
import './custom.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Examples', ExamplesWrapper);
  }
}; 