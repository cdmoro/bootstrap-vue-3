import type {ComponentInternalInstance, ComputedRef, InjectionKey, Ref} from 'vue'
import type {TabType} from '../types/Tab'
import type {ClassValue} from '../types/AnyValuedAttributes'
import type {Numberish} from '../types/CommonTypes'
import type {LiteralUnion} from '../types/LiteralUnion'
import type {Size} from '../types/Size'
import type {RadiusElement} from '../types/RadiusElement'
import type {
  BgColorVariant,
  ButtonVariant,
  ColorVariant,
  TextColorVariant,
} from '../types/ColorTypes'
import type {CheckboxValue} from '../types/CheckboxTypes'
import type {RadioValue} from '../types/RadioTypes'
import type {BreadcrumbItemRaw} from '../types/BreadcrumbTypes'
import type {
  ControllerKey,
  ModalOrchestratorMapValue,
  ModalOrchestratorShowParam,
  PopoverOrchestratorMapValue,
  PopoverOrchestratorParam,
  PopoverOrchestratorShowParam,
  ToastOrchestratorArrayValue,
  ToastOrchestratorShowParam,
  TooltipOrchestratorMapValue,
  TooltipOrchestratorParam,
  TooltipOrchestratorShowParam,
} from '../types/ComponentOrchestratorTypes'
import type {BvnComponentProps} from '../types/BootstrapVueOptions'
import {withBvnPrefix} from './withBvnPrefix'

const createBvnInjectionKey = (name: string) => withBvnPrefix(name) as unknown as symbol // Type cast to symbol, these should be static
const createBvnPluginInjectionKey = (name: string) =>
  withBvnPrefix(`${name}__plugin`) as unknown as symbol

// BCarousel
export const carouselInjectionKey: InjectionKey<{
  background: Readonly<Ref<string | undefined>>
  width: Readonly<Ref<string | undefined>>
  height: Readonly<Ref<string | undefined>>
}> = createBvnInjectionKey('carousel')

// BTabs
export const tabsInjectionKey: InjectionKey<{
  lazy: Readonly<Ref<boolean>>
  card: Readonly<Ref<boolean>>
  noFade: Readonly<Ref<boolean>>
  registerTab: (tab: Readonly<Ref<TabType>>) => void
  unregisterTab: (id: string) => void
  activateTab: (id: string | undefined) => void
  activeTabClass: Readonly<Ref<ClassValue>>
  inactiveTabClass: Readonly<Ref<ClassValue>>
  tabClass: Readonly<Ref<ClassValue>>
  activeId: Readonly<Ref<string | undefined>>
}> = createBvnInjectionKey('tabs')

// BProgress
export const progressInjectionKey: InjectionKey<{
  animated: Readonly<Ref<boolean | undefined>>
  max: Readonly<Ref<Numberish>>
  showProgress: Readonly<Ref<boolean | undefined>>
  showValue: Readonly<Ref<boolean | undefined>>
  striped: Readonly<Ref<boolean | undefined>>
}> = createBvnInjectionKey('progress')

// BListGroup
export const listGroupInjectionKey: InjectionKey<{
  numbered: Readonly<Ref<boolean>>
}> = createBvnInjectionKey('listGroup')

// BAvatarGroup
export const avatarGroupInjectionKey: InjectionKey<{
  overlapScale: Readonly<Ref<number>>
  size: Readonly<Ref<LiteralUnion<Size, Numberish> | undefined>>
  square: Readonly<Ref<boolean>>
  rounded: Readonly<Ref<RadiusElement | boolean>>
  roundedTop: Readonly<Ref<RadiusElement | boolean | undefined>>
  roundedBottom: Readonly<Ref<RadiusElement | boolean | undefined>>
  roundedStart: Readonly<Ref<RadiusElement | boolean | undefined>>
  roundedEnd: Readonly<Ref<RadiusElement | boolean | undefined>>
  variant: Readonly<Ref<ColorVariant | null>>
  bgVariant: Readonly<Ref<BgColorVariant | null>>
  textVariant: Readonly<Ref<TextColorVariant | null>>
}> = createBvnInjectionKey('avatarGroup')

// BAccordion
export const accordionInjectionKey: InjectionKey<{
  openItem: Readonly<Ref<string | undefined>>
  free: Readonly<Ref<boolean>>
  initialAnimation: Readonly<Ref<boolean>>
  lazy: Readonly<Ref<boolean>>
  unmountLazy: Readonly<Ref<boolean>>
  setOpenItem: (id: string) => void
}> = createBvnInjectionKey('accordion')

// BFormCheckboxGroup
export const checkboxGroupKey: InjectionKey<{
  modelValue: Ref<readonly CheckboxValue[]>
  switch: Readonly<Ref<boolean>>
  buttonVariant: Readonly<Ref<ButtonVariant | null>>
  form: Readonly<Ref<string | undefined>>
  name: Readonly<Ref<string>>
  state: Readonly<Ref<boolean | undefined | null>>
  plain: Readonly<Ref<boolean>>
  size: Readonly<Ref<Size>>
  inline: Readonly<Ref<boolean>>
  reverse: Readonly<Ref<boolean>>
  required: Readonly<Ref<boolean>>
  buttons: Readonly<Ref<boolean>>
  disabled: Readonly<Ref<boolean>>
}> = createBvnInjectionKey('checkboxGroup')

