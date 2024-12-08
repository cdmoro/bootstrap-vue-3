import {enableAutoUnmount, mount} from '@vue/test-utils'
import {afterEach, describe, expect, it} from 'vitest'
import {nextTick} from 'vue'
import BToast from './BToast.vue'

describe('toast', () => {
  enableAutoUnmount(afterEach)

  it('has expected structure', async () => {
    const wrapper = mount(BToast, {
      attachTo: document.body,
      props: {
        modelValue: true,
        visible: true,
        title: 'title',
      },
      slots: {
        default: 'content',
      },
    })

    expect(wrapper.vm).toBeDefined()
    await nextTick()
    await nextTick()

    expect(wrapper.element.tagName).toBe('TRANSITION-STUB')

    expect(wrapper.find('.toast').exists()).toBe(true)

    const $toast = wrapper.find('.toast')
    expect($toast.element.tagName).toBe('DIV')
    expect($toast.classes()).toContain('toast')
    expect($toast.classes()).toContain('show')
    expect($toast.attributes('role')).toEqual('alert')
    expect($toast.attributes('aria-live')).toEqual('assertive')
    expect($toast.attributes('aria-atomic')).toEqual('true')
    expect($toast.attributes('tabindex')).toEqual('0')

    expect($toast.find('.toast-header').exists()).toBe(true)
    const $header = $toast.find('.toast-header')
    expect($header.element.tagName).toBe('DIV')
    expect($header.classes().length).toBe(1)
    expect($header.find('strong').exists()).toBe(true)
    expect($header.find('strong').text()).toEqual('title')
    expect($header.find('button').classes()).toContain('ms-auto')
    expect($header.find('button').exists()).toBe(true)
    expect($header.find('button').classes()).toContain('btn-close')

    expect($toast.find('.toast-body').exists()).toBe(true)
    const $body = $toast.find('.toast-body')
    expect($body.element.tagName).toBe('DIV')
    expect($body.classes().length).toBe(1)
    expect($body.text()).toEqual('content')

    wrapper.unmount()
  })

  it.skip('has correct header tag when "header-tag" prop is set', () => {})
  it.skip('alert with link closes on click works', () => {})
  it.skip('auto-hide works', () => {})
  it.skip('hover pause works', () => {})
  it.skip('hover pause has no effect when no-hover-pause is set', () => {})
})
