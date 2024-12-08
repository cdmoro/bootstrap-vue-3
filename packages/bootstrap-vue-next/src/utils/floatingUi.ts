import type {Boundary, Placement, RootBoundary} from '@floating-ui/vue'
export {autoUpdate} from '@floating-ui/vue'

import {type DirectiveBinding, h, render} from 'vue'
import BPopover from '../components/BPopover/BPopover.vue'
import type {BPopoverProps} from '../types/ComponentProps'

export const resolveBootstrapPlacement = (placement: Placement): string => {
  const [_placement] = placement.split('-')
  switch (_placement) {
    case 'left':
      return 'start'
    case 'right':
      return 'end'
    default:
      return _placement
  }
}

export const resolveActiveStatus = (values: DirectiveBinding['value']): boolean =>
  typeof values !== 'object' || values.active !== false

export const resolveContent = (
  values: DirectiveBinding['value'],
  el: HTMLElement
): {title?: string; body?: string} => {
  const isActive = resolveActiveStatus(values)
  if (!isActive) return {}

  const missingBindingValue =
    typeof values === 'undefined' ||
    (typeof values === 'object' && !values.title && !values.content && !values.body)
  const title = el.getAttribute('title') || el.getAttribute('data-original-title')
  if (missingBindingValue) {
    if (title) {
      el.removeAttribute('title')
      el.setAttribute('data-original-title', title)

      return {
        body: title,
      }
    }
    return {}
  }
  if (typeof values === 'string') {
    return {
      body: values,
    }
  }

  // TODO: deprication remove warning in 2025-02
  if (values?.content)
    // eslint-disable-next-line no-console
    console.warn('v-b-popover/v-b-tooltip: `content` is deprecated, use `body` instead')

  return {
    title: values?.title ? values?.title : undefined,
    body: values?.body ? values?.body : values?.content ? values?.content : undefined,
  }
}

export const resolveDirectiveProps = (
  binding: Readonly<DirectiveBinding>,
  el: Readonly<HTMLElement>
) => ({
  target: el,
  modelValue: binding.modifiers.show,
  inline: binding.modifiers.inline,
  click: binding.modifiers.click,
  realtime: binding.modifiers.realtime,
  lazy: binding.modifiers.lazy,
  placement: binding.modifiers.left
    ? 'left'
    : binding.modifiers.right
      ? 'right'
      : binding.modifiers.bottom
        ? 'bottom'
        : binding.modifiers.top
          ? 'top'
          : undefined,
  ...(typeof binding.value === 'object' ? binding.value : {}),
  ...(binding.modifiers.interactive ? {noninteractive: false} : {}),
  title: null,
  body: null,
})

export interface ElementWithPopper extends HTMLElement {
  $__element?: HTMLElement
  $__binding?: string
}

export const bind = (
  el: ElementWithPopper,
  binding: Readonly<DirectiveBinding>,
  props: BPopoverProps
) => {
  const div = document.createElement('span')
  if (binding.modifiers.body) document.body.appendChild(div)
  else if (binding.modifiers.child) el.appendChild(div)
  else el.parentNode?.insertBefore(div, el.nextSibling)
  render(h(BPopover, props), div)
  el.$__element = div
}

export const unbind = (el: ElementWithPopper) => {
  const div = el.$__element
  if (div) render(null, div)
  setTimeout(() => {
    div?.remove()
  }, 0)
  delete el.$__element
}

export const isBoundary = (input: unknown): input is Boundary =>
  input === 'clippingAncestors' || input instanceof Element || Array.isArray(input)

export const isRootBoundary = (input: Boundary | RootBoundary): input is RootBoundary =>
  !isBoundary(input)
