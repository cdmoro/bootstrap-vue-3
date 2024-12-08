import {RX_HASH, RX_HASH_ID, RX_SPACE_SPLIT} from '../../utils/constants'
import type {Directive, DirectiveBinding, VNode} from 'vue'
import {findProvides} from '../utils'
import {globalShowHideStorageInjectionKey, type RegisterShowHideValue} from '../../utils/keys'

const getTargets = (
  binding: DirectiveBinding<string | readonly string[] | undefined>,
  el: Readonly<Element>
) => {
  const {modifiers, arg, value} = binding
  // Any modifiers are considered target Ids
  const targets = Object.keys(modifiers || {})

  // If value is a string, split out individual targets (if space delimited)
  const localValue = typeof value === 'string' ? value.split(RX_SPACE_SPLIT) : value

  // Support target Id as link href (`href="#id"`)
  if (el.tagName.toLowerCase() === 'a') {
    const href = el.getAttribute('href') || ''
    if (RX_HASH_ID.test(href)) {
      targets.push(href.replace(RX_HASH, ''))
    }
  }

  // Add Id from `arg` (if provided), and support value
  // as a single string Id or an array of string Ids
  // If `value` is not an array or string, then it gets filtered out
  Array.prototype.concat
    .apply([], [arg, localValue])
    .forEach((t) => typeof t === 'string' && targets.push(t))

  // Return only unique and truthy target Ids
  return targets.filter((t, index, arr) => t && arr.indexOf(t) === index)
}

const handleUpdate = (
  el: Element,
  binding: DirectiveBinding<string | readonly string[] | undefined>,
  vnode: VNode
) => {
  // Determine targets
  const targets = getTargets(binding, el)
  if (targets.length === 0) return

  const provides = findProvides(binding, vnode)
  const showHideMap = (provides as Record<symbol, RegisterShowHideValue>)[
    globalShowHideStorageInjectionKey
  ]?.map
  if ((el as HTMLElement).dataset.bvtoggle) {
    const oldTargets = ((el as HTMLElement).dataset.bvtoggle || '').split(' ')
    if (oldTargets.length === 0) return
    oldTargets.forEach((targetId) => {
      const showHide = showHideMap?.[targetId]
      if (!showHide) {
        return
      }
      if (!targets.includes(targetId)) showHide.unregisterTrigger('click', el, false)
    })
  }
  ;(el as HTMLElement).dataset.bvtoggle = targets.join(' ')

  targets.forEach(async (targetId) => {
    let count = 0
    while (count < 5) {
      const showHide = showHideMap?.[targetId]
      if (!showHide) {
        count++
        await new Promise((resolve) => setTimeout(resolve, 100))
        if (count < 4) continue
        // eslint-disable-next-line no-console
        console.warn(`[v-b-toggle] Target with ID ${targetId} not found`)
        break
      }
      // Register the trigger element

      showHide.unregisterTrigger('click', el, false)
      showHide.registerTrigger('click', el)
      break
    }
  })

  el.setAttribute('aria-controls', targets.join(' '))
}
const handleUnmount = (
  el: Element,
  binding: DirectiveBinding<string | readonly string[] | undefined>,
  vnode: VNode
) => {
  // Determine targets
  const targets = getTargets(binding, el)
  if (targets.length === 0) return
  const provides = findProvides(binding, vnode)
  const showHideMap = (provides as Record<symbol, RegisterShowHideValue>)[
    globalShowHideStorageInjectionKey
  ]?.map

  targets.forEach((targetId) => {
    const showHide = showHideMap?.[targetId]
    if (!showHide) {
      return
    }
    showHide.unregisterTrigger('click', el, false)
  })

  el.removeAttribute('aria-controls')
  el.removeAttribute('aria-expanded')
  el.classList.remove('collapsed')
  el.classList.remove('not-collapsed')
  delete (el as HTMLElement).dataset.bvtoggle
}

export const vBToggle: Directive<Element> = {
  mounted: handleUpdate,
  updated: handleUpdate,
  unmounted: handleUnmount,
}
