[中文版](README.md)

# Exploring the Core of Computer Organization

This project is an interactive web application built with React, TypeScript, and Vite, designed to help users learn the core concepts of computer systems through visualization.

## Project Overview

The application provides a learning experience through the following main modules:

*   **Computer System Overview (`ComputerSystemOverview`)**: Displays the basic components of a computer system and their interrelationships.
*   **Instruction Cycle Animation (`InstructionCycleAnimation`)**: Demonstrates the execution flow of instructions within a computer through animation.

## Technology Stack

*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: Adds static type checking to JavaScript.
*   **Vite**: A next-generation front-end build tool that provides extremely fast cold starts and hot module replacement.
*   **CSS**: Custom styles, including theming using CSS variables.

## Main File Structure

```
src/
├── App.css                 # Global application styles
├── App.tsx                 # Main application component, defines page layout and routing
├── index.css               # Global base styles and CSS variable definitions
├── main.tsx                # Application entry point
├── vite-env.d.ts           # Vite environment variable type definitions
├── assets/                 # Static assets (e.g., images)
└── components/             # React components
    ├── ComputerSystemOverview.tsx
    ├── ComputerSystemOverview.css
    ├── InstructionCycleAnimation.tsx
    └── InstructionCycleAnimation.css
```

## Running the Project

1.  Ensure you have Node.js and npm (or yarn/pnpm) installed.
2.  Clone the repository to your local machine.
3.  Navigate to the project root directory and install dependencies:
    ```bash
    npm install
    # Or
    # yarn install
    # Or
    # pnpm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    # Or
    # yarn dev
    # Or
    # pnpm dev
    ```
5.  Open the specified local address in your browser (usually `http://localhost:5173`).

## Project Goal

To make learning computer organization more intuitive and engaging through interactive and visual methods.
