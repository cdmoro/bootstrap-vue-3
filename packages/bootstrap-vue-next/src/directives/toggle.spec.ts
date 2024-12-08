import {enableAutoUnmount, flushPromises, mount} from '@vue/test-utils'
import {afterEach, describe, expect, it, vi} from 'vitest'
import {nextTick} from 'vue'
import {vBToggle as VBToggle} from './BToggle'
import {asyncTimeout} from '../../tests/utils'
import BCollapse from '../components/BCollapse/BCollapse.vue'
import {createBootstrap} from '../plugins'

// Emitted control event for collapse (emitted to collapse)

describe('toggle directive', () => {
  enableAutoUnmount(afterEach)
  it('works with multiple targets, and updates when targets change', async () => {
    const spy1 = vi.fn()
    const spy2 = vi.fn()
    const App = {
      directives: {
        bToggle: VBToggle,
      },
      components: {BCollapse},
      props: {
        target: {
          type: [String, Array],
          default: null,
        },
      },
      methods: {
        spy1,
        spy2,
      },
      template: `<button v-b-toggle="target">button</button><BCollapse @toggle="spy1" id="test1">collapse 1</BCollapse><BCollapse @toggle="spy2" id="test2">collapse 2</BCollapse>`,
    }

    const wrapper = mount(App, {
      attachTo: document.body,
      props: {
        target: 'test1',
      },
      global: {
        plugins: [createBootstrap()],
      },
    })

    await flushPromises()
    await nextTick()

    expect(wrapper.vm).toBeDefined()
    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()

    const $button = wrapper.find('button')
    expect($button.attributes('aria-controls')).toBe('test1')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')

    await wrapper.setProps({target: ['test1', 'test2']})
    expect($button.attributes('aria-controls')).toBe('test1 test2')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')
    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()

    await asyncTimeout(1)
    await $button.trigger('click')
    await asyncTimeout(50)
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledTimes(1)

    expect($button.attributes('aria-controls')).toBe('test1 test2')
    expect($button.attributes('aria-expanded')).toBe('true')
    expect($button.classes()).toContain('not-collapsed')
    expect($button.classes()).not.toContain('collapsed')

    await wrapper.setProps({target: ['test2']})
    expect($button.attributes('aria-controls')).toBe('test2')
    expect($button.attributes('aria-expanded')).toBe('true')
    expect($button.classes()).toContain('not-collapsed')
    expect($button.classes()).not.toContain('collapsed')
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledTimes(1)

    await asyncTimeout(1)
    await $button.trigger('click')
    await asyncTimeout(50)
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledTimes(2)

    // Since there is no target collapse to respond with the
    // current state, the classes and attrs remain the same
    expect($button.attributes('aria-controls')).toBe('test2')
    expect($button.attributes('aria-expanded')).toBe('false')
    expect($button.classes()).toContain('collapsed')
    expect($button.classes()).not.toContain('not-collapsed')
  })
})
