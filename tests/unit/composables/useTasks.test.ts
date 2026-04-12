import { describe, it, expect, beforeEach } from 'vitest'
import { useTasks } from '@/composables/useTasks'
import { TaskStatus } from '@/types/task'

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('инициализируется с пустым списком активных задач', () => {
    const { activeTasks } = useTasks()
    expect(activeTasks.value).toHaveLength(0)
  })

  it('создаёт задачу и добавляет в активный список', () => {
    const { activeTasks, createTask } = useTasks()
    createTask({ title: 'Тестовая задача', description: 'Описание' })
    expect(activeTasks.value).toHaveLength(1)
    expect(activeTasks.value[0].title).toBe('Тестовая задача')
  })

  it('отмечает задачу как выполненную — она исчезает из активных', () => {
    const { activeTasks, createTask, completeTask } = useTasks()
    const task = createTask({ title: 'Задача' })
    completeTask(task.id)
    expect(activeTasks.value).toHaveLength(0)
  })

  it('архивирует задачу — она исчезает из активных', () => {
    const { activeTasks, createTask, archiveTask } = useTasks()
    const task = createTask({ title: 'Задача' })
    archiveTask(task.id)
    expect(activeTasks.value).toHaveLength(0)
  })

  it('возвращает архивные задачи', () => {
    const { archivedTasks, createTask, archiveTask } = useTasks()
    const task = createTask({ title: 'Задача' })
    archiveTask(task.id)
    expect(archivedTasks.value).toHaveLength(1)
  })

  it('восстанавливает задачу из архива', () => {
    const { archivedTasks, activeTasks, createTask, archiveTask, restoreTask } = useTasks()
    const task = createTask({ title: 'Задача' })
    archiveTask(task.id)
    restoreTask(task.id)
    expect(archivedTasks.value).toHaveLength(0)
    expect(activeTasks.value).toHaveLength(1)
  })

  it('обновляет заголовок задачи', () => {
    const { activeTasks, createTask, updateTask } = useTasks()
    const task = createTask({ title: 'Старый' })
    updateTask(task.id, { title: 'Новый' })
    expect(activeTasks.value[0].title).toBe('Новый')
  })
})
