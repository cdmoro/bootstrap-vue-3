<template>
  <ConditionalTeleport :to="props.teleportTo" :disabled="props.teleportDisabled">
    <Transition
      v-if="renderRef || contentShowing"
      v-bind="transitionProps"
      :appear="modelValue || props.visible"
      @after-enter="onAfterEnter"
    >
      <div
        v-show="showRef && ((backdropReady && props.backdropFirst) || !props.backdropFirst)"
        :id="computedId"
        ref="_element"
        class="modal"
        :class="[
          props.modalClass,
          {
            fade: !computedNoAnimation,
            show: isVisible,
          },
        ]"
        role="dialog"
        :aria-labelledby="!props.noHeader ? `${computedId}-label` : undefined"
        :aria-describedby="`${computedId}-body`"
        tabindex="-1"
        v-bind="$attrs"
        :style="computedZIndex"
        @click.self="hide('backdrop')"
      >
        <div class="modal-dialog" :class="modalDialogClasses">
          <div v-if="contentShowing" class="modal-content" :class="props.contentClass">
            <div v-if="!props.noHeader" class="modal-header" :class="headerClasses">
              <slot name="header" v-bind="sharedSlots">
                <component
                  :is="props.titleTag"
                  :id="`${computedId}-label`"
                  class="modal-title"
                  :class="titleClasses"
                >
                  <slot name="title" v-bind="sharedSlots">
                    {{ props.title }}
                  </slot>
                </component>
                <template v-if="!props.noHeaderClose">
                  <BButton
                    v-if="hasHeaderCloseSlot"
                    v-bind="headerCloseAttrs"
                    @click="hide('close')"
                  >
                    <slot name="header-close" v-bind="sharedSlots" />
                  </BButton>
                  <BCloseButton
                    v-else
                    :aria-label="props.headerCloseLabel"
                    v-bind="headerCloseAttrs"
                    @click="hide('close')"
                  />
                </template>
              </slot>
            </div>
            <div
              :id="`${computedId}-body`"
              class="modal-body"
              :class="bodyClasses"
              v-bind="props.bodyAttrs"
            >
              <slot v-bind="sharedSlots">
                {{ props.body }}
              </slot>
            </div>
            <div v-if="!props.noFooter" class="modal-footer" :class="footerClasses">
              <slot name="footer" v-bind="sharedSlots">
                <slot name="cancel" v-bind="sharedSlots">
                  <BButton
                    v-if="!props.okOnly"
                    ref="_cancelButton"
                    :disabled="disableCancel"
                    :size="props.buttonSize"
                    :variant="props.cancelVariant"
                    @click="hide('cancel')"
                  >
                    {{ props.cancelTitle }}
                  </BButton>
                </slot>
                <slot name="ok" v-bind="sharedSlots">
                  <BButton
                    ref="_okButton"
                    :disabled="disableOk"
                    :size="props.buttonSize"
                    :variant="props.okVariant"
                    @click="hide('ok')"
                  >
                    {{ props.okTitle }}
                  </BButton>
                </slot>
              </slot>
            </div>
          </div>
        </div>
        <div
          v-if="needsFallback"
          ref="_fallbackFocusElement"
          :class="fallbackClassSelector"
          tabindex="0"
          style="width: 0; height: 0; overflow: hidden"
        />
      </div>
    </Transition>
    <slot v-if="!props.noBackdrop" name="backdrop" v-bind="sharedSlots">
      <Transition v-if="renderBackdropRef" v-bind="backdropTransitionProps">
        <div
          v-show="showRef || (isLeaving && props.backdropFirst && !computedNoAnimation)"
          class="modal-backdrop"
          :style="computedZIndexBackdrop"
          :class="{
            fade: !computedNoAnimation,
            show: backdropVisible || computedNoAnimation,
          }"
          @click="hide('backdrop')"
        />
      </Transition>
    </slot>
  </ConditionalTeleport>
</template>

<script setup lang="ts">
import {onKeyStroke, useFocus} from '@vueuse/core'
import {useActivatedFocusTrap} from '../../composables/useActivatedFocusTrap'
import {computed, type CSSProperties, type EmitFn, useTemplateRef, watch} from 'vue'
import type {BModalProps} from '../../types/ComponentProps'
import type {BModalEmits} from '../../types/ComponentEmits'
import type {BModalSlots, BModalSlotsData} from '../../types/ComponentSlots'

