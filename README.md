[English Version](README_EN.md)

# 计算机组成原理探索 (Exploring the Core of Computer Organization)

本项目是一个使用 React, TypeScript 和 Vite 构建的交互式 Web 应用，旨在帮助用户通过可视化方式学习计算机系统的核心概念。

## 项目概述

应用通过以下主要模块提供学习体验：

*   **计算机系统概览 (`ComputerSystemOverview`)**: 展示计算机系统的基本组成部分及其相互关系。
*   **指令周期动画 (`InstructionCycleAnimation`)**: 通过动画形式演示指令在计算机内部的执行流程。

## 技术栈

*   **React**: 用于构建用户界面的 JavaScript 库。
*   **TypeScript**: 为 JavaScript 添加了静态类型检查。
*   **Vite**: 下一代前端构建工具，提供极速的冷启动和模块热更新。
*   **CSS**: 自定义样式，包括使用 CSS 变量进行主题化。

## 主要文件结构

```
src/
├── App.css                 # 应用全局样式
├── App.tsx                 # 主应用组件，定义页面布局和路由
├── index.css               # 全局基础样式和 CSS 变量定义
├── main.tsx                # 应用入口文件
├── vite-env.d.ts           # Vite 环境变量类型定义
├── assets/                 # 静态资源 (如图片)
└── components/             # React 组件
    ├── ComputerSystemOverview.tsx
    ├── ComputerSystemOverview.css
    ├── InstructionCycleAnimation.tsx
    └── InstructionCycleAnimation.css
```

## 运行项目

1.  确保已安装 Node.js 和 npm (或 yarn/pnpm)。
2.  克隆仓库到本地。
3.  进入项目根目录，安装依赖：
    ```bash
    npm install
    # 或者
    # yarn install
    # 或者
    # pnpm install
    ```
4.  启动开发服务器：
    ```bash
    npm run dev
    # 或者
    # yarn dev
    # 或者
    # pnpm dev
    ```
5.  在浏览器中打开指定的本地地址 (通常是 `http://localhost:5173`)。

## 项目目标

通过交互式和可视化的方式，使学习计算机组成原理更加直观和有趣。
