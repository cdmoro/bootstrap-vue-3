<template>
  <slot name="header" v-bind="sharedSlots" />
  <Transition
    v-if="renderRef || contentShowing"
    v-bind="transitionProps"
    :enter-active-class="computedNoAnimation ? '' : 'collapsing'"
    :leave-active-class="computedNoAnimation ? '' : 'collapsing'"
    :appear="modelValue || props.visible"
  >
    <component
      :is="props.tag"
      v-show="showRef"
      :id="computedId"
      ref="_element"
      class="collapse"
      :class="computedClasses"
      :is-nav="props.isNav"
      v-bind="$attrs"
    >
      <slot v-if="contentShowing" v-bind="sharedSlots" />
    </component>
  </Transition>
  <slot name="footer" v-bind="sharedSlots" />
</template>

<script setup lang="ts">
import {computed, type EmitFn, provide, readonly, toRef, useTemplateRef} from 'vue'
import {useDefaults} from '../../composables/useDefaults'
import {useId} from '../../composables/useId'
import {collapseInjectionKey} from '../../utils/keys'
import type {BCollapseProps} from '../../types/ComponentProps'
import type {BCollapseEmits} from '../../types/ComponentEmits'
import type {BCollapseSlots, ShowHideSlotsData} from '../../types/ComponentSlots'
import {useShowHide} from '../../composables/useShowHide'

defineOptions({
  inheritAttrs: false,
})

const _props = withDefaults(defineProps<Omit<BCollapseProps, 'modelValue'>>(), {
  horizontal: false,
  id: undefined,
  initialAnimation: false,
  isNav: false,
  lazy: false,
  noAnimation: false,
  unmountLazy: false,
  tag: 'div',
  show: false,
  visible: false,
})

const props = useDefaults(_props, 'BCollapse')

const emit = defineEmits<BCollapseEmits>()

defineSlots<BCollapseSlots>()

const modelValue = defineModel<Exclude<BCollapseProps['modelValue'], undefined>>({
  default: false,
})

const computedId = useId(() => props.id, 'collapse')

const element = useTemplateRef<HTMLElement>('_element')

let inCollapse = false
const onEnter = (el: Element) => {
  inCollapse = true
  requestAnimationFrame(() => {
    if (props.horizontal) {
      ;(el as HTMLElement).style.width = `${(el as HTMLElement).scrollWidth}px`
    } else {
      ;(el as HTMLElement).style.height = `${(el as HTMLElement).scrollHeight}px`
    }
  })
}
const onBeforeLeave = (el: Element) => {
  if (inCollapse) {
    return
  }
  if (props.horizontal) {
    ;(el as HTMLElement).style.width = `${el.scrollWidth}px`
  } else {
    ;(el as HTMLElement).style.height = `${el.scrollHeight}px`
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  ;(el as HTMLElement).offsetHeight // force reflow
}
const onLeave = (el: Element) => {
  requestAnimationFrame(() => {
    if (props.horizontal) {
      ;(el as HTMLElement).style.width = ``
    } else {
      ;(el as HTMLElement).style.height = ``
    }
  })
}

const onAfterEnter = (el: Element) => {
  ;(el as HTMLElement).style.height = ``
  ;(el as HTMLElement).style.width = ``
  inCollapse = false
}

const onAfterLeave = (el: Element) => {
  ;(el as HTMLElement).style.height = ``
  ;(el as HTMLElement).style.width = ``
  inCollapse = false
}

const {
  showRef,
  renderRef,
  hide,
  show,
  toggle,
  isActive,
  computedNoAnimation,
  contentShowing,
  transitionProps,
} = useShowHide(modelValue, props, emit as EmitFn, element, computedId, {
  // addShowClass: false,
  transitionProps: {
    onBeforeLeave,
    onEnter,
    onLeave,
    onAfterEnter,
    onAfterLeave,
    enterToClass: '',
    leaveToClass: '',
    enterFromClass: '',
    leaveFromClass: '',
    enterActiveClass: '',
    leaveActiveClass: '',
  },
})

const computedClasses = computed(() => ({
  'show': isActive.value,
  'navbar-collapse': props.isNav,
  'collapse-horizontal': props.horizontal,
}))

const sharedSlots = computed<ShowHideSlotsData>(() => ({
  toggle,
  show,
  hide,
  id: computedId.value,
  visible: showRef.value,
  active: isActive.value,
}))

defineExpose({
  hide,
  isNav: props.isNav,
  show,
  toggle,
  visible: readonly(showRef),
})

provide(collapseInjectionKey, {
  id: computedId,
  hide,
  show,
  toggle,
  visible: readonly(showRef),
  isNav: toRef(() => props.isNav),
})
</script>
