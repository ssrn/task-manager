import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TaskList from '../TaskList.vue'
import type { Task } from '@shared/types/TaslkList'

describe('TaskList', () => {
  let wrapper: VueWrapper

  const mockTasks: Task[] = [
    { id: '1', name: 'Coffee', type: 'circle', completed: false },
    { id: '2', name: 'Tea', type: 'rectangle', completed: false }
  ]

  const mockCompletedTasks: Task[] = [
    { id: '3', name: 'Juice', type: 'triangle', completed: true }
  ]

  beforeEach(() => {
    wrapper = mount(TaskList, {
      props: {
        name: 'Table 1',
        incompleteTasks: mockTasks,
        completedTasks: mockCompletedTasks
      },
      global: {
        stubs: {
          'v-checkbox': {
            template: '<input type="checkbox" @change="$emit(\'change\')" />',
            emits: ['change']
          }
        }
      }
    })
  })

  it('renders task list name correctly', () => {
    expect(wrapper.text()).toContain('Table 1')
  })

  it('emits completeTask event when checkbox is clicked', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.exists()).toBe(true)
    await checkbox.trigger('change')
    expect(wrapper.emitted('completeTask')?.[0]).toEqual(['1'])
  })
}) 