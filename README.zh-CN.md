# React Text Maker

[English](README.md) | 简体中文

一个用于文本高亮和注释的 React 组件，支持自定义主题和交互功能。

<p>
  <img src="./logo.svg" alt="Tailwind Tool">
</p>
<p>
  <a href="https://www.npmjs.com/package/react-text-maker"><img src="https://img.shields.io/npm/dm/react-text-maker?style=flat-square" alt="Total Downloads"></a>
  <a href="https://www.npmjs.com/package/react-text-maker"><img src="https://img.shields.io/bundlephobia/minzip/react-text-maker?style=flat-square" alt="Latest Release"></a>
  <a href="https://github.com/shiyangzhaoa/react-text-maker/blob/main/LICENSE"><img src="https://shields.io/github/license/shiyangzhaoa/react-text-maker?style=flat-square" alt="License"></a>
</p>

## 特性

- 🎨 可自定义高亮颜色和主题
- 🖱️ 交互式文本选择和高亮
- ⌨️ 键盘快捷键支持（Delete/Backspace 删除高亮）
- 🎯 支持多个高亮和嵌套范围
- ♿ 无障碍支持
- 📱 响应式设计
- 🧪 完整的测试覆盖
- 🔍 可自定义提示显示
- 🎭 基于主题的高亮
- ⚡ 实时高亮更新

## 安装

```bash
# 使用 npm
npm install react-text-maker

# 使用 yarn
yarn add react-text-maker

# 使用 pnpm
pnpm add react-text-maker
```

## 使用

```tsx
// 导入组件
import { ReactTextMaker } from 'react-text-maker';
// 导入 CSS 文件
import 'react-text-maker/dist/style.css';

function App() {
  const [highlights, setHighlights] = useState([]);

  return (
    <ReactTextMaker
      text="你的文本内容"
      hint="注释"
      onChange={setHighlights}
      onMarkClick={(ids) => console.log('点击的高亮:', ids)}
      onMarkAdd={(item) => console.log('添加的高亮:', item)}
      onMarkRemove={(items) => console.log('删除的高亮:', items)}
    />
  );
}
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|---------|-------------|
| text | string | 必填 | 需要高亮的文本内容 |
| hint | string | 必填 | 与高亮一起显示的提示文本 |
| value | HighlightItem[] | [] | 高亮项目数组 |
| onChange | (items: HighlightItem[]) => void | - | 高亮变化时的回调函数 |
| onMarkClick | (ids: string[]) => void | - | 点击高亮时的回调函数 |
| onMarkAdd | (item: HighlightItem) => void | - | 添加高亮时的回调函数 |
| onMarkRemove | (items: HighlightItem[]) => void \| boolean | - | 删除高亮时的回调函数 |
| disabled | boolean | false | 是否禁用组件 |
| className | string | - | 额外的 CSS 类名 |
| style | React.CSSProperties | - | 额外的内联样式 |
| theme | (string \| { hint: string; color?: string })[] | DEFAULT_THEME | 高亮颜色代码或主题对象数组 |
| maxCount | number | - | 允许的最大高亮数量 |
| hintStyle | React.CSSProperties | - | 提示文本的自定义样式 |

## HighlightItem 类型

```typescript
interface HighlightItem {
  id: string;           // 高亮的唯一标识符
  text: string;         // 高亮的文本内容
  hint: string;         // 显示的提示文本
  range: [number, number]; // 高亮的起始和结束索引
  color: [number, number, number];       // rgb 颜色值
}
```

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 运行测试覆盖率
pnpm test:coverage

# 运行测试 UI
pnpm test:ui

# 构建
pnpm build

# 代码检查
pnpm lint

# 自动修复代码检查问题
pnpm lint:fix
```

## 测试

项目使用 Vitest 和 React Testing Library 进行测试。运行以下命令：

```bash
# 运行测试
pnpm test

# 运行测试覆盖率
pnpm test:coverage

# 运行测试 UI
pnpm test:ui
```

## 贡献

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m '添加一些很棒的特性'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

MIT 