import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task'
import { TaskStatus } from '@/types/task'
import { ValidationError, NotFoundError } from '@/types/errors'

/** Ключ для хранения в localStorage */
const STORAGE_KEY = 'todo-list-tasks'

/** Максимальная длина заголовка */
const MAX_TITLE_LENGTH = 200
/** Максимальная длина описания */
const MAX_DESCRIPTION_LENGTH = 2000

/**
 * Генерация UUID v4 (упрощённая)
 */
function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Получение текущего времени в ISO 8601
 */
function now(): string {
  return new Date().toISOString()
}

/**
 * Валидация заголовка
 */
function validateTitle(title: string): void {
  if (!title || title.trim().length === 0) {
    throw new ValidationError('Заголовок не может быть пустым')
  }
  if (title.length > MAX_TITLE_LENGTH) {
    throw new ValidationError(`Заголовок не может быть длиннее ${MAX_TITLE_LENGTH} символов`)
  }
}

/**
 * Валидация описания
 */
function validateDescription(description: string): void {
  if (description && description.length > MAX_DESCRIPTION_LENGTH) {
    throw new ValidationError(`Описание не может быть длиннее ${MAX_DESCRIPTION_LENGTH} символов`)
  }
}

/**
 * Загрузка всех задач из localStorage
 */
function loadTasks(): Task[] {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  try {
    return JSON.parse(data) as Task[]
  } catch {
    return []
  }
}

/**
 * Сохранение всех задач в localStorage
 */
function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

/**
 * Поиск задачи по ID
 */
function findById(tasks: Task[], id: string): number {
  return tasks.findIndex((t) => t.id === id)
}

/**
 * Сервис для управления задачами в localStorage
 */
export const taskStorage = {
  /**
   * Получить все задачи (любые статусы)
   */
  getAllTasks(): Task[] {
    return loadTasks()
  },

  /**
   * Получить только активные задачи
   */
  getActiveTasks(): Task[] {
    return loadTasks().filter((t) => t.status === TaskStatus.ACTIVE)
  },

  /**
   * Получить только архивированные задачи
   */
  getArchivedTasks(): Task[] {
    return loadTasks().filter((t) => t.status === TaskStatus.ARCHIVED)
  },

  /**
   * Создать новую задачу
   */
  createTask(input: CreateTaskInput): Task {
    validateTitle(input.title)
    validateDescription(input.description || '')

    const task: Task = {
      id: generateId(),
      title: input.title.trim(),
      description: input.description || '',
      status: TaskStatus.ACTIVE,
      createdAt: now(),
      updatedAt: now(),
    }

    const tasks = loadTasks()
    tasks.push(task)
    saveTasks(tasks)

    return task
  },

  /**
   * Обновить существующую задачу
   */
  updateTask(id: string, input: UpdateTaskInput): Task {
    const tasks = loadTasks()
    const index = findById(tasks, id)

    if (index === -1) {
      throw new NotFoundError('Задача не найдена')
    }

    const task = tasks[index]!

    if (input.title !== undefined) {
      validateTitle(input.title)
      task.title = input.title.trim()
    }
    if (input.description !== undefined) {
      validateDescription(input.description)
      task.description = input.description
    }

    task.updatedAt = now()
    saveTasks(tasks)

    return task
  },

  /**
   * Пометить задачу как выполненную
   */
  completeTask(id: string): Task {
    const tasks = loadTasks()
    const index = findById(tasks, id)

    if (index === -1) {
      throw new NotFoundError('Задача не найдена')
    }

    const task = tasks[index]!
    task.status = TaskStatus.COMPLETED
    task.updatedAt = now()
    saveTasks(tasks)

    return task
  },

  /**
   * Архивировать задачу
   */
  archiveTask(id: string): Task {
    const tasks = loadTasks()
    const index = findById(tasks, id)

    if (index === -1) {
      throw new NotFoundError('Задача не найдена')
    }

    const task = tasks[index]!
    task.status = TaskStatus.ARCHIVED
    task.updatedAt = now()
    saveTasks(tasks)

    return task
  },

  /**
   * Восстановить задачу из архива
   */
  restoreTask(id: string): Task {
    const tasks = loadTasks()
    const index = findById(tasks, id)

    if (index === -1) {
      throw new NotFoundError('Задача не найдена')
    }

    const task = tasks[index]!
    task.status = TaskStatus.ACTIVE
    task.updatedAt = now()
    saveTasks(tasks)

    return task
  },

  /**
   * Удалить задачу полностью
   */
  deleteTask(id: string): void {
    const tasks = loadTasks()
    const index = findById(tasks, id)

    if (index === -1) {
      throw new NotFoundError('Задача не найдена')
    }

    tasks.splice(index, 1)
    saveTasks(tasks)
  },
}
