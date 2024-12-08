import {
  computed,
  type EmitFn,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  readonly,
  ref,
  type Ref,
  watch,
} from 'vue'
import {globalShowHideStorageInjectionKey} from '../utils/keys'
import {BvTriggerableEvent} from '../utils'
import {useEventListener, useThrottleFn} from '@vueuse/core'

export const fadeBaseTransitionProps = {
  name: 'fade',
  enterActiveClass: '',
  enterFromClass: 'showing',
  enterToClass: '',
  leaveActiveClass: '',
  leaveFromClass: '',
  leaveToClass: 'showing',
  css: true,
}

interface TransitionProps {
  onBeforeEnter?: (el: Element) => void
  onEnter?: (el: Element) => void
  onAfterEnter?: (el: Element) => void
  onBeforeLeave?: (el: Element) => void
  onLeave?: (el: Element) => void
  onAfterLeave?: (el: Element) => void
  enterToClass?: string
  leaveToClass?: string
  enterFromClass?: string
  leaveFromClass?: string
  enterActiveClass?: string
  leaveActiveClass?: string
}

export const useShowHide = (
  modelValue: Ref<boolean | number>,
  props: {
    visible?: boolean
    show?: boolean
    noAnimation?: boolean
    noFade?: boolean
    noCloseOnBackdrop?: boolean
    noCloseOnEsc?: boolean
    transitionProps?: TransitionProps
    lazy?: boolean
    initialAnimation?: boolean
    delay?:
      | number
      | {
          show: number
          hide: number
        }
  } & Record<string, unknown>,
  emit: EmitFn,
  element: Ref<HTMLElement | null>,
  computedId: Ref<string>,
  options: {
    transitionProps?: TransitionProps
    showFn?: () => void
    hideFn?: () => void
  } = {
    transitionProps: {},
    showFn: () => {},
    hideFn: () => {},
  }
) => {
  let noAction = false
  const initialShow = (!!modelValue.value && !props.initialAnimation) || props.visible || false
  const showRef = ref<boolean>(false)
  const renderRef = ref<boolean>(initialShow)
  const renderBackdropRef = ref<boolean>(initialShow)

  let isCountdown = typeof modelValue.value !== 'boolean'

  watch(modelValue, () => {
    isCountdown = typeof modelValue.value !== 'boolean'
    if (noAction) {
      noAction = false
      return
    }
    if (modelValue.value) {
      show()
    } else {
      hide()
    }
  })

  const localNoAnimation = ref(initialShow)
  const localTemporaryHide = ref(false)
  const computedNoAnimation = computed(
    () => props.noAnimation || props.noFade || localNoAnimation.value || false
  )
  onMounted(() => {
    if (!props.show && initialShow) {
      // show without delay or animation
      const event = buildTriggerableEvent('show', {cancelable: true})
      emit('show', event)

      if (event.defaultPrevented) {
        emit('show-prevented', buildTriggerableEvent('show-prevented'))
        return
      }
      localNoAnimation.value = true
      if (!modelValue.value) {
        noAction = true
        modelValue.value = true
      }
      renderRef.value = true
      renderBackdropRef.value = true
      isVisible.value = true
      backdropVisible.value = true
      backdropReady.value = true
      showRef.value = true
      options.showFn?.()
    } else if (props.show || (!!modelValue.value && props.initialAnimation)) {
      show()
    }
  })

  watch(
    () => props.visible,
    (newval) => {
      localNoAnimation.value = true

      nextTick(() => {
        if (newval) isVisible.value = true
        if (newval) {
          show()
        } else {
          hide()
        }
      })
    }
  )
  watch(
    () => props.show,
    (newval) => {
      if (newval) {
        show()
      } else {
        hide()
      }
    }
  )
  // todo: remove
  useEventListener(element, 'bv-toggle', () => {
    modelValue.value = !modelValue.value
  })

  const buildTriggerableEvent = (
    type: string,
    opts: Readonly<Partial<BvTriggerableEvent>> = {}
  ): BvTriggerableEvent =>
    new BvTriggerableEvent(type, {
      cancelable: false,
      target: element?.value || null,
      relatedTarget: null,
      trigger: null,
      ...opts,
      componentId: computedId?.value,
    })

  let showTimeout: ReturnType<typeof setTimeout> | undefined

  const show = () => {
    if (showRef.value) return
    const event = buildTriggerableEvent('show', {cancelable: true})
    emit('show', event)

    if (event.defaultPrevented) {
      emit('show-prevented', buildTriggerableEvent('show-prevented'))
      if (isVisible.value) {
        isVisible.value = false
      }
      if (modelValue.value && !isCountdown) {
        noAction = true
        nextTick(() => {
          modelValue.value = false
        })
      }
      return
    }
    renderRef.value = true
    renderBackdropRef.value = true
    requestAnimationFrame(() => {
      if (localNoAnimation.value || props.delay === undefined) {
        showRef.value = true
        options.showFn?.()
        if (!modelValue.value) {
          noAction = true
          nextTick(() => {
            modelValue.value = true
          })
        }
        return
      }
      showTimeout = setTimeout(
        () => {
          showRef.value = true
          options.showFn?.()
          if (!modelValue.value) {
            noAction = true
            nextTick(() => {
              modelValue.value = true
            })
          }
        },
        typeof props.delay === 'number' ? props.delay : props.delay?.show || 0
      )
    })
  }

  let leaveTrigger: string | undefined
  const hide = (trigger?: string) => {
    if (!showRef.value) return
    if (typeof trigger !== 'string') trigger = undefined
    leaveTrigger = trigger
    const event = buildTriggerableEvent('hide', {cancelable: true, trigger})
    const event2 = buildTriggerableEvent(trigger || 'ignore', {cancelable: true, trigger})
    if (
      (trigger === 'backdrop' && props.noCloseOnBackdrop) ||
      (trigger === 'esc' && props.noCloseOnEsc)
    ) {
      emit('hide-prevented', buildTriggerableEvent('hide-prevented', {trigger}))
      return
    }
    if (showTimeout) {
      clearTimeout(showTimeout)
      showTimeout = undefined
    }
    if (trigger) {
      emit(trigger, event2)
    }
    emit('hide', event)

    if (event.defaultPrevented || event2.defaultPrevented) {
      emit('hide-prevented', buildTriggerableEvent('hide-prevented', {trigger}))
      if (!modelValue.value) {
        nextTick(() => {
          noAction = true
          modelValue.value = true
        })
      }
      return
    }
    trapActive.value = false
    setTimeout(
      () => {
        isLeaving.value = true
        showRef.value = false
        options.hideFn?.()
        if (modelValue.value) {
          noAction = true
          modelValue.value = isCountdown ? 0 : false
        }
      },
      localNoAnimation.value
        ? 0
        : typeof props.delay === 'number'
          ? props.delay
          : props.delay?.hide || 0
    )
  }
  const throttleHide = useThrottleFn((a) => hide(a), 500)
  const throttleShow = useThrottleFn(() => show(), 500)

  const toggle = () => {
    const e = buildTriggerableEvent('toggle', {cancelable: true})
    emit('toggle', e)
    if (e.defaultPrevented) {
      emit('toggle-prevented', buildTriggerableEvent('toggle-prevented'))
      return
    }
    if (showRef.value) {
      hide()
    } else {
      show()
    }
  }
  const triggerRegistry: {trigger: string; el: Element}[] = []
  const registerTrigger = (trigger: string, el: Element) => {
    triggerRegistry.push({trigger, el})
    el.addEventListener(trigger, toggle)
    checkVisibility(el)
  }
  const unregisterTrigger = (trigger: string, el: Element, clean = true) => {
    const idx = triggerRegistry.findIndex((t) => t?.trigger === trigger && t.el === el)
    if (idx > -1) {
      triggerRegistry.splice(idx, 1)
      el.removeEventListener(trigger, toggle)
      if (clean) {
        el.removeAttribute('aria-expanded')
        el.classList.remove('collapsed')
        el.classList.remove('not-collapsed')
      }
    }
  }

  const appRegistry = inject(
    globalShowHideStorageInjectionKey,
    undefined
  )?.({
    id: computedId.value,
    toggle,
    show,
    hide,
    value: readonly(showRef),
    registerTrigger,
    unregisterTrigger,
  })
  const checkVisibility = (el: Element) => {
    el.setAttribute('aria-expanded', modelValue.value ? 'true' : 'false')
    el.classList.toggle('collapsed', !modelValue.value)
    el.classList.toggle('not-collapsed', !!modelValue.value)
  }

  watch(modelValue, () => {
    triggerRegistry.forEach((t) => {
      checkVisibility(t.el)
    })
  })

  onBeforeUnmount(() => {
    appRegistry?.unregister()
    triggerRegistry.forEach((t) => {
      t.el.removeEventListener(t.trigger, toggle)
    })
  })

  const lazyLoadCompleted = ref(false)
  const markLazyLoadCompleted = () => {
    if (props.lazy === true) lazyLoadCompleted.value = true
  }

  const isLeaving = ref(false)
  const isActive = ref(false)
  const isVisible = ref(false)

  const onBeforeEnter = (el: Element) => {
    options.transitionProps?.onBeforeEnter?.(el)
    props.transitionProps?.onBeforeEnter?.(el)
    isActive.value = true
  }
  const onEnter = (el: Element) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // sometimes one just isn't enough (offcanvas on the first load after refresh)
        isVisible.value = true
      })
    })
    options.transitionProps?.onEnter?.(el)
    props.transitionProps?.onEnter?.(el)
  }
  const onAfterEnter = (el: Element) => {
    emit('shown', buildTriggerableEvent('shown'))
    markLazyLoadCompleted()
    options.transitionProps?.onAfterEnter?.(el)
    props.transitionProps?.onAfterEnter?.(el)
    if (localNoAnimation.value) {
      requestAnimationFrame(() => {
        localNoAnimation.value = false
      })
    }
    if (localTemporaryHide.value) {
      localTemporaryHide.value = false
    }
    requestAnimationFrame(() => {
      trapActive.value = true
    })
  }
  const onBeforeLeave = (el: Element) => {
    if (!isLeaving.value) isLeaving.value = true
    options.transitionProps?.onBeforeLeave?.(el)
    props.transitionProps?.onBeforeLeave?.(el)
    trapActive.value = false
  }
  const onLeave = (el: Element) => {
    isVisible.value = false
    options.transitionProps?.onLeave?.(el)
    props.transitionProps?.onLeave?.(el)
  }
  const onAfterLeave = (el: Element) => {
    emit('hidden', buildTriggerableEvent('hidden', {trigger: leaveTrigger}))
    options.transitionProps?.onAfterLeave?.(el)
    props.transitionProps?.onAfterLeave?.(el)
    isLeaving.value = false
    isActive.value = false
    if (localNoAnimation.value) {
      requestAnimationFrame(() => {
        localNoAnimation.value = false
      })
    }
    requestAnimationFrame(() => {
      if (!localTemporaryHide.value) renderRef.value = false
    })
  }

  const contentShowing = computed(
    () =>
      localTemporaryHide.value === true ||
      isActive.value === true ||
      props.lazy === false ||
      (props.lazy === true && lazyLoadCompleted.value === true && props.unmountLazy === false)
  )
  const trapActive = ref(false)
  const backdropVisible = ref(false)
  const backdropReady = ref(false)

  const transitionFunctions = {
    ...options.transitionProps,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
  }
  return {
    showRef,
    renderRef,
    renderBackdropRef,
    isVisible,
    isActive,
    trapActive,
    show,
    hide,
    toggle,
    throttleHide,
    throttleShow,
    buildTriggerableEvent,
    computedNoAnimation,
    localNoAnimation,
    localTemporaryHide,
    isLeaving,
    transitionProps: {
      ...fadeBaseTransitionProps,
      ...props.transitionProps,
      ...transitionFunctions,
    },

    lazyLoadCompleted,
    markLazyLoadCompleted,
    contentShowing,
    backdropReady,
    backdropVisible,
    backdropTransitionProps: {
      ...fadeBaseTransitionProps,
      onBeforeEnter: () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            backdropVisible.value = true
          })
        })
        backdropReady.value = false
      },
      onAfterEnter: () => {
        backdropReady.value = true
      },
      onBeforeLeave: () => {
        backdropVisible.value = false
      },
      onAfterLeave: () => {
        backdropReady.value = false
        requestAnimationFrame(() => {
          renderBackdropRef.value = false
        })
      },
    },
  }
}
