import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ArchiveView from '@/components/ArchiveView.vue'
import { Task, TaskStatus } from '@/types/task'

describe('ArchiveView', () => {
  const makeTask = (id: string): Task => ({
    id,
    title: `Архивная ${id}`,
    description: 'Описание',
    status: TaskStatus.ARCHIVED,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  it('отображает архивные задачи', () => {
    const tasks = [makeTask('1'), makeTask('2')]
    const wrapper = mount(ArchiveView, {
      props: { tasks },
    })
    expect(wrapper.text()).toContain('Архивная 1')
    expect(wrapper.text()).toContain('Архивная 2')
  })

  it('вызывает событие restore при нажатии кнопки', async () => {
    const tasks = [makeTask('abc')]
    const wrapper = mount(ArchiveView, {
      props: { tasks },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('restore')).toHaveLength(1)
    expect(wrapper.emitted('restore')![0]).toEqual(['abc'])
  })
})
