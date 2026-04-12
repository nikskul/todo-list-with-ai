# Quickstart: TODO List Web Application

**Feature**: 001-todo-list-web
**Date**: 2026-04-12

## Prerequisites

- Node.js >= 20.0
- npm >= 10.0 (или pnpm/yarn)
- Современный браузер (Chrome, Firefox, Edge, Safari — последние 2 версии)

## Setup

```bash
# 1. Клонировать репозиторий
git clone <repository-url>
cd todo-list-with-ai

# 2. Установить зависимости
npm install

# 3. Запустить dev-сервер
npm run dev
```

Приложение откроется по адресу `http://localhost:5173` (или другой свободный порт).

## Available Scripts

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера с HMR |
| `npm run build` | Продакшен-сборка |
| `npm run preview` | Предпросмотр продакшен-сборки |
| `npm run test` | Запуск всех тестов |
| `npm run test:unit` | Запуск unit-тестов |
| `npm run lint` | Проверка линтером |
| `npm run format` | Форматирование кода |

## Project Structure

```
src/
├── types/           # TypeScript типы и интерфейсы
├── services/        # Сервисный слой (работа с данными)
├── composables/     # Composition API хуки (бизнес-логика)
├── components/      # Vue компоненты
├── App.vue          # Корневой компонент
└── main.ts          # Точка входа
```

## Testing

```bash
# Запустить все тесты
npm run test

# Запустить с покрытием
npm run test -- --coverage
```

## Architecture Overview

Приложение работает полностью в браузере. Данные задач хранятся в `localStorage`.

- **Сервисный слой** (`taskStorage.ts`) — CRUD-операции над localStorage
- **Composable** (`useTasks.ts`) — реактивное управление состоянием задач
- **Компоненты** — отображение и взаимодействие с пользователем

```
┌─────────────────────────────────────┐
│            App.vue                  │
│  ┌───────────┐  ┌────────────────┐  │
│  │ TaskForm  │  │   TaskList     │  │
│  │ (создание │  │ ┌────────────┐ │  │
│  │ /редакт.) │  │ │  TaskItem  │ │  │
│  └───────────┘  │ └────────────┘ │  │
│                 └────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │        ArchiveView            │  │
│  └───────────────────────────────┘  │
└─────────────────┬───────────────────┘
                  │
         ┌────────▼────────┐
         │   useTasks.ts   │
         │  (composable)   │
         └────────┬────────┘
                  │
         ┌────────▼────────┐
         │  taskStorage.ts │
         │   (localStorage)│
         └─────────────────┘
```
