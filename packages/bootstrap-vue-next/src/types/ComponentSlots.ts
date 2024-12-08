/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Placement} from './Alignment'

export interface ShowHideSlotsData {
  id: string
  show: () => void
  hide: (trigger?: string) => void
  toggle: () => void
  active: boolean
  visible: boolean
}

export interface BCollapseSlots {
  default?: (props: ShowHideSlotsData) => any
  footer?: (props: ShowHideSlotsData) => any
  header?: (props: ShowHideSlotsData) => any
}

export interface BDropdownSlotsData extends ShowHideSlotsData {
  click: (evt: MouseEvent) => void
}

export interface BDropdownSlots {
  default?: (props: BDropdownSlotsData) => any
}

export interface BModalSlotsData extends ShowHideSlotsData {
  cancel: () => void
  close: () => void
  ok: () => void
}

export interface BModalSlots {
  'backdrop'?: (props: BModalSlotsData) => any
  'cancel'?: (props: BModalSlotsData) => any
  'default'?: (props: BModalSlotsData) => any
  'footer'?: (props: BModalSlotsData) => any
  'header'?: (props: BModalSlotsData) => any
  'header-close'?: (props: BModalSlotsData) => any
  'ok'?: (props: BModalSlotsData) => any
  'title'?: (props: BModalSlotsData) => any
}

export interface BOffcanvasSlotsData extends ShowHideSlotsData {
  placement: Placement
}

export interface BOffcanvasSlots {
  'backdrop'?: (props: BOffcanvasSlotsData) => any
  'default'?: (props: BOffcanvasSlotsData) => any
  'footer'?: (props: BOffcanvasSlotsData) => any
  'header'?: (props: BOffcanvasSlotsData) => any
  'header-close'?: (props: BOffcanvasSlotsData) => any
  'title'?: (props: BOffcanvasSlotsData) => any
}

export interface BPopoverSlots {
  default?: (props: ShowHideSlotsData) => any
  target?: (props: ShowHideSlotsData) => any
  title?: (props: ShowHideSlotsData) => any
}

export interface BToastSlots {
  default?: (props: ShowHideSlotsData) => any
  title?: (props: ShowHideSlotsData) => any
  close?: (props: ShowHideSlotsData) => any
}
