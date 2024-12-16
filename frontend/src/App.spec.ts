import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createVuetify } from 'vuetify'
import App from '@/App.vue'
import { useTasksStore } from '@/stores/tasks'
import type { Task } from '@shared/types/TaslkList'

describe('App', () => {
  let wrapper: VueWrapper
  let store: ReturnType<typeof useTasksStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTasksStore()
    
    wrapper = mount(App, {
      global: {
        components: {
          'v-btn': {
            template: '<button><slot></slot></button>'
          }
        },
        plugins: [createVuetify()]
      }
    })
  })

  const mockTask: Task = {
    id: '1',
    name: 'Coffee',
    type: 'circle'
  }

  it('shows request tasks button when no incomplete tasks', async () => {
    store.$patch({
      incompleteTasks: [],
      completedTasks: [mockTask]
    })
    
    await wrapper.vm.$nextTick()
    const button = wrapper.find('button')
    expect(button.text()).toBe('Request Tasks')
  })

  it('calls requestTasks when button is clicked', async () => {
    store.$patch({
      incompleteTasks: [],
      completedTasks: [mockTask]
    })
    store.resetTasks = vi.fn()
    store.fetchTasks = vi.fn()

    await wrapper.vm.$nextTick()
    await wrapper.find('button').trigger('click')
    
    expect(store.resetTasks).toHaveBeenCalled()
    expect(store.fetchTasks).toHaveBeenCalled()
  })

  it('hides request tasks button when there are incomplete tasks', async () => {
    store.$patch({
      incompleteTasks: [mockTask],
      completedTasks: []
    })
    
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').exists()).toBe(false)
  })
}) 