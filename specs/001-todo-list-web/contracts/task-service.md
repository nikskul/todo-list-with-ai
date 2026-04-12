# Contract: Task Service Interface

**Feature**: 001-todo-list-web
**Date**: 2026-04-12

## Описание

Контракт описывает интерфейс сервисного слоя для управления задачами. Сервис работает с `localStorage` браузера.

## Типы

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: string;  // ISO 8601
  updatedAt: string;  // ISO 8601
}

interface CreateTaskInput {
  title: string;       // 1-200 символов, не только пробелы
  description?: string; // 0-2000 символов
}

interface UpdateTaskInput {
  title?: string;       // 1-200 символов, не только пробелы
  description?: string;  // 0-2000 символов
}
```

## Операции

### getAllTasks()

```typescript
function getAllTasks(): Task[]
```

**Возвращает**: Массив всех задач (любые статусы)
**Ошибки**: Не выбрасывает

---

### getActiveTasks()

```typescript
function getActiveTasks(): Task[]
```

**Возвращает**: Только активные задачи (status === 'active')
**Ошибки**: Не выбрасывает

---

### getArchivedTasks()

```typescript
function getArchivedTasks(): Task[]
```

**Возвращает**: Только архивированные задачи (status === 'archived')
**Ошибки**: Не выбрасывает

---

### createTask(input)

```typescript
function createTask(input: CreateTaskInput): Task
```

**Вход**: `CreateTaskInput` — заголовок (обяз.) и описание (необ.)

**Валидация**:
- `title` не пустой и не только пробелы → иначе `ValidationError`
- `title` ≤ 200 символов → иначе `ValidationError`
- `description` ≤ 2000 символов → иначе `ValidationError`

**Возвращает**: Созданную задачу с `id`, `createdAt`, `updatedAt`
**Ошибки**: `ValidationError` при нарушении правил

---

### updateTask(id, input)

```typescript
function updateTask(id: string, input: UpdateTaskInput): Task
```

**Вход**: `id` задачи, `UpdateTaskInput` — поля для обновления

**Валидация**: Те же правила, что и для `createTask`

**Возвращает**: Обновлённую задачу (с новым `updatedAt`)
**Ошибки**: `NotFoundError` если задача не найдена; `ValidationError`

---

### completeTask(id)

```typescript
function completeTask(id: string): Task
```

**Вход**: `id` задачи

**Поведение**: Статус → `'completed'`

**Возвращает**: Задачу с обновлённым статусом
**Ошибки**: `NotFoundError` если задача не найдена

---

### archiveTask(id)

```typescript
function archiveTask(id: string): Task
```

**Вход**: `id` задачи

**Поведение**: Статус → `'archived'`

**Возвращает**: Задачу с обновлённым статусом
**Ошибки**: `NotFoundError` если задача не найдена

---

### restoreTask(id)

```typescript
function restoreTask(id: string): Task
```

**Вход**: `id` задачи

**Поведение**: Статус → `'active'`

**Возвращает**: Задачу с обновлённым статусом
**Ошибки**: `NotFoundError` если задача не найдена

---

### deleteTask(id)

```typescript
function deleteTask(id: string): void
```

**Вход**: `id` задачи

**Поведение**: Полное удаление задачи из хранилища

**Ошибки**: `NotFoundError` если задача не найдена
