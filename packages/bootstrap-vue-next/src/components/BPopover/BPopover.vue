<template>
  <span :id="computedId + '_placeholder'" ref="_placeholder" />
  <slot name="target" v-bind="sharedSlots" />
  <ConditionalTeleport
    :to="props.teleportTo"
    :disabled="!props.teleportTo || props.teleportDisabled"
  >
    <Transition
      v-if="renderRef || contentShowing"
      v-bind="transitionProps"
      :appear="modelValue || props.visible"
    >
      <div
        v-show="showRef && !hidden"
        :id="computedId"
        v-bind="attrs"
        ref="_element"
        :class="computedClasses"
        role="tooltip"
        tabindex="-1"
        :style="floatingStyles"
      >
        <div
          ref="_arrow"
          :class="`${props.tooltip ? 'tooltip' : 'popover'}-arrow`"
          :style="arrowStyle"
          data-popper-arrow
        />
        <div ref="_content" class="overflow-auto" :style="sizeStyles">
          <template v-if="props.title || slots.title">
            <div
              class="position-sticky top-0"
              :class="props.tooltip ? 'tooltip-inner' : 'popover-header'"
            >
              <slot name="title" v-bind="sharedSlots">
                {{ props.title }}
              </slot>
            </div>
          </template>
          <template v-if="(props.tooltip && !slots.title && !props.title) || !props.tooltip">
            <div :class="props.tooltip ? 'tooltip-inner' : 'popover-body'">
              <slot v-bind="sharedSlots">{{ props.body }}{{ attrs.content }}</slot>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </ConditionalTeleport>
</template>

<script setup lang="ts">
import {
  type Alignment,
  arrow as arrowMiddleware,
  autoPlacement,
  autoUpdate,
  type Boundary,
  flip,
  type Placement as FloatingPlacement,
  hide as hideMiddleware,
  inline as inlineMiddleware,
  type Middleware,
  offset as offsetMiddleware,
  type RootBoundary,
  shift,
  size as sizeMiddleware,
  useFloating,
} from '@floating-ui/vue'
import {onClickOutside, useToNumber} from '@vueuse/core'
import {
  computed,
  type CSSProperties,
  type EmitFn,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  toRef,
  toValue,
  useAttrs,
  useTemplateRef,
  watch,
} from 'vue'
import {useDefaults} from '../../composables/useDefaults'
import {useMouse} from '../../composables/useMouse'
import {useId} from '../../composables/useId'
import type {BPopoverProps} from '../../types/ComponentProps'
import type {BPopoverEmits} from '../../types/ComponentEmits'
import type {BPopoverSlots, ShowHideSlotsData} from '../../types/ComponentSlots'
import {isBoundary, isRootBoundary, resolveBootstrapPlacement} from '../../utils/floatingUi'
import {getElement} from '../../utils/getElement'
import ConditionalTeleport from '../ConditionalTeleport.vue'
import {useShowHide} from '../../composables/useShowHide'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

// TODO: deprication remove warning in 2025-02
if (attrs.content)
  // eslint-disable-next-line no-console
  console.warn(
    'BPopover/BTooltip: `content` prop is deprecated. Use prop body or default slot instead.'
  )

const _props = withDefaults(defineProps<Omit<BPopoverProps, 'modelValue'>>(), {
  boundary: 'clippingAncestors',
  boundaryPadding: undefined,
  click: false,
  closeOnHide: false,
  teleportTo: undefined,
  teleportDisabled: false,
  body: undefined,
  customClass: '',
  delay: () => ({show: 100, hide: 300}),
  floatingMiddleware: undefined,
  hideMargin: 2,
  id: undefined,
  initialAnimation: false,
  inline: false,
  lazy: false,
  manual: false,
  noAutoClose: false,
  noFade: false,
  noFlip: false,
  noHide: false,
  noShift: false,
  noSize: false,
  noninteractive: false,
  offset: null,
  unmountLazy: false,
  placement: 'top',
  realtime: false,
  reference: null,
  strategy: 'absolute',
  target: null,
  title: undefined,
  show: false,
  tooltip: false,
  variant: null,
  visible: false,
})

const props = useDefaults(_props, 'BPopover')

const emit = defineEmits<BPopoverEmits>()

const slots = defineSlots<BPopoverSlots>()

const modelValue = defineModel<Exclude<BPopoverProps['modelValue'], undefined>>({
  default: false,
})

const computedId = useId(() => props.id, 'popover')

const hidden = ref(false)

const element = useTemplateRef<HTMLElement>('_element')
const content = useTemplateRef<HTMLElement>('_content')
const arrow = useTemplateRef<HTMLElement>('_arrow')
const placeholder = useTemplateRef<HTMLElement>('_placeholder')

