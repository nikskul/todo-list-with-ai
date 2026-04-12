import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'
import { Task, TaskStatus } from '@/types/task'

describe('TaskItem', () => {
  const makeTask = (overrides?: Partial<Task>): Task => ({
    id: 'test-id',
    title: 'Тестовая задача',
    description: 'Тестовое описание',
    status: TaskStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  })

  it('отображает заголовок и описание задачи', () => {
    const task = makeTask()
    const wrapper = mount(TaskItem, {
      props: { task },
    })
    expect(wrapper.text()).toContain('Тестовая задача')
    expect(wrapper.text()).toContain('Тестовое описание')
  })

  it('отображает кнопку «Выполнено»', () => {
    const task = makeTask()
    const wrapper = mount(TaskItem, {
      props: { task },
    })
    expect(wrapper.find('button').text()).toBe('Выполнено')
  })

  it('вызывает событие complete при нажатии кнопки', async () => {
    const task = makeTask()
    const wrapper = mount(TaskItem, {
      props: { task },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('complete')).toHaveLength(1)
    expect(wrapper.emitted('complete')![0]).toEqual([task.id])
  })
})
