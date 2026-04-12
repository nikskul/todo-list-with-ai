import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'
import { Task, TaskStatus } from '@/types/task'

describe('TaskItem — редактирование', () => {
  const makeTask = (overrides?: Partial<Task>): Task => ({
    id: 'test-id',
    title: 'Тестовая задача',
    description: 'Тестовое описание',
    status: TaskStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  })

  it('отображает кнопку «Редактировать»', () => {
    const task = makeTask()
    const wrapper = mount(TaskItem, {
      props: { task },
    })
    const buttons = wrapper.findAll('button')
    // Кнопка «Выполнено» + кнопка «Редактировать»
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    expect(buttons[1].text()).toBe('Редактировать')
  })

  it('вызывает событие edit при нажатии кнопки редактирования', async () => {
    const task = makeTask()
    const wrapper = mount(TaskItem, {
      props: { task },
    })
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    expect(wrapper.emitted('edit')).toHaveLength(1)
    expect(wrapper.emitted('edit')![0]).toEqual([task])
  })
})
