import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskForm from '@/components/TaskForm.vue'

describe('TaskForm', () => {
  it('создаёт задачу с заголовком и описанием', async () => {
    const wrapper = mount(TaskForm)

    await wrapper.find('#task-title').setValue('Тестовая задача')
    await wrapper.find('#task-description').setValue('Тестовое описание')
    await wrapper.find('form').trigger('submit.prevent')

    const emitted = wrapper.emitted('create')
    expect(emitted).toHaveLength(1)
    expect(emitted![0][0]).toEqual({
      title: 'Тестовая задача',
      description: 'Тестовое описание',
    })
  })

  it('отклоняет пустой заголовок', async () => {
    const wrapper = mount(TaskForm)

    await wrapper.find('#task-title').setValue('')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('create')).toBeUndefined()
    expect(wrapper.text()).toContain('Заголовок не может быть пустым')
  })

  it('позволяет создать задачу с пустым описанием', async () => {
    const wrapper = mount(TaskForm)

    await wrapper.find('#task-title').setValue('Задача без описания')
    await wrapper.find('#task-description').setValue('')
    await wrapper.find('form').trigger('submit.prevent')

    const emitted = wrapper.emitted('create')
    expect(emitted).toHaveLength(1)
    expect(emitted![0][0]).toEqual({
      title: 'Задача без описания',
      description: '',
    })
  })
})
