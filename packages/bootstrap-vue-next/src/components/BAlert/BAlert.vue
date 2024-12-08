<template>
  <Transition
    v-if="renderRef || contentShowing"
    v-bind="transitionProps"
    :appear="!!modelValue || props.visible"
  >
    <div
      v-show="isAlertVisible"
      :id="props.id"
      ref="_element"
      class="alert"
      :class="[props.alertClass, computedClasses]"
      tabindex="0"
      :role="!isAlertVisible ? undefined : props.isStatus ? 'status' : 'alert'"
      :aria-live="!isAlertVisible ? undefined : props.isStatus ? 'polite' : 'assertive'"
      :aria-atomic="!isAlertVisible ? undefined : true"
    >
      <component
        :is="props.headerTag"
        v-if="contentShowing && (slots.title || props.title)"
        class="alert-heading d-flex gap-2"
        :class="props.headerClass"
      >
        <slot name="title" v-bind="sharedSlots">
          <span>
            {{ props.title }}
          </span>
        </slot>
        <template v-if="props.dismissible">
          <BButton
            v-if="slots.close || props.closeContent"
            :class="[props.closeClass]"
            class="ms-auto ps-1 btn-close-custom"
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
            :class="[props.closeClass]"
            @click.stop.prevent="hide('close')"
          />
        </template>
      </component>
      <template v-if="contentShowing && (slots.default || props.body)">
        <div class="d-flex gap-2">
          <component
            :is="computedTag"
            class="alert-body"
            style="display: block"
            v-bind="computedLinkProps"
            @click="computedLink && props.dismissible ? hide() : () => {}"
          >
            <slot v-bind="sharedSlots">
              {{ props.body }}
            </slot>
          </component>

          <template v-if="props.dismissible && !(slots.title || props.title)">
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
import type {BAlertProps} from '../../types/ComponentProps'
import type {BToastEmits} from '../../types/ComponentEmits'
import type {BToastSlots, ShowHideSlotsData} from '../../types/ComponentSlots'
import BCloseButton from '../BButton/BCloseButton.vue'
import BLink from '../BLink/BLink.vue'
import BProgress from '../BProgress/BProgress.vue'
import {useCountdown} from '../../composables/useCountdown'
import {useDefaults} from '../../composables/useDefaults'
import {useCountdownHover} from '../../composables/useCountdownHover'
import {useId} from '../../composables/useId'
import {useShowHide} from '../../composables/useShowHide'

const _props = withDefaults(defineProps<Omit<BAlertProps, 'modelValue'>>(), {
  bgVariant: null,
  body: undefined,
  bodyClass: undefined,
  closeClass: undefined,
  closeContent: undefined,
  closeLabel: 'Close',
  closeVariant: 'secondary',
  dismissible: false,
  headerClass: undefined,
  headerTag: 'div',
  id: undefined,
  initialAnimation: false,
  interval: 'requestAnimationFrame',
  isStatus: false,
  lazy: false,
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
  alertClass: undefined,
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
  // End link props
  variant: 'info',
})
const props = useDefaults(_props, 'BAlert')

const emit = defineEmits<BToastEmits>()

const slots = defineSlots<BToastSlots>()

const element = useTemplateRef<HTMLElement>('_element')

const modelValue = defineModel<Exclude<BAlertProps['modelValue'], undefined>>({default: false})
const {computedLink, computedLinkProps} = useBLinkHelper(props)

const computedId = useId(() => props.id, 'alert')

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

const isAlertVisible = computed(
  () => showRef.value || isActive.value || (props.showOnPause && isPaused.value)
)

// const colorClasses = useColorVariantClasses(props)
const computedClasses = computed(() => [
  // colorClasses.value,
  {
    [`alert-${props.variant}`]: props.variant !== null,
    'alert-dismissible': props.dismissible && !(slots.close || props.closeContent),
    'show': isVisible.value,
    'fade': !computedNoAnimation.value,
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

// isActive in the composable will cause the alert to hide when the countdown is done
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
.alert :deep(.progress .progress-bar) {
  --bs-progress-bar-transition: none;
}

.btn-close-custom {
  margin-bottom: auto;
  position: relative;
}
</style>
