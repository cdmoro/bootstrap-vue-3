import {enableAutoUnmount, mount} from '@vue/test-utils'
import {afterEach, describe, expect, it} from 'vitest'
import BAlert from './BAlert.vue'
import BCloseButton from '../BButton/BCloseButton.vue'
import BButton from '../BButton/BButton.vue'
import {Transition} from 'vue'

describe('alert', () => {
  enableAutoUnmount(afterEach)

  it('has Transition', () => {
    const wrapper = mount(BAlert)
    const $transition = wrapper.findComponent(Transition)
    expect($transition.exists()).toBe(true)
  })

  it('there is a hidden div by default', () => {
    const wrapper = mount(BAlert)
    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.attributes().style).toContain('display: none;')
  })

  it('there is a div when modelValue true', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true},
    })
    await wrapper.vm.$nextTick()
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.attributes().style).toBeUndefined()
  })

  it('there is a nested div when modelValue number > 0', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: 5},
    })
    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
    expect($div.attributes().style).toBeUndefined()
  })

  it('nested div has static class alert', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true},
    })
    const $div = wrapper.get('div')
    expect($div.classes()).toContain('alert')
  })

  it('nested div has attr role alert', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true},
    })
    await wrapper.vm.$nextTick()
    const $div = wrapper.get('div')
    expect($div.attributes('role')).toBe('alert')
  })

  it('nested div has attr aria-live assertive', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true},
    })
    await wrapper.vm.$nextTick()
    const $div = wrapper.get('div')
    expect($div.attributes('aria-live')).toBe('assertive')
  })
  it('nested div has attr role status when isStatus is true', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, isStatus: true},
    })
    await wrapper.vm.$nextTick()
    const $div = wrapper.get('div')
    expect($div.attributes('role')).toBe('status')
  })

  it('nested div has attr aria-live polite when isStatus is true', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, isStatus: true},
    })
    await wrapper.vm.$nextTick()
    const $div = wrapper.get('div')
    expect($div.attributes('aria-live')).toBe('polite')
  })

  it('nested div has static attr aria-atomic true', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true},
    })
    await wrapper.vm.$nextTick()
    const $div = wrapper.get('div')
    expect($div.attributes('aria-atomic')).toBe('true')
  })

  it('nested div has class alert-info by default', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true},
    })
    const $div = wrapper.get('div')
    expect($div.classes()).toContain('alert-info')
  })

  it('nested div has class alert-{type} when prop variant', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, variant: 'danger'},
    })
    const $div = wrapper.get('div')
    expect($div.classes()).toContain('alert-danger')
  })

  it('nested div has class alert-dismissible when prop dismissible', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true},
    })
    const $div = wrapper.get('div')
    expect($div.classes()).toContain('alert-dismissible')
  })

  it('nested div does not have class alert-dismissible when not prop dismissible', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: false},
    })
    const $div = wrapper.get('div')
    expect($div.classes()).not.toContain('alert-dismissible')
  })

  it('nested div renders default slot', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true},
      slots: {default: 'foobar'},
    })
    expect(wrapper.text()).toBe('foobar')
  })

  it('nested div has BCloseButton by default when prop dismissible', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.findComponent(BCloseButton)
    expect($bclosebutton.exists()).toBe(true)
  })

  it('nested div does not have BCloseButton when not prop dismissible', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: false},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.findComponent(BCloseButton)
    expect($bclosebutton.exists()).toBe(false)
  })

  it('nested div does not have BCloseButton when prop dismissible but also slot close', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true},
      slots: {close: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.findComponent(BCloseButton)
    expect($bclosebutton.exists()).toBe(false)
  })

  it('nested div does not have BCloseButton when prop dismissible but also prop closeContent', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true, closeContent: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.findComponent(BCloseButton)
    expect($bclosebutton.exists()).toBe(false)
  })

  it('nested div has BButton when prop dismissible but also prop closeContent', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true, closeContent: 'foobar'},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.findComponent(BButton)
    expect($bbutton.exists()).toBe(true)
  })

  it('nested div has BButton when prop dismissible but also slot close', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true},
      slots: {close: 'foobar', default: 'content'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.findComponent(BButton)
    expect($bbutton.exists()).toBe(true)
  })

  it('nested div does not have BButton when prop dismissible and nothing else', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.findComponent(BButton)
    expect($bbutton.exists()).toBe(false)
  })

  it('nested div BButton renders slot close', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true},
      slots: {close: 'foobar', default: 'content'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    expect($bbutton.text()).toBe('foobar')
  })

  it('nested div BCloseButton has aria-label to be Close by default', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    expect($bclosebutton.attributes('aria-label')).toBe('Close')
  })

  it('nested div BCloseButton has aria-label to be prop closeLabel', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true, closeLabel: 'foobar'},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    expect($bclosebutton.attributes('aria-label')).toBe('foobar')
  })

  // BCloseButton variant
  it('nested div BCloseButton emits update:modelValue when clicked when modelValue boolean', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true, noAnimation: true},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    await $bclosebutton.trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('nested div BCloseButton clicked update:modelValue emits arg false when modelValue boolean', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true, noAnimation: true},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    await $bclosebutton.trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 30))

    const emitted = wrapper.emitted('update:modelValue') ?? []
    expect(emitted[0][0]).toBe(false)
  })

  it('nested div BCloseButton emits update:modelValue when clicked when modelValue number > 0', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: 5, dismissible: true},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    await $bclosebutton.trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('nested div BCloseButton clicked update:modelValue emits arg 0 when modelValue number > 0', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: 5, dismissible: true},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    await $bclosebutton.trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 30))
    const emitted = wrapper.emitted('update:modelValue') ?? []
    expect(emitted[0][0]).toBe(0)
  })

  it('nested div BCloseButton clicked emits close', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: 5, dismissible: true},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    await $bclosebutton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('nested div BCloseButton has class when prop closeClass', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true, closeClass: 'foobar'},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    expect($bclosebutton.classes()).toContain('foobar')
  })

  it('nested div BCloseButton has no class when no slot close', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    expect($bclosebutton.classes()).not.toContain('btn-close-custom')
  })

  it('nested div BCloseButton has no variant class when closeVariant', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true, closeVariant: 'warning'},
      slots: {default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    expect($bclosebutton.classes()).not.toContain('btn-warning')
  })
  // BButton variant
  it('nested div BButton emits update:modelValue when clicked when modelValue boolean', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true},
      slots: {close: 'foobar', default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    await $bbutton.trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('nested div BButton clicked update:modelValue emits arg false when modelValue boolean', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true},
      slots: {close: 'foobar', default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    await $bbutton.trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 30))
    const emitted = wrapper.emitted('update:modelValue') ?? []
    expect(emitted[0][0]).toBe(false)
  })

  it('nested div BButton emits update:modelValue when clicked when modelValue number > 0', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: 5, dismissible: true},
      slots: {close: 'foobar', default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    await $bbutton.trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('nested div BButton clicked update:modelValue emits arg 0 when modelValue number > 0', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: 5, dismissible: true},
      slots: {close: 'foobar', default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    await $bbutton.trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 30))
    const emitted = wrapper.emitted('update:modelValue') ?? []
    expect(emitted[0][0]).toBe(0)
  })

  it('nested div BButton clicked emits close', async () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: 5, dismissible: true},
      slots: {close: 'foobar', default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    await $bbutton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('nested div BButton has class when prop closeClass', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true, closeClass: 'foobar'},
      slots: {close: 'foobar', default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    expect($bbutton.classes()).toContain('foobar')
  })

  it('nested div BButton has class when slot close', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true},
      slots: {close: 'foobar', default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    expect($bbutton.classes()).toContain('btn-close-custom')
  })

  it('nested div BButton has variant class when closeVariant', () => {
    const wrapper = mount(BAlert, {
      props: {modelValue: true, dismissible: true, closeVariant: 'warning'},
      slots: {close: 'foobar', default: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    expect($bbutton.classes()).toContain('btn-warning')
  })
})
