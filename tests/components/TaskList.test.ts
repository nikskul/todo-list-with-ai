import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskList from '@/components/TaskList.vue'
import { taskStorage } from '@/services/taskStorage'

describe('TaskList', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('отображает сообщение когда задач нет', () => {
    const wrapper = mount(TaskList, {
      props: {
        tasks: [],
      },
    })
    expect(wrapper.text()).toContain('Задач пока нет')
  })

  it('отображает список активных задач', () => {
    taskStorage.createTask({ title: 'Задача 1', description: 'Описание 1' })
    taskStorage.createTask({ title: 'Задача 2', description: 'Описание 2' })
    const tasks = taskStorage.getActiveTasks()

    const wrapper = mount(TaskList, {
      props: { tasks },
    })

    expect(wrapper.text()).toContain('Задача 1')
    expect(wrapper.text()).toContain('Задача 2')
    expect(wrapper.findAllComponents({ name: 'TaskItem' })).toHaveLength(2)
  })
})
