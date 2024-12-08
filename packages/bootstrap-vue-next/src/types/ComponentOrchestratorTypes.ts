import type {Component, MaybeRefOrGetter} from 'vue'
import type {BModalProps, BPopoverProps, BToastProps, BTooltipProps} from './ComponentProps'
import type {ContainerPosition} from './Alignment'
import type {BModalSlots, BPopoverSlots, BToastSlots} from './ComponentSlots'
import type {BModalEmits, BPopoverEmits, BToastEmits} from './ComponentEmits'

export type ControllerKey = symbol | string

type Prefix<P extends string, S extends string> = `${P}${S}`

type CamelCase<S extends string> = S extends `${infer P1}-${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>

export type ToastOrchestratorArrayValue = Omit<BToastProps, 'modelValue'> & {
  /**
   * Position
   * @default 'top-end'
   */
  'position'?: ContainerPosition
  /**
   * Sets whether or not the toast should be appended to the container
   * @default undefined Implicitly defualts to the BToastOrchestrator's appendToast value
   */
  'appendToast'?: boolean
  /**
   * A proxy for the modelValue, essentially, you set this once, and it mimics the modelValue.
   *
   * Falsy values default to 5000
   *
   * @default 5000
   */
  'modelValue'?: BToastProps['modelValue'] // Convert it to be the same name as useModalController.
  '_self': ControllerKey
  'onUpdate:modelValue'?: (val: boolean) => void
  'component'?: Readonly<Component>
  'promise': {
    value: Promise<boolean | null>
    resolve: (value: boolean | null) => void
  }
} & {
  [K in keyof BToastEmits as CamelCase<Prefix<'on-', K>>]?: (e: BToastEmits[K][0]) => void
} & {
  slots?: {
    [K in keyof BToastSlots]?: BToastSlots[K] | Readonly<Component>
  }
}
export type ToastOrchestratorParam = Omit<BToastProps, 'modelValue'> & {
  'title'?: MaybeRefOrGetter<BToastProps['title']>
  'body'?: MaybeRefOrGetter<BToastProps['body']>
  /**
   * Position
   * @default 'top-end'
   * @deprecated
   */
  'pos'?: ContainerPosition
  /**
   * Position
   * @default 'top-end'
   */
  'position'?: ContainerPosition
  /**
   * Sets whether or not the toast should be appended to the container
   * @default undefined Implicitly defualts to the BToastOrchestrator's appendToast value
   */
  'appendToast'?: boolean
  /**
   * A proxy for the modelValue, essentially, you set this once, and it mimics the modelValue.
   *
   * Falsy values default to 5000
   *
   * @default 5000
   */
  'modelValue'?: MaybeRefOrGetter<BToastProps['modelValue']>
  '_self'?: ControllerKey
  'onUpdate:modelValue'?: (val: boolean) => void
  'component'?: Readonly<Component>
  /**
   * @deprecated
   */
  'props'?: Record<string, unknown>
} & {
  [K in keyof BToastEmits as CamelCase<Prefix<'on-', K>>]?: (e: BToastEmits[K][0]) => void
} & {
  slots?: {
    [K in keyof BToastSlots]?: MaybeRefOrGetter<BToastSlots[K] | Readonly<Component>>
  }
}

export type ToastOrchestratorShowParam = MaybeRefOrGetter<ToastOrchestratorParam>

export type TooltipOrchestratorMapValue = BTooltipProps & {
  'onUpdate:modelValue'?: (val: boolean) => void
  'component'?: Readonly<Component>
  'stop'?: () => void
  'slots'?: {
    [K in keyof Omit<BPopoverSlots, 'target'>]?: BPopoverSlots[K] | Readonly<Component>
  }
} & {
  [K in keyof BPopoverEmits as CamelCase<Prefix<'on-', K>>]?: (e: BPopoverEmits[K][0]) => void
}

export type TooltipOrchestratorParam = Omit<BTooltipProps, 'body' | 'title' | 'modelValue'> & {
  'onUpdate:modelValue'?: (val: boolean) => void
  'title'?: MaybeRefOrGetter<BTooltipProps['title']>
  'body'?: MaybeRefOrGetter<BTooltipProps['body']>
  'modelValue'?: MaybeRefOrGetter<BTooltipProps['modelValue']>
  'component'?: Readonly<Component>
  'slots'?: {
    [K in keyof Omit<BPopoverSlots, 'target'>]?: MaybeRefOrGetter<
      BPopoverSlots[K] | Readonly<Component>
    >
  }
} & {
  [K in keyof BPopoverEmits as CamelCase<Prefix<'on-', K>>]?: (e: BPopoverEmits[K][0]) => void
}

export type TooltipOrchestratorShowParam = MaybeRefOrGetter<TooltipOrchestratorParam>

export type PopoverOrchestratorMapValue = BPopoverProps & {
  'onUpdate:modelValue'?: (val: boolean) => void
  'component'?: Readonly<Component>
  'stop'?: () => void
  'slots'?: {
    [K in keyof Omit<BPopoverSlots, 'target'>]?: BPopoverSlots[K] | Readonly<Component>
  }
} & {
  [K in keyof BPopoverEmits as CamelCase<Prefix<'on-', K>>]?: (e: BPopoverEmits[K][0]) => void
}

export type PopoverOrchestratorParam = Omit<BPopoverProps, 'body' | 'title' | 'modelValue'> & {
  'onUpdate:modelValue'?: (val: boolean) => void
  'title'?: MaybeRefOrGetter<BPopoverProps['title']>
  'body'?: MaybeRefOrGetter<BPopoverProps['body']>
  'modelValue'?: MaybeRefOrGetter<BPopoverProps['modelValue']>
  'component'?: Readonly<Component>
  'slots'?: {
    [K in keyof Omit<BPopoverSlots, 'target'>]?: MaybeRefOrGetter<
      BPopoverSlots[K] | Readonly<Component>
    >
  }
} & {
  [K in keyof BPopoverEmits as CamelCase<Prefix<'on-', K>>]?: (e: BPopoverEmits[K][0]) => void
}

export type PopoverOrchestratorShowParam = MaybeRefOrGetter<PopoverOrchestratorParam>

export type ModalOrchestratorMapValue = BModalProps & {
  'onUpdate:modelValue'?: (val: boolean) => void
  'isConfirm'?: boolean
  'promise': {
    value: Promise<boolean | null>
    resolve: (value: boolean | null) => void
  }
  'component'?: Readonly<Component>
  'slots'?: {
    [K in keyof BModalSlots]?: BModalSlots[K] | Readonly<Component>
  }
} & {
  [K in keyof BModalEmits as CamelCase<Prefix<'on-', K>>]?: (e: BModalEmits[K][0]) => void
}

export type ModalOrchestratorParam = Omit<BModalProps, 'body' | 'title' | 'modelValue'> & {
  'onUpdate:modelValue'?: (val: boolean) => void
  'title'?: MaybeRefOrGetter<BModalProps['title']>
  'body'?: MaybeRefOrGetter<BModalProps['body']>
  'modelValue'?: MaybeRefOrGetter<BModalProps['modelValue']>
  'isConfirm'?: boolean
  'component'?: Readonly<Component>
  /**
   * @deprecated
   */
  'props'?: Record<string, unknown>
  'slots'?: {
    [K in keyof BModalSlots]?: MaybeRefOrGetter<BModalSlots[K] | Readonly<Component>>
  }
} & {
  [K in keyof BModalEmits as CamelCase<Prefix<'on-', K>>]?: (e: BModalEmits[K][0]) => void
}

export type ModalOrchestratorShowParam = MaybeRefOrGetter<ModalOrchestratorParam>
