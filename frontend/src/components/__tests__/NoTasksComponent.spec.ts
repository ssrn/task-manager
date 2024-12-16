import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import NoTasksComponent from '../NoTasksComponent.vue'
import type { Task } from '@shared/types/TaslkList'

describe('NoTasksComponent', () => {
  let wrapper: VueWrapper

  const mockCompletedTasks: Task[] = [
    { id: '1', name: 'Coffee', type: 'circle', completed: true },
    { id: '2', name: 'Tea', type: 'rectangle', completed: true }
  ]

  beforeEach(() => {
    wrapper = mount(NoTasksComponent, {
      props: {
        completedTasks: mockCompletedTasks
      }
    })
  })

  it('renders completion message', () => {
    expect(wrapper.text()).toContain('All Tasks Completed!')
  })

  it('renders icons for each completed task', () => {
    const icons = wrapper.findAll('svg')
    expect(icons.length).toBe(mockCompletedTasks.length)
  })
}) 