export const radioGroupKey: InjectionKey<{
  modelValue: Ref<RadioValue>
  buttonVariant: Readonly<Ref<ButtonVariant | null>>
  form: Readonly<Ref<string | undefined>>
  name: Readonly<Ref<string>>
  buttons: Readonly<Ref<boolean>>
  state: Readonly<Ref<boolean | undefined | null>>
  plain: Readonly<Ref<boolean>>
  size: Readonly<Ref<Size>>
  inline: Readonly<Ref<boolean>>
  reverse: Readonly<Ref<boolean>>
  required: Readonly<Ref<boolean>>
  disabled: Readonly<Ref<boolean>>
}> = createBvnInjectionKey('radioGroup')

// Collapse
export const collapseInjectionKey: InjectionKey<{
  id?: Readonly<Ref<string>>
  readonly hide?: () => void
  readonly show?: () => void
  readonly toggle?: () => void
  visible?: Readonly<Ref<boolean>>
  isNav?: Readonly<Ref<boolean>>
}> = createBvnInjectionKey('collapse')

// Show/Hide components
export type RegisterShowHideFnInput = {
  id: string
  value: Ref<boolean>
  toggle: () => void
  show: () => void
  hide: (trigger?: string) => void
  registerTrigger: (trigger: string, el: Element) => void
  unregisterTrigger: (trigger: string, el: Element, clean: boolean) => void
}

export interface RegisterShowHideMapValue {
  value: boolean
  toggle: () => void
  show: () => void
  hide: (trigger?: string) => void
  registerTrigger: (trigger: string, el: Element) => void
  unregisterTrigger: (trigger: string, el: Element, clean: boolean) => void
}
export interface RegisterShowHideValue {
  (input: RegisterShowHideFnInput): {
    unregister: () => void
  }
  map: Readonly<Record<string, RegisterShowHideMapValue>>
}
export const globalShowHideStorageInjectionKey: InjectionKey<RegisterShowHideValue> =
  createBvnPluginInjectionKey('globalShowHideStorage')

export const dropdownInjectionKey: InjectionKey<{
  id?: Readonly<Ref<string>>
  readonly hide?: () => void
  readonly show?: () => void
  readonly toggle?: () => void
  visible?: Readonly<Ref<boolean>>
  isNav?: Readonly<Ref<boolean>>
}> = createBvnInjectionKey('dropdown')

export const navbarInjectionKey: InjectionKey<{
  tag?: Readonly<Ref<string>>
  autoClose?: Readonly<Ref<boolean>>
}> = createBvnInjectionKey('navbar')

export const rtlPluginKey: InjectionKey<{
  isRtl: Ref<boolean>
  locale: Ref<string | undefined>
}> = createBvnPluginInjectionKey('rtl')

export const breadcrumbPluginKey: InjectionKey<{
  items: Ref<BreadcrumbItemRaw[]>
  reset: () => void
}> = createBvnPluginInjectionKey('breadcrumbPlugin')

export const modalManagerPluginKey: InjectionKey<{
  stack: ComputedRef<ComponentInternalInstance[]>
  countStack: ComputedRef<number>
  lastStack: ComputedRef<ComponentInternalInstance | undefined>
  pushStack: (modal: Readonly<ComponentInternalInstance>) => void
  removeStack: (modal: Readonly<ComponentInternalInstance>) => void
  registry: Readonly<Ref<Map<number, ComponentInternalInstance>>>
  pushRegistry: (modal: Readonly<ComponentInternalInstance>) => void
  removeRegistry: (modal: Readonly<ComponentInternalInstance>) => void
}> = createBvnPluginInjectionKey('modalManager')

export const defaultsKey: InjectionKey<Ref<Partial<BvnComponentProps>>> =
  createBvnPluginInjectionKey('defaults')

export const inputGroupKey: InjectionKey<boolean> = createBvnInjectionKey('inputGroup')
export const buttonGroupKey: InjectionKey<boolean> = createBvnInjectionKey('buttonGroup')

export const toastPluginKey: InjectionKey<{
  toasts: Ref<ToastOrchestratorArrayValue[]>
  _setIsAppend: (value: boolean) => void
  show: (obj: ToastOrchestratorShowParam) => Promise<boolean | null>
  remove: (self: ControllerKey) => void
  leave: (self: ControllerKey) => void
}> = createBvnPluginInjectionKey('toast')

export const modalControllerPluginKey: InjectionKey<{
  modals: Ref<Map<ControllerKey, ModalOrchestratorMapValue>>
  show: (obj: ModalOrchestratorShowParam) => Promise<boolean | null>
  confirm: (obj: ModalOrchestratorShowParam) => Promise<boolean | null>
  remove: (self: ControllerKey) => void
  leave: (self: ControllerKey) => void
}> = createBvnPluginInjectionKey('modalController')

export const popoverPluginKey: InjectionKey<{
  popovers: Ref<Map<ControllerKey, PopoverOrchestratorMapValue>>
  popover: (obj: PopoverOrchestratorShowParam) => ControllerKey
  setPopover: (self: ControllerKey, val: Partial<PopoverOrchestratorParam>) => void
  removePopover: (self: ControllerKey) => void
  tooltips: Ref<Map<ControllerKey, TooltipOrchestratorMapValue>>
  tooltip: (obj: TooltipOrchestratorShowParam) => ControllerKey
  setTooltip: (self: ControllerKey, val: Partial<TooltipOrchestratorParam>) => void
  removeTooltip: (self: ControllerKey) => void
}> = createBvnPluginInjectionKey('popover')

/**
 * Automatically use a "for" attribute on label elements for its associated input
 * Works on BFormInput & Textarea
 */
export const formGroupPluginKey: InjectionKey<(id: Ref<string>) => void> =
  createBvnInjectionKey('formGroupPlugin')
