import {type Directive, type Ref} from 'vue'
import {
  bind,
  type ElementWithPopper,
  resolveActiveStatus,
  resolveContent,
  resolveDirectiveProps,
  unbind,
} from '../../utils/floatingUi'
import {defaultsKey} from '../../utils/keys'
import {findProvides} from '../utils'

export const vBPopover: Directive<ElementWithPopper> = {
  mounted(el, binding, vnode) {
    const defaults = (findProvides(binding, vnode) as Record<symbol, Ref>)[defaultsKey]?.value
    const isActive = resolveActiveStatus(binding.value)
    if (!isActive) return

    const text = resolveContent(binding.value, el)

    if (!text.body && !text.title) return
    el.$__binding = JSON.stringify([binding.modifiers, binding.value])
    bind(el, binding, {
      ...(defaults['BPopover'] || {}),
      ...resolveDirectiveProps(binding, el),
      ...text,
    })
  },
  updated(el, binding, vnode) {
    const defaults = (findProvides(binding, vnode) as Record<symbol, Ref>)[defaultsKey]?.value

    const isActive = resolveActiveStatus(binding.value)
    if (!isActive) return

    const text = resolveContent(binding.value, el)

    if (!text.body && !text.title) return
    delete binding.oldValue
    if (el.$__binding === JSON.stringify([binding.modifiers, binding.value])) return
    unbind(el)
    bind(el, binding, {
      ...(defaults['BPopover'] || {}),
      ...resolveDirectiveProps(binding, el),
      ...text,
    })
    el.$__binding = JSON.stringify([binding.modifiers, binding.value])
  },
  beforeUnmount(el) {
    unbind(el)
  },
}
