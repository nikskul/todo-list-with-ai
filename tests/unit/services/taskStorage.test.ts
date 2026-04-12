import { describe, it, expect, beforeEach } from 'vitest'
import {
  taskStorage,
} from '@/services/taskStorage'
import { TaskStatus, CreateTaskInput } from '@/types/task'
import { ValidationError, NotFoundError } from '@/types/errors'

describe('taskStorage', () => {
  beforeEach(() => {
    // Очищаю localStorage перед каждым тестом
    localStorage.clear()
  })

  describe('getAllTasks', () => {
    it('возвращает пустой массив, если задач нет', () => {
      const tasks = taskStorage.getAllTasks()
      expect(tasks).toEqual([])
    })

    it('возвращает все задачи независимо от статуса', () => {
      taskStorage.createTask({ title: 'Активная' })
      taskStorage.createTask({ title: 'Ещё одна' })
      const tasks = taskStorage.getAllTasks()
      expect(tasks).toHaveLength(2)
    })
  })

  describe('getActiveTasks', () => {
    it('возвращает только активные задачи', () => {
      taskStorage.createTask({ title: 'Активная' })
      const created = taskStorage.createTask({ title: 'Выполненная' })
      taskStorage.completeTask(created.id)
      const active = taskStorage.getActiveTasks()
      expect(active).toHaveLength(1)
      expect(active[0].title).toBe('Активная')
    })
  })

  describe('getArchivedTasks', () => {
    it('возвращает только архивированные задачи', () => {
      taskStorage.createTask({ title: 'Активная' })
      const created = taskStorage.createTask({ title: 'Архивная' })
      taskStorage.archiveTask(created.id)
      const archived = taskStorage.getArchivedTasks()
      expect(archived).toHaveLength(1)
      expect(archived[0].title).toBe('Архивная')
    })
  })

  describe('createTask', () => {
    it('создаёт задачу с заголовком и описанием', () => {
      const input: CreateTaskInput = { title: 'Тест', description: 'Описание' }
      const task = taskStorage.createTask(input)
      expect(task.title).toBe('Тест')
      expect(task.description).toBe('Описание')
      expect(task.status).toBe(TaskStatus.ACTIVE)
      expect(task.id).toBeDefined()
      expect(task.createdAt).toBeDefined()
      expect(task.updatedAt).toBeDefined()
    })

    it('создаёт задачу с пустым описанием', () => {
      const task = taskStorage.createTask({ title: 'Без описания' })
      expect(task.description).toBe('')
    })

    it('выбрасывает ValidationError при пустом заголовке', () => {
      expect(() => taskStorage.createTask({ title: '' })).toThrow(ValidationError)
    })

    it('выбрасывает ValidationError при заголовке из пробелов', () => {
      expect(() => taskStorage.createTask({ title: '   ' })).toThrow(ValidationError)
    })

    it('выбрасывает ValidationError при заголовке > 200 символов', () => {
      expect(() => taskStorage.createTask({ title: 'a'.repeat(201) })).toThrow(ValidationError)
    })

    it('выбрасывает ValidationError при описании > 2000 символов', () => {
      expect(() =>
        taskStorage.createTask({ title: 'Ок', description: 'a'.repeat(2001) })
      ).toThrow(ValidationError)
    })
  })

  describe('updateTask', () => {
    it('обновляет заголовок задачи', () => {
      const created = taskStorage.createTask({ title: 'Старый' })
      // Небольшая задержка чтобы updatedAt отличался
      const beforeUpdate = created.updatedAt
      const updated = taskStorage.updateTask(created.id, { title: 'Новый' })
      expect(updated.title).toBe('Новый')
      expect(updated.updatedAt >= beforeUpdate).toBe(true)
    })

    it('выбрасывает NotFoundError если задача не найдена', () => {
      expect(() => taskStorage.updateTask('nonexistent', { title: 'Ок' })).toThrow(NotFoundError)
    })

    it('выбрасывает ValidationError при пустом заголовке', () => {
      const created = taskStorage.createTask({ title: 'Задача' })
      expect(() => taskStorage.updateTask(created.id, { title: '' })).toThrow(ValidationError)
    })
  })

  describe('completeTask', () => {
    it('меняет статус на completed', () => {
      const created = taskStorage.createTask({ title: 'Задача' })
      const completed = taskStorage.completeTask(created.id)
      expect(completed.status).toBe(TaskStatus.COMPLETED)
    })

    it('выбрасывает NotFoundError если задача не найдена', () => {
      expect(() => taskStorage.completeTask('nonexistent')).toThrow(NotFoundError)
    })
  })

  describe('archiveTask', () => {
    it('меняет статус на archived', () => {
      const created = taskStorage.createTask({ title: 'Задача' })
      const archived = taskStorage.archiveTask(created.id)
      expect(archived.status).toBe(TaskStatus.ARCHIVED)
    })

    it('выбрасывает NotFoundError если задача не найдена', () => {
      expect(() => taskStorage.archiveTask('nonexistent')).toThrow(NotFoundError)
    })
  })

  describe('restoreTask', () => {
    it('меняет статус на active', () => {
      const created = taskStorage.createTask({ title: 'Задача' })
      taskStorage.archiveTask(created.id)
      const restored = taskStorage.restoreTask(created.id)
      expect(restored.status).toBe(TaskStatus.ACTIVE)
    })

    it('выбрасывает NotFoundError если задача не найдена', () => {
      expect(() => taskStorage.restoreTask('nonexistent')).toThrow(NotFoundError)
    })
  })

  describe('deleteTask', () => {
    it('удаляет задачу', () => {
      const created = taskStorage.createTask({ title: 'Задача' })
      taskStorage.deleteTask(created.id)
      expect(taskStorage.getAllTasks()).toHaveLength(0)
    })

    it('выбрасывает NotFoundError если задача не найдена', () => {
      expect(() => taskStorage.deleteTask('nonexistent')).toThrow(NotFoundError)
    })
  })
})