import BButton from '../BButton/BButton.vue'
import BCloseButton from '../BButton/BCloseButton.vue'
import {useDefaults} from '../../composables/useDefaults'
import {useId} from '../../composables/useId'
import {useSafeScrollLock} from '../../composables/useSafeScrollLock'
import {isEmptySlot} from '../../utils/dom'
import {useColorVariantClasses} from '../../composables/useColorVariantClasses'
import {useModalManager} from '../../composables/useModalManager'
import {useShowHide} from '../../composables/useShowHide'
import ConditionalTeleport from '../ConditionalTeleport.vue'

defineOptions({
  inheritAttrs: false,
})

// aria
// autofocus
// close on escape when autofocus

// Note, attempt to return focus to item that openned the modal after close
// Implement auto focus props like autoFocusButton

const _props = withDefaults(defineProps<Omit<BModalProps, 'modelValue'>>(), {
  autofocus: true,
  autofocusButton: undefined,
  backdropFirst: false,
  body: undefined,
  bodyBgVariant: null,
  bodyAttrs: undefined,
  bodyClass: null,
  bodyScrolling: false,
  bodyTextVariant: null,
  bodyVariant: null,
  busy: false,
  buttonSize: 'md',
  cancelDisabled: false,
  cancelTitle: 'Cancel',
  cancelVariant: 'secondary',
  centered: false,
  contentClass: undefined,
  dialogClass: undefined,
  footerBgVariant: null,
  footerBorderVariant: null,
  footerClass: undefined,
  footerTextVariant: null,
  footerVariant: null,
  fullscreen: false,
  headerBgVariant: null,
  headerBorderVariant: null,
  headerClass: undefined,
  headerCloseClass: undefined,
  headerCloseLabel: 'Close',
  headerCloseVariant: 'secondary',
  headerTextVariant: null,
  headerVariant: null,
  noFooter: false,
  noHeader: false,
  noHeaderClose: false,
  id: undefined,
  initialAnimation: false,
  lazy: false,
  modalClass: undefined,
  noBackdrop: false,
  noCloseOnBackdrop: false,
  noCloseOnEsc: false,
  noFade: false,
  noTrap: false,
  okDisabled: false,
  okOnly: false,
  okTitle: 'OK',
  okVariant: 'primary',
  unmountLazy: false,
  scrollable: false,
  size: 'md',
  teleportDisabled: false,
  teleportTo: 'body',
  title: undefined,
  titleClass: undefined,
  titleVisuallyHidden: false,
  titleTag: 'h5',
  show: false,
  transProps: undefined,
  visible: false,
})
const props = useDefaults(_props, 'BModal')

const emit = defineEmits<BModalEmits>()

const slots = defineSlots<BModalSlots>()

const computedId = useId(() => props.id, 'modal')
// Note: passive: true will sync an internal ref... This is required for useModalManager to exit,
// Since the modelValue that's passed from that composable is not reactive, this internal ref _is_ and thus it will trigger closing the modal
const modelValue = defineModel<Exclude<BModalProps['modelValue'], undefined>>({default: false})

const element = useTemplateRef<HTMLElement>('_element')
const fallbackFocusElement = useTemplateRef<HTMLElement>('_fallbackFocusElement')
const okButton = useTemplateRef<HTMLElement>('_okButton')
const cancelButton = useTemplateRef<HTMLElement>('_cancelButton')
const closeButton = useTemplateRef<HTMLElement>('_closeButton')

const pickFocusItem = () => {
  if (props.autofocus === false) return
  if (props.autofocusButton === 'ok') {
    okButtonFocus.value = true
  } else if (props.autofocusButton === 'close') {
    closeButtonFocus.value = true
  } else if (props.autofocusButton === 'cancel') {
    cancelButtonFocus.value = true
  } else {
    modalFocus.value = true
  }
}

const onAfterEnter = () => {
  pickFocusItem()
}

const {
  showRef,
  renderRef,
  renderBackdropRef,
  hide,
  show,
  toggle,
  computedNoAnimation,
  transitionProps,
  backdropTransitionProps,
  isLeaving,
  isVisible,
  trapActive,
  contentShowing,
  backdropReady,
  backdropVisible,
} = useShowHide(modelValue, props, emit as EmitFn, element, computedId, {
  // addShowClass: false,
  transitionProps: {
    onAfterEnter,
  },
})

const fallbackClassSelector = 'modal-fallback-focus'
const {needsFallback} = useActivatedFocusTrap({
  element,
  isActive: trapActive,
  noTrap: () => props.noTrap,
  fallbackFocus: {
    ref: fallbackFocusElement,
    classSelector: fallbackClassSelector,
  },
})

