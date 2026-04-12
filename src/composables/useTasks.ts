import { ref, computed } from 'vue'
import { taskStorage } from '@/services/taskStorage'
import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task'
import { TaskStatus } from '@/types/task'

/**
 * Composable для реактивного управления задачами
 */
export function useTasks() {
  // Реактивное хранилище всех задач
  const allTasks = ref<Task[]>(taskStorage.getAllTasks())

  // Вычисляемые свойства
  const activeTasks = computed(() =>
    allTasks.value.filter((t) => t.status === TaskStatus.ACTIVE)
  )

  const archivedTasks = computed(() =>
    allTasks.value.filter((t) => t.status === TaskStatus.ARCHIVED)
  )

  /**
   * Обновить реактивное состояние из localStorage
   */
  function refresh(): void {
    allTasks.value = taskStorage.getAllTasks()
  }

  /**
   * Создать новую задачу
   */
  function createTask(input: CreateTaskInput): Task {
    const task = taskStorage.createTask(input)
    refresh()
    return task
  }

  /**
   * Обновить существующую задачу
   */
  function updateTask(id: string, input: UpdateTaskInput): Task {
    const task = taskStorage.updateTask(id, input)
    refresh()
    return task
  }

  /**
   * Пометить задачу как выполненную
   */
  function completeTask(id: string): Task {
    const task = taskStorage.completeTask(id)
    refresh()
    return task
  }

  /**
   * Архивировать задачу
   */
  function archiveTask(id: string): Task {
    const task = taskStorage.archiveTask(id)
    refresh()
    return task
  }

  /**
   * Восстановить задачу из архива
   */
  function restoreTask(id: string): Task {
    const task = taskStorage.restoreTask(id)
    refresh()
    return task
  }

  /**
   * Удалить задачу полностью
   */
  function deleteTask(id: string): void {
    taskStorage.deleteTask(id)
    refresh()
  }

  return {
    // Состояние
    allTasks,
    activeTasks,
    archivedTasks,
    // Методы
    refresh,
    createTask,
    updateTask,
    completeTask,
    archiveTask,
    restoreTask,
    deleteTask,
  }
}
