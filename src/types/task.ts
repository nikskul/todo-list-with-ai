/**
 * Статус задачи
 */
export enum TaskStatus {
  /** Активная задача (по умолчанию) */
  ACTIVE = 'active',
  /** Выполненная задача */
  COMPLETED = 'completed',
  /** Архивированная задача */
  ARCHIVED = 'archived',
}

/**
 * Основная сущность системы — задача (Task)
 */
export interface Task {
  /** Уникальный идентификатор (UUID v4) */
  id: string
  /** Заголовок (обязательный, 1-200 символов) */
  title: string
  /** Описание (необязательный, 0-2000 символов) */
  description: string
  /** Текущий статус */
  status: TaskStatus
  /** Дата создания (ISO 8601) */
  createdAt: string
  /** Дата последнего изменения (ISO 8601) */
  updatedAt: string
}

/**
 * Входные данные для создания задачи
 */
export interface CreateTaskInput {
  /** Заголовок: 1-200 символов, не только пробелы */
  title: string
  /** Описание: 0-2000 символов (необязательное) */
  description?: string
}

/**
 * Входные данные для обновления задачи
 */
export interface UpdateTaskInput {
  /** Заголовок: 1-200 символов, не только пробелы (необязательное) */
  title?: string
  /** Описание: 0-2000 символов (необязательное) */
  description?: string
}