onKeyStroke(
  'Escape',
  () => {
    hide('esc')
  },
  {target: element}
)
useSafeScrollLock(showRef, () => props.bodyScrolling)
const {focused: modalFocus} = useFocus(element, {
  initialValue: modelValue.value && props.autofocusButton === undefined && props.autofocus === true,
})
const {focused: okButtonFocus} = useFocus(okButton, {
  initialValue: modelValue.value && props.autofocusButton === 'ok' && props.autofocus === true,
})
const {focused: cancelButtonFocus} = useFocus(cancelButton, {
  initialValue: modelValue.value && props.autofocusButton === 'cancel' && props.autofocus === true,
})
const {focused: closeButtonFocus} = useFocus(closeButton, {
  initialValue: modelValue.value && props.autofocusButton === 'close' && props.autofocus === true,
})

const hasHeaderCloseSlot = computed(() => !isEmptySlot(slots['header-close']))

const modalDialogClasses = computed(() => [
  props.dialogClass,
  {
    'modal-fullscreen': props.fullscreen === true,
    [`modal-fullscreen-${props.fullscreen}-down`]: typeof props.fullscreen === 'string',
    [`modal-${props.size}`]: props.size !== 'md',
    'modal-dialog-centered': props.centered,
    'modal-dialog-scrollable': props.scrollable,
  },
])

const bodyColorClasses = useColorVariantClasses(() => ({
  bgVariant: props.bodyBgVariant,
  textVariant: props.bodyTextVariant,
  variant: props.bodyVariant,
}))
const bodyClasses = computed(() => [props.bodyClass, bodyColorClasses.value])

const headerColorClasses = useColorVariantClasses(() => ({
  bgVariant: props.headerBgVariant,
  textVariant: props.headerTextVariant,
  variant: props.headerVariant,
  borderVariant: props.headerBorderVariant,
}))
const headerClasses = computed(() => [props.headerClass, headerColorClasses.value])

const headerCloseAttrs = computed(() => ({
  variant: hasHeaderCloseSlot.value ? props.headerCloseVariant : undefined,
  class: props.headerCloseClass,
}))

const footerColorClasses = useColorVariantClasses(() => ({
  bgVariant: props.footerBgVariant,
  textVariant: props.footerTextVariant,
  variant: props.footerVariant,
  borderVariant: props.footerBorderVariant,
}))
const footerClasses = computed(() => [props.footerClass, footerColorClasses.value])

const titleClasses = computed(() => [
  props.titleClass,
  {
    ['visually-hidden']: props.titleVisuallyHidden,
  },
])
const disableCancel = computed(() => props.cancelDisabled || props.busy)
const disableOk = computed(() => props.okDisabled || props.busy)

const {activePosition, activeModalCount, stackWithoutSelf} = useModalManager(
  showRef,
  modelValue.value
)

watch(stackWithoutSelf, (newValue, oldValue) => {
  if (newValue.length > oldValue.length && showRef.value === true && props.noStacking === true)
    hide()
})

const defaultModalDialogZIndex = 1056
const computedZIndexNumber = computed<number>(() =>
  // Make sure that newly opened modals have a higher z-index than currently active ones.
  // All active modals have a z-index of ('defaultZIndex' - 'stackSize' - 'positionInStack').
  //
  // This means inactive modals will already be higher than active ones when opened.

  showRef.value || isLeaving.value
    ? // Just for reference there is a single frame in which the modal is not active but still has a higher z-index than the active ones due to _when_ it calculates its position. It's a small visual effect
      defaultModalDialogZIndex -
      ((activeModalCount?.value ?? 0) * 2 - (activePosition?.value ?? 0) * 2)
    : defaultModalDialogZIndex
)
const computedZIndex = computed<CSSProperties>(() => ({
  'z-index': computedZIndexNumber.value,
}))
const computedZIndexBackdrop = computed<CSSProperties>(() => ({
  'z-index': computedZIndexNumber.value - 1,
}))

const sharedSlots = computed<BModalSlotsData>(() => ({
  id: computedId.value,
  cancel: () => {
    hide('cancel')
  },
  close: () => {
    hide('close')
  },
  hide,
  show,
  toggle,
  ok: () => {
    hide('ok')
  },
  active: showRef.value,
  visible: showRef.value,
}))

defineExpose({
  hide,
  id: computedId,
  show,
  toggle,
})
</script>

<style lang="scss" scoped>
.modal {
  display: block;
}

.modal-dialog {
  z-index: 1051;
}
</style>
