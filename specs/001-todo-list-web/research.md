# Research: TODO List Web Application

**Feature**: 001-todo-list-web
**Date**: 2026-04-12

## Decision: Фреймворк — Vue 3

**Rationale**: Пользователь указал Vue. Vue 3 — актуальная мажорная версия с Composition API, полноценной TypeScript-поддержкой и экосистемой.

**Alternatives considered**:
- React 18 — популярен, но пользователь выбрал Vue
- Svelte — проще, но меньше экосистема
- Angular — избыточен для простого TODO-приложения

---

## Decision: Язык — TypeScript

**Rationale**: Пользователь явно указал TypeScript. Строгая типизация снижает количество ошибок, улучшает автодополнение и рефакторинг.

**Alternatives considered**:
- Vanilla JS — проще, но пользователь отказался от этого варианта
- TypeScript со strict mode — включён по умолчанию для максимальной безопасности

---

## Decision: Сборщик — Vite

**Rationale**: Vite — стандартный выбор для Vue 3 проектов. Быстрый dev-сервер, HMR, нативная поддержка TypeScript и Vue SFC.

**Alternatives considered**:
- Webpack — зрелый, но медленнее и сложнее в настройке
- Parcel — прост, но менее гибокий

---

## Decision: Тестирование — Vitest + Vue Test Utils

**Rationale**: Vitest — нативный тест-раннер для Vite-проектов. Vue Test Utils — официальная библиотека для тестирования компонентов Vue.

**Alternatives considered**:
- Jest — работает, но требует дополнительной конфигурации с Vite
- Cypress — e2e тесты, избыточны для первой версии

---

## Decision: Хранение данных — localStorage

**Rationale**: Указано в спецификации (FR-012). Не требует сервера, работает оффлайн, достаточно для ~200 задач.

**Alternatives considered**:
- IndexedDB — больше объём, но сложнее API (не нужно для этого масштаба)
- Server-side storage — противоречит требованию простоты

---

## Decision: Стилизация — CSS без фреймворков

**Rationale**: Приложение должно быть максимально простым. Чистый CSS с CSS Modules или scoped styles в Vue SFC достаточно.

**Alternatives considered**:
- Tailwind CSS — удобен, но добавляет зависимость
- Bootstrap — избыточен для простого TODO
- scoped CSS в Vue — встроенная возможность, минимум зависимостей

---

## Decision: Линтинг — ESLint + Prettier

**Rationale**: Стандартный набор для TypeScript/Vue проектов. Обеспечивает соблюдение принципов III и V конституции.

**Alternatives considered**:
- Biome — быстрее, но меньше зрелость для Vue
- Без линтинга — нарушает принцип V конституции
