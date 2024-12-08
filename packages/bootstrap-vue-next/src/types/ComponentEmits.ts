import {BvTriggerableEvent} from '../utils'

export interface showHideEmits {
  'hide': [value: BvTriggerableEvent]
  'hide-prevented': [value: BvTriggerableEvent]
  'hidden': [value: BvTriggerableEvent]
  'show': [value: BvTriggerableEvent]
  'show-prevented': [value: BvTriggerableEvent]
  'shown': [value: BvTriggerableEvent]
  'toggle': [value: BvTriggerableEvent]
  'toggle-prevented': [value: BvTriggerableEvent]
}

export type BCollapseEmits = showHideEmits

export interface BDropdownEmits extends showHideEmits {
  click: [value: MouseEvent]
}
export interface BModalEmits extends showHideEmits {
  backdrop: [value: BvTriggerableEvent]
  cancel: [value: BvTriggerableEvent]
  close: [value: BvTriggerableEvent]
  esc: [value: BvTriggerableEvent]
  ok: [value: BvTriggerableEvent]
}

export interface BOffcanvasEmits extends showHideEmits {
  close: [value: BvTriggerableEvent]
  esc: [value: BvTriggerableEvent]
  backdrop: [value: BvTriggerableEvent]
  breakpoint: [value: BvTriggerableEvent]
}

export interface BPopoverEmits extends showHideEmits {
  'pointerleave': [value: BvTriggerableEvent]
  'blur': [value: BvTriggerableEvent]
  'click-outside': [value: BvTriggerableEvent]
  'close-on-hide': [value: BvTriggerableEvent]
}

export interface BToastEmits extends showHideEmits {
  'close': [value: BvTriggerableEvent]
  'close-countdown': [value: number]
}
