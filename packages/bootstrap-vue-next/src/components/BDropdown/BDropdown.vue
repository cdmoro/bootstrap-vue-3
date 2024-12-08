<template>
  <ConditionalWrapper
    :skip="inInputGroup || props.noWrapper"
    :class="computedClasses"
    :role="inButtonGroupAttributes?.role"
  >
    <BButton
      :id="computedId"
      ref="_splitButton"
      :variant="props.splitVariant || props.variant"
      :size="props.size"
      :class="buttonClasses"
      :disabled="props.splitDisabled || props.disabled"
      :type="props.splitButtonType"
      :aria-label="props.ariaLabel"
      :aria-expanded="props.split ? undefined : showRef"
      :aria-haspopup="props.split ? undefined : 'menu'"
      :href="props.split ? props.splitHref : undefined"
      :to="props.split && props.splitTo ? props.splitTo : undefined"
      @click="onSplitClick"
    >
      <slot name="button-content"> {{ props.text }} </slot>
    </BButton>
    <BButton
      v-if="props.split"
      :id="computedId + '-split'"
      ref="_button"
      :variant="props.variant"
      :size="props.size"
      :disabled="props.disabled"
      :class="[props.toggleClass, {show: showRef}]"
      class="dropdown-toggle-split dropdown-toggle"
      :aria-expanded="showRef"
      aria-haspopup="menu"
      @click="onButtonClick"
    >
      <span class="visually-hidden">
        <slot name="toggle-text">
          {{ props.toggleText }}
        </slot>
      </span>
    </BButton>
    <ConditionalTeleport
      :to="props.teleportTo"
      :disabled="!props.teleportTo || props.teleportDisabled"
    >
      <Transition
        v-if="renderRef || contentShowing"
        v-bind="transitionProps"
        :appear="modelValue || props.visible"
      >
        <ul
          v-show="showRef"
          :id="computedId + '-menu'"
          ref="_floating"
          :style="[floatingStyles, sizeStyles]"
          class="dropdown-menu overflow-auto"
          :class="[props.menuClass, computedMenuClasses]"
          :aria-labelledby="computedId"
          :role="props.role"
          @click="onClickInside"
        >
          <slot v-if="contentShowing" :hide="hide" :show="show" :visible="showRef" />
        </ul>
      </Transition>
    </ConditionalTeleport>
  </ConditionalWrapper>
</template>

<script setup lang="ts">
import {
  autoUpdate,
  type Boundary,
  flip,
  type Middleware,
  offset as offsetMiddleware,
  type RootBoundary,
  shift,
  size as sizeMiddleware,
  useFloating,
} from '@floating-ui/vue'
import {onClickOutside, onKeyStroke, useToNumber} from '@vueuse/core'
import {
  computed,
  type CSSProperties,
  type EmitFn,
  inject,
  nextTick,
  provide,
  ref,
  toRef,
  useTemplateRef,
  watch,
} from 'vue'
import {useDefaults} from '../../composables/useDefaults'
import {useId} from '../../composables/useId'
import type {BDropdownProps} from '../../types/ComponentProps'
import type {BDropdownEmits} from '../../types/ComponentEmits'
import BButton from '../BButton/BButton.vue'
import ConditionalWrapper from '../ConditionalWrapper.vue'
import ConditionalTeleport from '../ConditionalTeleport.vue'
import {isBoundary, isRootBoundary} from '../../utils/floatingUi'
import {getElement} from '../../utils/getElement'
import {buttonGroupKey, dropdownInjectionKey, inputGroupKey} from '../../utils/keys'
import {useShowHide} from '../../composables/useShowHide'

const _props = withDefaults(defineProps<Omit<BDropdownProps, 'modelValue'>>(), {
  ariaLabel: undefined,
  autoClose: true,
  boundary: 'clippingAncestors',
  boundaryPadding: undefined,
  teleportTo: undefined,
  teleportDisabled: false,
  disabled: false,
  floatingMiddleware: undefined,
  id: undefined,
  initialAnimation: false,
  isNav: false,
  lazy: false,
  menuClass: undefined,
  noCaret: false,
  noFade: false,
  noFlip: false,
  noShift: false,
  noSize: false,
  offset: 0,
  unmountLazy: false,
  role: 'menu',
  size: 'md',
  noWrapper: false,
  split: false,
  splitButtonType: 'button',
  splitClass: undefined,
  splitDisabled: undefined,
  splitHref: undefined,
  splitTo: undefined,
  placement: 'bottom-start',
  splitVariant: undefined,
  strategy: 'absolute',
  text: undefined,
  show: false,
  toggleClass: undefined,
  toggleText: 'Toggle dropdown',
  transProps: undefined,
  variant: 'secondary',
  visible: false,
  wrapperClass: undefined,
})
const props = useDefaults(_props, 'BDropdown')

const emit = defineEmits<BDropdownEmits>()

defineSlots<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'button-content'?: (props: Record<string, never>) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'default'?: (props: {hide: () => void; show: () => void; visible: boolean}) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'toggle-text'?: (props: Record<string, never>) => any
}>()

const computedId = useId(() => props.id, 'dropdown')

const modelValue = defineModel<Exclude<BDropdownProps['modelValue'], undefined>>({default: false})

const inInputGroup = inject(inputGroupKey, false)
const inButtonGroup = inject(buttonGroupKey, false)

const computedOffset = computed(() =>
  typeof props.offset === 'string' || typeof props.offset === 'number' ? props.offset : NaN
)
const offsetToNumber = useToNumber(computedOffset)

