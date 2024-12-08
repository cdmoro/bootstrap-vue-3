import {DOMWrapper, enableAutoUnmount, mount} from '@vue/test-utils'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import {nextTick} from 'vue'
import {BvTriggerableEvent} from '../../utils'
import BButton from '../BButton/BButton.vue'
import BCloseButton from '../BButton/BCloseButton.vue'
import BModal from './BModal.vue'
import {createBootstrap} from '../../plugins'

describe('modal', () => {
  enableAutoUnmount(afterEach)

  beforeEach(() => {
    const el = document.createElement('div')
    el.id = 'body-teleports'
    document.body.appendChild(el)
  })

  afterEach(() => {
    const el = document.getElementById('body-teleports')
    if (el) document.body.removeChild(el)
    document.body.style.overflow = ''
  })

  it('has body teleports element set by to property', () => {
    const wrapper = mount(BModal, {
      props: {
        teleportTo: '#body-teleports',
      },
      global: {plugins: [createBootstrap()]},
    })
    expect(wrapper.exists()).toBe(true)
    expect(document.getElementById('body-teleports')?.querySelector('.modal')).not.toBe(null)
  })

  // Having issues getting the 'body' from the VDOM
  it('has body element', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
    })
    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
  })

  it('div has class modal', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
    })
    const $div = wrapper.get('div')
    expect($div.classes()).toContain('modal')
  })

  it('div has attr id to be prop id', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {id: 'foo'},
    })
    const $div = wrapper.get('div')
    expect($div.attributes('id')).toBe('foo')
  })

  it('div has attr id is defined by default', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
    })
    const $div = wrapper.get('div')
    expect($div.attributes('id')).toBeDefined()
  })

  it('div has attr tabindex to be -1', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
    })
    const $div = wrapper.get('div')
    expect($div.attributes('tabindex')).toBe('-1')
  })

  it('div has class from prop modalClass', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {modalClass: ['foo']},
    })
    const $div = wrapper.get('div')
    expect($div.classes()).toContain('foo')
  })

  it('div has class fade when not prop noFade', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {noFade: false},
    })
    const $div = wrapper.get('div')
    expect($div.classes()).toContain('fade')
  })

  it('div has class fade when prop noFade', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {noFade: true},
    })
    const $div = wrapper.get('div')
    expect($div.classes()).not.toContain('fade')
  })

  it('div has attrs from attrs', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      attrs: {role: 'foo'},
    })
    const $div = wrapper.get('div')
    expect($div.attributes('role')).toBe('foo')
  })

  it('div has child div', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.find('div')
    expect($div2.exists()).toBe(true)
  })

  it('div child div has static class modal-dialog', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    expect($div2.classes()).toContain('modal-dialog')
  })

  it('div child div has class modal-fullscreen when prop fullscreen', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {fullscreen: true},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    expect($div2.classes()).toContain('modal-fullscreen')
  })

  it('div child div does not have class modal-fullscreen when not prop fullscreen', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {fullscreen: false},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    expect($div2.classes()).not.toContain('modal-fullscreen')
  })

  it('div child div has class modal-fullscreen-{type}-down when prop fullscreen is string', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {fullscreen: 'xl'},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    expect($div2.classes()).toContain('modal-fullscreen-xl-down')
  })

  it('div child div has class modal-{type} when prop size', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {size: 'sm'},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    expect($div2.classes()).toContain('modal-sm')
  })

  it('div child div has class modal-dialog-centered when prop centered', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {centered: true},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    expect($div2.classes()).toContain('modal-dialog-centered')
  })

  it('div child div does not have class modal-dialog-centered when not prop centered', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {centered: false},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    expect($div2.classes()).not.toContain('modal-dialog-centered')
  })

  it('div child div has class modal-dialog-scrollable when prop scrollable', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {scrollable: true},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    expect($div2.classes()).toContain('modal-dialog-scrollable')
  })

  it('div child div does not have class modal-dialog-scrollable when not prop scrollable', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {scrollable: false},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    expect($div2.classes()).not.toContain('modal-dialog-scrollable')
  })

  it('second div has another div by default', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    const $div3 = $div2.find('div')
    expect($div3.exists()).toBe(true)
  })

  it('third nested div has static class modal-content', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    const $div3 = $div2.get('div')
    expect($div3.classes()).toContain('modal-content')
  })

  it('third nested div has class from prop contentClass', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {contentClass: ['foo']},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    const $div3 = $div2.get('div')
    expect($div3.classes()).toContain('foo')
  })

  it('second div has nested div when not prop lazy', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {lazy: false},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    const $div3 = $div2.find('div')
    expect($div3.exists()).toBe(true)
  })

  it('third nested div has another div', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
    })
    const $div = wrapper.get('div')
    const $div2 = $div.get('div')
    const $div3 = $div2.find('div')
    expect($div3.exists()).toBe(true)
  })

  it('nested div BCloseButton has class when prop headerCloseClass', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {headerCloseClass: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    expect($bclosebutton.classes()).toContain('foobar')
  })

  it('nested div BCloseButton has no variant class when headerCloseVariant', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {headerCloseVariant: 'warning'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    expect($bclosebutton.classes()).not.toContain('btn-warning')
  })

  it('nested div BCloseButton has aria-label to be Close by default', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    expect($bclosebutton.attributes('aria-label')).toBe('Close')
  })

  it('nested div BCloseButton has aria-label to be prop headerCloseLabel', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {headerCloseLabel: 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    expect($bclosebutton.attributes('aria-label')).toBe('foobar')
  })

  it('nested div BButton has class when prop headerCloseClass', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {headerCloseClass: 'foobar'},
      slots: {'header-close': 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    expect($bbutton.classes()).toContain('foobar')
  })

  it('nested div BButton has variant class when headerCloseVariant', () => {
    const wrapper = mount(BModal, {
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {headerCloseVariant: 'warning'},
      slots: {'header-close': 'foobar'},
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    expect($bbutton.classes()).toContain('btn-warning')
  })

  it('setting modelValue to true shows modal', async () => {
    const wrapper = mount(BModal, {
      attachTo: document.body,
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {
        id: 'test',
      },
    })

    expect(wrapper.vm).toBeDefined()

    const $modal = wrapper.find('div.modal')
    expect($modal.exists()).toBe(true)

    expect($modal.isVisible()).toBe(false)

    await wrapper.setProps({modelValue: true})

    expect($modal.isVisible()).toBe(true)

    wrapper.unmount()
  })

  it('body scrolling is unlocked after modal is closed', async () => {
    const wrapper = mount(BModal, {
      attachTo: document.body,
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {
        id: 'test',
      },
    })

    await nextTick()

    // initial closed state
    let $modal = wrapper.find('div.modal')
    expect($modal.isVisible()).toBe(false)
    expect(document.body.attributes.getNamedItem('style')?.textContent ?? '').not.toContain(
      'overflow: hidden;'
    )

    // open stated
    await wrapper.setProps({modelValue: true})
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect($modal.isVisible()).toBe(true)
    expect(document.body.attributes.getNamedItem('style')?.textContent).toContain(
      'overflow: hidden;'
    )

    // closed state
    $modal = wrapper.find('div.modal')
    await $modal.trigger('keydown.Escape')
    await new Promise((resolve) => setTimeout(resolve, 30))
    $modal = wrapper.find('div.modal')
    expect($modal.isVisible()).toBe(false)
    expect(document.body.attributes.getNamedItem('style')?.textContent ?? '').not.toContain(
      'overflow: hidden;'
    )

    wrapper.unmount()
  })

  describe('button and event functionality', () => {
    it('header close button triggers modal close and is preventable', async () => {
      let cancelHide = true
      const wrapper = mount(BModal, {
        attachTo: document.body,
        global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
        props: {
          id: 'test',
          modelValue: true,
        },
        attrs: {
          onClose: (bvEvent: BvTriggerableEvent) => {
            if (cancelHide) {
              bvEvent.preventDefault()
            }
          },
        },
      })
      await nextTick()
      expect(wrapper.vm).toBeDefined()

      let $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)
      expect($modal.isVisible()).toBe(true)

      const $buttons = wrapper.findAll('.modal-header button')
      expect($buttons.length).toBe(1)

      // Close button
      const $close = $buttons.at(0) as DOMWrapper<HTMLButtonElement>
      expect($close.attributes('type')).toBe('button')
      expect($close.attributes('aria-label')).toBe('Close')
      expect($close.classes()).toContain('btn-close')

      expect(wrapper.emitted('hide')).toBeUndefined()

      // Try and close modal (but we prevent it)
      await $close.trigger('click')
      let closeEvent = wrapper.emitted<BvTriggerableEvent[]>('close')
      expect(closeEvent).toHaveLength(1)
      expect(closeEvent?.[0][0]).toBeInstanceOf(BvTriggerableEvent)

      // Modal should still be open
      $modal = wrapper.find('div.modal')
      expect($modal.isVisible()).toBe(true)

      // Try and close modal (and not prevent it)
      cancelHide = false
      await $close.trigger('click')
      closeEvent = wrapper.emitted<BvTriggerableEvent[]>('close')
      expect(closeEvent).toHaveLength(2)
      expect(closeEvent?.[1][0]).toBeInstanceOf(BvTriggerableEvent)

      await new Promise((resolve) => setTimeout(resolve, 30))
      // Modal should now be closed
      $modal = wrapper.find('div.modal')
      expect($modal.isVisible()).toBe(false)

      wrapper.unmount()
    })

    it('header close button triggers modal close and is preventable ?', async () => {
      let cancelHide = true
      const wrapper = mount(BModal, {
        attachTo: document.body,
        global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
        props: {
          id: 'test',
          modelValue: true,
        },
        attrs: {
          onClose: (bvEvent: BvTriggerableEvent) => {
            if (cancelHide) {
              bvEvent.preventDefault()
            }
          },
        },
      })
      await nextTick()
      expect(wrapper.vm).toBeDefined()

      let $modal = wrapper.find('div.modal')
      expect($modal.exists()).toBe(true)
      expect($modal.isVisible()).toBe(true)

      const $buttons = wrapper.findAll('.modal-header button')
      expect($buttons.length).toBe(1)

      // Close button
      const $close = $buttons.at(0) as DOMWrapper<HTMLButtonElement>
      expect($close.attributes('type')).toBe('button')
      expect($close.attributes('aria-label')).toBe('Close')
      expect($close.classes()).toContain('btn-close')

      expect(wrapper.emitted('hide')).toBeUndefined()

      // Try and close modal (but we prevent it)
      await $close.trigger('click')
      let closeEvent = wrapper.emitted<BvTriggerableEvent[]>('close')
      expect(closeEvent).toHaveLength(1)
      expect(closeEvent?.[0][0]).toBeInstanceOf(BvTriggerableEvent)

      // Modal should still be open
      expect($modal.isVisible()).toBe(true)

      // Try and close modal (and not prevent it)
      cancelHide = false
      await $close.trigger('click')
      closeEvent = wrapper.emitted<BvTriggerableEvent[]>('close')
      expect(closeEvent).toHaveLength(2)
      expect(closeEvent?.[1][0]).toBeInstanceOf(BvTriggerableEvent)

      // Modal should now be closed
      await new Promise((resolve) => setTimeout(resolve, 30))
      $modal = wrapper.find('div.modal')
      expect($modal.isVisible()).toBe(false)

      wrapper.unmount()
    })
  })

  it('modal body div is given prop bodyClass', () => {
    const wrapper = mount(BModal, {
      attachTo: document.body,
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {
        bodyClass: 'foobar',
      },
    })

    expect(wrapper.vm).toBeDefined()

    const $modal = wrapper.find('div.modal')
    expect($modal.exists()).toBe(true)

    const $modalBody = $modal.element.querySelector('.modal-body')
    expect($modalBody?.classList).toContain('foobar')
  })

  it('modal body div is given prop bodyAttrs', () => {
    const wrapper = mount(BModal, {
      attachTo: document.body,
      global: {stubs: {teleport: true}, plugins: [createBootstrap()]},
      props: {
        bodyAttrs: {
          role: 'foo',
        },
      },
    })

    expect(wrapper.vm).toBeDefined()

    const $modal = wrapper.find('div.modal')
    expect($modal.exists()).toBe(true)

    const $modalBody = $modal.element.querySelector('.modal-body')
    expect($modalBody?.hasAttribute('role')).toBeTruthy()
    expect($modalBody?.getAttribute('role')).toBe('foo')
  })

  // Test isActive states

  // Test emit states
})
