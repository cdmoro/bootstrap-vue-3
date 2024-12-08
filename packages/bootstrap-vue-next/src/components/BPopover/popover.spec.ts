import {enableAutoUnmount, mount} from '@vue/test-utils'
import {afterEach, describe, expect, it} from 'vitest'
import BPopover from './BPopover.vue'

describe('popover', () => {
  enableAutoUnmount(afterEach)

  it('has div.popover', () => {
    const wrapper = mount(BPopover, {props: {modelValue: true}})
    const $div = wrapper.find('div.popover')
    expect($div.exists()).toBe(true)
  })

  it('has static class popover', () => {
    const wrapper = mount(BPopover, {props: {modelValue: true}})
    const $div = wrapper.get('div.popover')

    expect($div.classes()).toContain('popover')
  })

  it('has static class b-popover', () => {
    const wrapper = mount(BPopover, {
      props: {modelValue: true},
    })
    const $div = wrapper.get('div.popover')

    expect($div.classes()).toContain('b-popover')
  })

  it('has role tooltip', () => {
    const wrapper = mount(BPopover, {props: {modelValue: true}})
    const $div = wrapper.get('div.popover')
    expect($div.attributes('role')).toBe('tooltip')
  })

  it('has tabindex -1', () => {
    const wrapper = mount(BPopover, {props: {modelValue: true}})
    const $div = wrapper.get('div.popover')

    expect($div.attributes('tabindex')).toBe('-1')
  })

  it('is tag div', () => {
    const wrapper = mount(BPopover)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('has prop id', async () => {
    const wrapper = mount(BPopover, {props: {id: 'abc', modelValue: true}})
    const $div = wrapper.get('div.popover')

    expect($div.attributes('id')).toBe('abc')
    await wrapper.setProps({id: undefined})
    expect($div.attributes('id')).toBeDefined()
  })

  it('first child contains slot title', () => {
    const wrapper = mount(BPopover, {
      props: {modelValue: true},
      slots: {title: 'foobar'},
    })
    const $div = wrapper.get('div.popover-header')
    expect($div.text()).toBe('foobar')
  })

  it('first child contains prop title', () => {
    const wrapper = mount(BPopover, {
      props: {title: 'foobar', modelValue: true},
    })
    const $div = wrapper.get('div.popover-header')
    expect($div.text()).toBe('foobar')
  })

  it('first child contains slot title if both slot and prop exists', () => {
    const wrapper = mount(BPopover, {
      props: {title: 'propbar', modelValue: true},
      slots: {title: 'slotbar'},
    })
    const $div = wrapper.get('div.popover-header')
    expect($div.text()).toBe('slotbar')
  })

  it('contains slot default', () => {
    const wrapper = mount(BPopover, {
      props: {modelValue: true},
      slots: {default: 'foobar'},
    })
    expect(wrapper.text()).toContain('foobar')
  })

  it('second child contains prop content', () => {
    const wrapper = mount(BPopover, {
      props: {body: 'foobar', modelValue: true},
    })
    const $div = wrapper.get('div.popover-body')
    expect($div.text()).toBe('foobar')
  })

  it('contains slot default if both slot and prop exists', () => {
    const wrapper = mount(BPopover, {
      props: {body: 'propbar', modelValue: true},
      slots: {default: '<div class="trigger">slotbar</div>'},
    })
    const $div = wrapper.get('div.trigger')
    expect($div.text()).toBe('slotbar')
  })

  it('contains b-popover-{type} if prop variant', async () => {
    const wrapper = mount(BPopover, {
      props: {variant: 'primary', modelValue: true},
    })
    const $div = wrapper.get('div.popover')
    // console.log($div.classes())
    expect($div.classes()).toContain('b-popover-primary')
    await wrapper.setProps({variant: undefined})
    expect($div.classes()).not.toContain('b-popover-primary')
  })

  // Functionally, this component does more, but this only tests the component
  // Behaviorally, the component does emit, which should be tested,
  // But as I am writting this, I am unsure of how to invoke the events from popover,
  // and pass them into a test
})
