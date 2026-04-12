# Data Model: TODO List Web Application

**Feature**: 001-todo-list-web
**Date**: 2026-04-12

## Entities

### Task (Задача)

Основная сущность системы. Представляет единицу работы.

```typescript
interface Task {
  id: string;           // Уникальный идентификатор (UUID v4)
  title: string;        // Заголовок (обязательный, 1-200 символов)
  description: string;  // Описание (необязательный, 0-2000 символов)
  status: TaskStatus;   // Текущий статус
  createdAt: string;    // Дата создания (ISO 8601)
  updatedAt: string;    // Дата последнего изменения (ISO 8601)
}
```

### TaskStatus (Статус задачи)

```typescript
enum TaskStatus {
  ACTIVE = 'active',         // Активная задача (по умолчанию)
  COMPLETED = 'completed',   // Выполненная задача
  ARCHIVED = 'archived'      // Архивированная задача
}
```

## Validation Rules

| Поле | Правила |
|------|---------|
| `id` | Генерируется автоматически (UUID v4), недоступен для редактирования |
| `title` | Обязательное; не пустое; не только пробелы; макс. 200 символов |
| `description` | Необязательное; макс. 2000 символов |
| `status` | Допустимые значения: `active`, `completed`, `archived` |
| `createdAt` | Устанавливается автоматически при создании |
| `updatedAt` | Обновляется автоматически при каждом изменении |

## State Transitions

```
                    ┌──────────────┐
                    │   ACTIVE     │ (начальное состояние)
                    └──────┬───────┘
                     ┌─────┴─────┐
                     │           │
              «Выполнено»   «Архивировать»
                     │           │
                     ▼           ▼
            ┌────────────┐  ┌────────────┐
            │ COMPLETED  │  │  ARCHIVED  │
            └────────────┘  └─────┬──────┘
                                  │
                           «Восстановить»
                                  │
                                  ▼
                          ┌────────────┐
                          │   ACTIVE   │
                          └────────────┘
```

- **ACTIVE → COMPLETED**: Пользователь отмечает задачу как выполненную
- **ACTIVE → ARCHIVED**: Пользователь архивирует задачу
- **COMPLETED → ARCHIVED**: Пользователь может архивировать выполненную задачу
- **ARCHIVED → ACTIVE**: Пользователь восстанавливает задачу из архива

## Storage Schema (localStorage)

```typescript
// Ключ в localStorage
const STORAGE_KEY = 'todo-list-tasks';

// Формат хранения
interface TaskStorage {
  tasks: Task[];  // Массив всех задач (включая выполненные и архивные)
}
```

## XSS Protection

Все строковые поля (`title`, `description`) ДОЛЖНЫ экранироваться при отображении. Vue 3 автоматически экранирует интерполяции `{{ }}`, но при использовании `v-html` необходимо ручное экранирование.