const floatingTarget = ref<HTMLElement | null>(null)
const trigger = ref<HTMLElement | null>(null)

const isAutoPlacement = computed(() => props.placement.startsWith('auto'))
const offsetNumber = useToNumber(() => props.offset ?? NaN)

const boundary = computed<Boundary | undefined>(() =>
  isBoundary(props.boundary) ? props.boundary : undefined
)
const rootBoundary = computed<RootBoundary | undefined>(() =>
  isRootBoundary(props.boundary) ? props.boundary : undefined
)

const sizeStyles = ref<CSSProperties>({})
const floatingMiddleware = computed<Middleware[]>(() => {
  if (props.floatingMiddleware !== undefined) {
    return props.floatingMiddleware
  }
  const off = props.offset !== null ? offsetNumber.value : props.tooltip ? 6 : 8
  const arr: Middleware[] = [offsetMiddleware(off)]
  if (props.noFlip === false && !isAutoPlacement.value) {
    arr.push(
      flip({
        boundary: boundary.value,
        rootBoundary: rootBoundary.value,
        padding: props.boundaryPadding,
      })
    )
  }
  if (isAutoPlacement.value) {
    arr.push(
      autoPlacement({
        alignment: (props.placement.split('-')[1] as Alignment) || undefined,
        boundary: boundary.value,
        rootBoundary: rootBoundary.value,
        padding: props.boundaryPadding,
      })
    )
  }
  if (props.noShift === false) {
    arr.push(
      shift({
        boundary: boundary.value,
        rootBoundary: rootBoundary.value,
        padding: props.boundaryPadding,
      })
    )
  }
  if (props.noHide === false) {
    arr.push(
      hideMiddleware({
        boundary: boundary.value,
        rootBoundary: rootBoundary.value,
        padding: props.boundaryPadding,
      })
    )
  }
  if (props.inline === true) {
    arr.push(inlineMiddleware())
  }
  arr.push(arrowMiddleware({element: arrow, padding: 10}))
  if (props.noSize === false) {
    arr.push(
      sizeMiddleware({
        boundary: boundary.value,
        rootBoundary: rootBoundary.value,
        padding: props.boundaryPadding,
        apply({availableWidth, availableHeight}) {
          sizeStyles.value = {
            maxHeight:
              availableHeight >= (content.value?.scrollHeight ?? 0)
                ? undefined
                : availableHeight
                  ? `${Math.max(0, availableHeight)}px`
                  : undefined,
            maxWidth:
              availableWidth >= (content.value?.scrollWidth ?? 0)
                ? undefined
                : availableWidth
                  ? `${Math.max(0, availableWidth)}px`
                  : undefined,
          }
        },
      })
    )
  }
  return arr
})

const placementRef = computed(() =>
  isAutoPlacement.value ? undefined : (props.placement as FloatingPlacement)
)

const {floatingStyles, middlewareData, placement, update} = useFloating(floatingTarget, element, {
  placement: placementRef,
  middleware: floatingMiddleware,
  strategy: toRef(() => props.strategy),
  whileElementsMounted: (...args) => {
    const cleanup = autoUpdate(...args, {animationFrame: props.realtime})
    // Important! Always return the cleanup function.
    return cleanup
  },
})

const arrowStyle = ref<CSSProperties>({position: 'absolute'})

watch(middlewareData, (newValue) => {
  if (props.noHide === false) {
    if (newValue.hide?.referenceHidden && !hidden.value && showRef.value) {
      if (props.closeOnHide && !props.noAutoClose && !props.manual) {
        throttleHide('close-on-hide')
      } else {
        localTemporaryHide.value = true
        hidden.value = true
      }
    } else if (localTemporaryHide.value && !newValue.hide?.referenceHidden) {
      localTemporaryHide.value = false
      hidden.value = false
    }
  }
  if (newValue.arrow) {
    const {x, y} = newValue.arrow
    arrowStyle.value = {
      position: 'absolute',
      top: y ? `${y}px` : '',
      left: x ? `${x}px` : '',
    }
  }
})

const {
  showRef,
  hide,
  show,
  toggle,
  throttleHide,
  computedNoAnimation,
  transitionProps,
  contentShowing,
  isVisible,
  isActive,
  renderRef,
  localTemporaryHide,
} = useShowHide(modelValue, props, emit as EmitFn, element, computedId, {
  showFn: () => {
    if (hidden.value) {
      update()
    }
  },
})