const floating = useTemplateRef<HTMLElement>('_floating')
const button = useTemplateRef<HTMLElement>('_button')
const splitButton = useTemplateRef<HTMLElement>('_splitButton')

const boundary = computed<Boundary | undefined>(() =>
  isBoundary(props.boundary) ? props.boundary : undefined
)
const rootBoundary = computed<RootBoundary | undefined>(() =>
  isRootBoundary(props.boundary) ? props.boundary : undefined
)

const referencePlacement = computed(() => (!props.split ? splitButton.value : button.value))

const {
  showRef,
  renderRef,
  hide,
  show,
  toggle,
  computedNoAnimation,
  transitionProps,
  contentShowing,
  isVisible,
} = useShowHide(modelValue, props, emit as EmitFn, referencePlacement, computedId)

const computedMenuClasses = computed(() => [
  {
    show: isVisible.value,
    fade: !computedNoAnimation.value,
  },
])

onKeyStroke(
  'Escape',
  () => {
    hide()
    getElement(referencePlacement.value)?.focus()
  },
  {target: referencePlacement}
)
onKeyStroke(
  'Escape',
  () => {
    hide()
    getElement(referencePlacement.value)?.focus()
  },
  {target: floating}
)

const keynav = (e: Readonly<Event>, v: number) => {
  if (floating.value?.contains((e.target as HTMLElement)?.closest('form'))) return
  if (/input|select|option|textarea|form/i.test((e.target as HTMLElement)?.tagName)) return
  e.preventDefault()
  if (!showRef.value) {
    show()
    const loop = setInterval(() => {
      if (isVisible.value) {
        clearInterval(loop)
        nextTick(() => keynav(e, v))
      }
    }, 16)
    return
  }
  const list = floating.value?.querySelectorAll('.dropdown-item:not(.disabled):not(:disabled)')
  if (!list) return
  if (floating.value?.contains(document.activeElement)) {
    const active = floating.value.querySelector('.dropdown-item:focus')
    const index = Array.prototype.indexOf.call(list, active) + v
    if (index >= 0 && index < list?.length) (list[index] as HTMLElement)?.focus()
  } else {
    ;(list[v === -1 ? list.length - 1 : 0] as HTMLElement)?.focus()
  }
}

onKeyStroke('ArrowUp', (e) => keynav(e, -1), {target: referencePlacement})
onKeyStroke('ArrowDown', (e) => keynav(e, 1), {target: referencePlacement})
onKeyStroke('ArrowUp', (e) => keynav(e, -1), {target: floating})
onKeyStroke('ArrowDown', (e) => keynav(e, 1), {target: floating})

const sizeStyles = ref<CSSProperties>({})
const floatingMiddleware = computed<Middleware[]>(() => {
  if (props.floatingMiddleware !== undefined) {
    return props.floatingMiddleware
  }
  const localOffset =
    typeof props.offset === 'string' || typeof props.offset === 'number'
      ? offsetToNumber.value
      : props.offset
  const arr: Middleware[] = [offsetMiddleware(localOffset)]
  if (props.noFlip === false) {
    arr.push(
      flip({
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
  if (props.noSize === false) {
    arr.push(
      sizeMiddleware({
        boundary: boundary.value,
        rootBoundary: rootBoundary.value,
        padding: props.boundaryPadding,
        apply({availableWidth, availableHeight}) {
          sizeStyles.value = {
            maxHeight:
              availableHeight >= (floating.value?.scrollHeight ?? 0)
                ? undefined
                : availableHeight
                  ? `${Math.max(0, availableHeight)}px`
                  : undefined,
            maxWidth:
              availableWidth >= (floating.value?.scrollWidth ?? 0)
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
const {update, floatingStyles} = useFloating(referencePlacement, floating, {
  placement: () => props.placement,
  middleware: floatingMiddleware,
  strategy: toRef(() => props.strategy),
  whileElementsMounted: autoUpdate,
})

const inButtonGroupAttributes = inButtonGroup
  ? {
      class: 'btn-group',
      role: 'group',
    }
  : undefined

const computedClasses = computed(() => [
  inButtonGroupAttributes?.class,
  props.wrapperClass,
  {
    'btn-group': !props.wrapperClass && props.split,
    'dropdown': !props.wrapperClass && !props.split,
    'position-static': props.boundary !== 'clippingAncestors' && !props.isNav,
  },
])

const buttonClasses = computed(() => [
  props.split ? props.splitClass : props.toggleClass,
  {
    'nav-link': props.isNav,
    'dropdown-toggle': !props.split,
    'dropdown-toggle-no-caret': props.noCaret && !props.split,
    'show': props.split ? undefined : showRef.value,
  },
])

const onButtonClick = () => {
  toggle()
}

const onSplitClick = (event: Readonly<MouseEvent>) => {
  if (props.split) {
    emit('click', event)
    return
  }
  onButtonClick()
}

onClickOutside(
  floating,
  () => {
    if (showRef.value && (props.autoClose === true || props.autoClose === 'outside')) {
      hide()
    }
  },
  {ignore: [button, splitButton]}
)
const onClickInside = () => {
  if (showRef.value && (props.autoClose === true || props.autoClose === 'inside')) {
    hide()
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

provide(dropdownInjectionKey, {
  id: computedId,
  show,
  hide,
  toggle,
  visible: toRef(() => showRef.value),
  isNav: toRef(() => props.isNav),
})
</script>
<style lang="scss" scoped>
.dropdown-menu {
  &.fade {
    display: block;
  }
}
</style>
