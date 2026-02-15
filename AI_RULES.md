# AI Rules for Biosweet Website Design

This document outlines the technical stack and guidelines for developing features within the Biosweet website application. Adhering to these rules ensures consistency, maintainability, and optimal performance.

## Tech Stack Overview

The Biosweet website is built using a modern and interactive web stack, focusing on performance, user experience, and maintainability.

*   **React**: The core JavaScript library for building dynamic and interactive user interfaces.
*   **Next.js**: A powerful React framework that provides server-side rendering, static site generation, and file-system routing (using the `app` directory).
*   **TypeScript**: A superset of JavaScript that adds static typing, significantly enhancing code quality, readability, and developer experience.
*   **Tailwind CSS**: A utility-first CSS framework used for rapidly styling components with a strong emphasis on responsive design.
*   **Framer Motion**: A production-ready library for creating fluid animations, transitions, and complex interactive gestures with ease.
*   **Shadcn/ui & Radix UI**: A collection of re-usable, accessible, and customizable UI components built with Radix UI primitives and styled with Tailwind CSS.
*   **Lucide React**: A comprehensive library of beautiful and customizable open-source icons.
*   **Haptic Feedback API**: Utilized through a custom hook (`useHapticFeedback`) to provide tactile feedback on user interactions, enhancing the mobile experience.
*   **React Context API**: Employed for efficient global state management, as seen with the `CartProvider` and `SoundProvider`.

## Library Usage Guidelines

To maintain consistency and leverage the strengths of each library, please adhere to the following rules:

*   **UI Components & Pages**: All user interface components and application pages must be built using **React** and **Next.js**. Routing and page structure are managed via Next.js's `app` directory.
*   **Styling**: Exclusively use **Tailwind CSS** for all styling. Avoid inline styles or custom CSS files unless absolutely necessary for global overrides or specific animations not covered by Framer Motion.
*   **Animations & Interactivity**: **Framer Motion** is the designated library for all animations, transitions, and complex interactive elements.
*   **Pre-built UI Components**: Prioritize using components from **Shadcn/ui** and **Radix UI** for common UI elements (e.g., buttons, forms, dialogs). If a Shadcn component requires modification, create a new component that wraps or extends it, rather than directly editing the original Shadcn source file.
*   **Icons**: Use **Lucide React** for all iconography throughout the application.
*   **Global State Management**: For application-wide state (such as the shopping cart, sound settings, or other global configurations), utilize the **React Context API** as demonstrated by existing providers.
*   **User Feedback**: Implement tactile feedback for significant user interactions using the `useHapticFeedback` hook from `components/haptic-feedback.tsx`. Integrate audio feedback for user actions using the `useSound` hook from `components/sound-effects.tsx`.
*   **Image Optimization**: Always use the `next/image` component for all images to ensure optimal loading, responsiveness, and performance.