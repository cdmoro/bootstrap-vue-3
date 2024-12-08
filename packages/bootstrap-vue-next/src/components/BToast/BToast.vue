<template>
  <Transition
    v-if="renderRef || contentShowing"
    v-bind="transitionProps"
    :appear="!!modelValue || props.visible"
  >
    <div
      v-show="isToastVisible"
      :id="props.id"
      ref="_element"
      class="toast"
      :class="[props.toastClass, computedClasses]"
      tabindex="0"
      :role="!isToastVisible ? undefined : props.isStatus ? 'status' : 'alert'"
      :aria-live="!isToastVisible ? undefined : props.isStatus ? 'polite' : 'assertive'"
      :aria-atomic="!isToastVisible ? undefined : true"
    >
      <component
        :is="props.headerTag"
        v-if="contentShowing && (slots.title || props.title)"
        class="toast-header"
        :class="props.headerClass"
      >
        <slot name="title" v-bind="sharedSlots">
          <strong>
            {{ props.title }}
          </strong>
        </slot>
        <template v-if="!props.noCloseButton">
          <BButton
            v-if="slots.close || props.closeContent"
            :class="[props.closeClass]"
            class="ms-auto"
            :variant="props.closeVariant"
            @click.stop.prevent="hide('close')"
          >
            <slot name="close" v-bind="sharedSlots">
              {{ props.closeContent }}
            </slot>
          </BButton>
          <BCloseButton
            v-else
            :aria-label="props.closeLabel"
            class="ms-auto"
            :class="[props.closeClass]"
            @click.stop.prevent="hide('close')"
          />
        </template>
        <!-- <BCloseButton  class="ms-auto" @click="hide('close')" /> -->
      </component>
      <template v-if="contentShowing && (slots.default || props.body)">
        <div class="d-flex">
          <component
            :is="computedTag"
            class="toast-body"
            style="display: block"
            :class="props.bodyClass"
            v-bind="computedLinkProps"
            @click="computedLink ? hide() : () => {}"
          >
            <slot v-bind="sharedSlots">
              {{ props.body }}
            </slot>
          </component>

          <template v-if="!props.noCloseButton && !(slots.title || props.title)">
            <BButton
              v-if="slots.close || props.closeContent"
              :class="[props.closeClass]"
              class="ms-auto btn-close-custom"
              :variant="props.closeVariant"
              @click.stop.prevent="hide('close')"
            >
              <slot name="close" v-bind="sharedSlots">
                {{ props.closeContent }}
              </slot>
            </BButton>
            <BCloseButton
              v-else
              :aria-label="props.closeLabel"
              class="ms-auto btn-close-custom"
              :class="[props.closeClass]"
              @click.stop.prevent="hide('close')"
            />
          </template>
        </div>
      </template>
      <BProgress
        v-if="typeof modelValue === 'number' && props.progressProps !== undefined"
        :animated="props.progressProps.animated"
        :precision="props.progressProps.precision"
        :show-progress="props.progressProps.showProgress"
        :show-value="props.progressProps.showValue"
        :striped="props.progressProps.striped"
        :variant="props.progressProps.variant"
        :max="modelValue"
        :value="remainingMs"
        height="4px"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {computed, type EmitFn, useTemplateRef, watch, watchEffect} from 'vue'
import {useBLinkHelper} from '../../composables/useBLinkHelper'
import type {BToastProps} from '../../types/ComponentProps'
import type {BToastEmits} from '../../types/ComponentEmits'
import type {BToastSlots, ShowHideSlotsData} from '../../types/ComponentSlots'
import BCloseButton from '../BButton/BCloseButton.vue'
import BLink from '../BLink/BLink.vue'
import BProgress from '../BProgress/BProgress.vue'
import {useCountdown} from '../../composables/useCountdown'
import {useColorVariantClasses} from '../../composables/useColorVariantClasses'
import {useDefaults} from '../../composables/useDefaults'
import {useCountdownHover} from '../../composables/useCountdownHover'
import {useId} from '../../composables/useId'
import {useShowHide} from '../../composables/useShowHide'