const computedClasses = computed(() => {
  const type = props.tooltip ? 'tooltip' : 'popover'
  return [
    type,
    `b-${type}`,
    {
      [`b-${type}-${props.variant}`]: props.variant !== null,
      show: isVisible.value && !hidden.value,
      fade: !computedNoAnimation.value,
      [`${props.customClass}`]: props.customClass !== undefined,
      [`bs-${type}-${resolveBootstrapPlacement(placement.value)}`]: placement.value !== undefined,
    },
  ]
})

const {x, y} = useMouse()

const isElementAndTriggerOutside = () => {
  const triggerRect = trigger.value?.getBoundingClientRect()
  const elementRect = element.value?.getBoundingClientRect()
  const margin = parseInt(props.hideMargin as unknown as string, 10) || 0
  const offsetX = window?.scrollX || 0
  const offsetY = window?.scrollY || 0
  const triggerIsOutside =
    !triggerRect ||
    x.value < triggerRect.left + offsetX - margin ||
    x.value > triggerRect.right + offsetX + margin ||
    y.value < triggerRect.top + offsetY - margin ||
    y.value > triggerRect.bottom + offsetY + margin

  const isOutside =
    !elementRect ||
    x.value < elementRect.left + offsetX - margin ||
    x.value > elementRect.right + offsetX + margin ||
    y.value < elementRect.top + offsetY - margin ||
    y.value > elementRect.bottom + offsetY + margin

  return {triggerIsOutside, isOutside}
}

let looptimeout: ReturnType<typeof setTimeout> | undefined
const tryHide = (e?: Readonly<Event>) => {
  const delay = typeof props.delay === 'number' ? props.delay : props.delay?.hide || 0

  const {triggerIsOutside, isOutside} = isElementAndTriggerOutside()
  if (
    (!props.noninteractive &&
      isOutside &&
      triggerIsOutside &&
      !element.value?.contains(document?.activeElement) &&
      !trigger.value?.contains(document?.activeElement)) ||
    (props.noninteractive && triggerIsOutside)
  ) {
    hide(e?.type)
  } else {
    if (looptimeout) clearTimeout(looptimeout)
    looptimeout = setTimeout(
      () => {
        tryHide(e)
      },
      delay < 50 ? 50 : delay
    )
  }
}

watch(isVisible, () => {
  update()
})

defineExpose({
  hide,
  show,
  toggle,
})

const localToggle = (e: Event) => {
  if (showRef.value) {
    hide(e.type === 'click' ? 'click' : 'toggle')
  } else {
    show()
  }
}

const bind = () => {
  // TODO: is this the best way to bind the events?
  // we place a span and get the next element sibling for the listeners
  if (props.target) {
    const elem = getElement(toValue(props.target))
    if (elem) {
      trigger.value = elem
    } else {
      // eslint-disable-next-line no-console
      console.warn('Target element not found', props.target)
    }
  } else {
    trigger.value = placeholder.value?.nextElementSibling as HTMLElement
  }
  if (props.reference) {
    const elem = getElement(toValue(props.reference))
    if (elem) {
      floatingTarget.value = elem
    } else {
      // eslint-disable-next-line no-console
      console.warn('Reference element not found', props.reference)
    }
  } else {
    floatingTarget.value = trigger.value
  }
  if (!trigger.value || props.manual) {
    return
  }
  if (props.click) {
    trigger.value.addEventListener('click', localToggle)
    return
  }
  trigger.value.addEventListener('pointerenter', show)
  trigger.value.addEventListener('pointerleave', tryHide)
  trigger.value.addEventListener('focus', show)
  trigger.value.addEventListener('blur', tryHide)
}

const unbind = () => {
  if (trigger.value) {
    trigger.value.removeEventListener('click', localToggle)
    trigger.value.removeEventListener('pointerenter', show)
    trigger.value.removeEventListener('pointerleave', tryHide)
    trigger.value.removeEventListener('focus', show)
    trigger.value.removeEventListener('blur', tryHide)
  }
}

onClickOutside(
  element,
  () => {
    if (showRef.value && props.click && !props.noAutoClose && !props.manual) hide('click-outside')
  },
  {ignore: [trigger]}
)

watch([() => props.click, () => props.target, () => props.reference], () => {
  unbind()
  bind()
  // update()
})

const sharedSlots = computed<ShowHideSlotsData>(() => ({
  toggle,
  show,
  hide,
  id: computedId.value,
  visible: isVisible.value,
  active: isActive.value,
}))

onMounted(() => {
  bind()
  nextTick(() => {
    update()
  })
})

onBeforeUnmount(unbind)
</script>
<style lang="scss" scoped>
.bs-popover-auto[data-popper-placement^='bottom']
  .popover-arrow:has(+ div > .popover-header)::after,
.bs-popover-bottom .popover-arrow:has(+ div > .popover-header)::after {
  --bs-popover-bg: var(--bs-popover-header-bg);
}
</style>
