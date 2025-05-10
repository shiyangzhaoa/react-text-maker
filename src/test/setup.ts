import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { expect, afterEach } from 'vitest';

// 扩展 Vitest 的 expect 方法
expect.extend(matchers);

// 每个测试后自动清理
afterEach(() => {
  cleanup();
}); 