const _props = withDefaults(defineProps<Omit<BToastProps, 'modelValue'>>(), {
  bgVariant: null,
  body: undefined,
  bodyClass: undefined,
  closeClass: undefined,
  closeContent: undefined,
  closeLabel: 'Close',
  closeVariant: 'secondary',
  headerClass: undefined,
  headerTag: 'div',
  id: undefined,
  initialAnimation: false,
  interval: 'requestAnimationFrame',
  isStatus: false,
  lazy: false,
  noCloseButton: false,
  noFade: false,
  noHoverPause: false,
  noResumeOnHoverLeave: false,
  progressProps: undefined,
  unmountLazy: false,
  showOnPause: true,
  show: false,
  solid: false,
  textVariant: null,
  title: undefined,
  toastClass: undefined,
  transProps: undefined,
  visible: false,
  // Link props
  // All others use defaults
  noRel: undefined,
  active: undefined,
  activeClass: undefined,
  disabled: undefined,
  exactActiveClass: undefined,
  href: undefined,
  icon: undefined,
  opacity: undefined,
  opacityHover: undefined,
  stretched: false,
  rel: undefined,
  replace: undefined,
  routerComponentName: undefined,
  target: undefined,
  to: undefined,
  underlineOffset: undefined,
  underlineOffsetHover: undefined,
  underlineOpacity: undefined,
  underlineOpacityHover: undefined,
  underlineVariant: undefined,
  variant: undefined,
  // End link props
})
const props = useDefaults(_props, 'BToast')

const emit = defineEmits<BToastEmits>()

const slots = defineSlots<BToastSlots>()

const element = useTemplateRef<HTMLElement>('_element')

const modelValue = defineModel<Exclude<BToastProps['modelValue'], undefined>>({default: false})
const {computedLink, computedLinkProps} = useBLinkHelper(props)

const computedId = useId(() => props.id, 'toast')

const {
  showRef,
  renderRef,
  hide,
  toggle,
  show,
  buildTriggerableEvent,
  computedNoAnimation,
  isVisible,
  transitionProps,
  contentShowing,
} = useShowHide(modelValue, props, emit as EmitFn, element, computedId)

// TODO solid is never used
const countdownLength = computed(() =>
  typeof modelValue.value === 'boolean' ? 0 : modelValue.value
)

const {
  isActive,
  pause,
  restart,
  resume,
  stop,
  isPaused,
  value: remainingMs,
} = useCountdown(countdownLength, props.interval, {
  immediate: typeof modelValue.value === 'number' && !!modelValue.value,
})
useCountdownHover(
  element,
  computed(() => ({
    noHoverPause: props.noHoverPause || typeof modelValue.value !== 'number',
    noResumeOnHoverLeave: props.noResumeOnHoverLeave || typeof modelValue.value !== 'number',
    modelValueIgnoresHover: typeof modelValue.value === 'boolean',
  })),
  {pause, resume}
)

watchEffect(() => {
  emit('close-countdown', remainingMs.value)
})

const computedTag = computed(() => (computedLink.value ? BLink : 'div'))

const isToastVisible = computed(
  () => showRef.value || isActive.value || (props.showOnPause && isPaused.value)
)

const colorClasses = useColorVariantClasses(props)
const computedClasses = computed(() => [
  colorClasses.value,
  {
    show: isVisible.value,
    fade: !computedNoAnimation.value,
  },
])

watch(modelValue, (newValue) => {
  if (typeof newValue === 'number') {
    const event = buildTriggerableEvent('show', {cancelable: true, trigger: 'model'})
    emit('show', event)
    if (event.defaultPrevented) {
      emit('show-prevented', buildTriggerableEvent('show-prevented'))
    } else {
      restart()
    }
  }
})

// isActive in the composable will cause the toast to hide when the countdown is done
watch(isActive, (newValue) => {
  if (newValue === false && isPaused.value === false) {
    hide()
    modelValue.value = 0
    stop()
  }
})
const sharedSlots = computed<ShowHideSlotsData>(() => ({
  toggle,
  show,
  hide,
  id: computedId.value,
  visible: showRef.value,
  active: isActive.value,
}))

defineExpose({
  show,
  hide,
  toggle,
  pause,
  restart,
  resume,
  stop,
})
</script>

<style lang="scss" scoped>
.toast :deep(.progress .progress-bar) {
  --bs-progress-bar-transition: none;
}
.toast:not(.show) {
  display: block;
  opacity: unset;
}
.toast.fade:not(.show) {
  opacity: 0;
}
.btn-close-custom {
  margin: var(--bs-toast-padding-x) var(--bs-toast-padding-x) auto;
}
</style>
