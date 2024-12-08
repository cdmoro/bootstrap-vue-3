import {
  isReadonly,
  isRef,
  markRaw,
  onScopeDispose,
  type Plugin,
  type Ref,
  ref,
  toRef,
  toValue,
  watch,
} from 'vue'
import {popoverPluginKey} from '../../utils/keys'
import type {
  ControllerKey,
  PopoverOrchestratorMapValue,
  PopoverOrchestratorParam,
  PopoverOrchestratorShowParam,
  TooltipOrchestratorMapValue,
  TooltipOrchestratorParam,
  TooltipOrchestratorShowParam,
} from '../../types/ComponentOrchestratorTypes'

export const popoverPlugin: Plugin = {
  install(app) {
    const popovers = ref(new Map<ControllerKey, PopoverOrchestratorMapValue>())
    /**
     * @returns {ControllerKey} If `id` is passed to props, it will use that id, otherwise,
     * a symbol will be created that corresponds to its unique id.
     */
    const popover = (obj: PopoverOrchestratorShowParam): ControllerKey => {
      const {component, slots} = toValue(obj)
      if (component) {
        if (isRef(obj)) obj.value.component = markRaw(component)
        else if (typeof obj === 'object') obj.component = markRaw(component)
      }
      if (slots) {
        if (isRef(obj)) obj.value.slots = markRaw(slots)
        else if (typeof obj === 'object') obj.slots = markRaw(slots)
      }
      const resolvedProps = toRef(obj)
      const _self = resolvedProps.value?.id || Symbol('Popover controller')

      const stop = watch(
        resolvedProps,
        (newValue) => {
          const previous = popovers.value.get(_self)
          // if (!previous) return
          const v = {
            ...(previous || {}),
          }

          for (const key in newValue) {
            v[key as keyof PopoverOrchestratorShowParam] = toValue(
              newValue[key as keyof PopoverOrchestratorShowParam]
            )
          }
          popovers.value.set(_self, {
            ...v,
            ...(typeof toValue(newValue['modelValue']) !== 'undefined' &&
            (isRef(obj) || isRef(toValue(obj).modelValue))
              ? {
                  'onUpdate:modelValue': (val: boolean) => {
                    newValue['onUpdate:modelValue']?.(val)
                    const {modelValue} = toValue(obj)
                    if (isRef(obj) && !isRef(modelValue)) obj.value.modelValue = val
                    if (isRef(modelValue) && !isReadonly(modelValue)) {
                      ;(modelValue as Ref<PopoverOrchestratorParam['modelValue']>).value = val
                    }
                  },
                }
              : {}),
          })
        },
        {
          immediate: true,
          deep: true,
        }
      )
      popovers.value.set(_self, {
        ...popovers.value.get(_self),
        stop,
      })
      onScopeDispose(() => removePopover(_self), true)

      return _self
    }
    /**
     * @param {ControllerKey} self You can get the symbol param from the return value from the show method, or use props.id
     */
    const setPopover = (self: ControllerKey, val: Partial<PopoverOrchestratorParam>) => {
      const popover = popovers.value.get(self)
      if (!popover) return
      const v = toValue(val)
      popovers.value.set(self, {
        ...popover,
        ...v,

        title: toValue(v.title),
        body: toValue(v.body),
        modelValue: toValue(v.modelValue),
      })
    }
    /**
     * @param {ControllerKey} self You can get the symbol param from the return value from the show method, or use props.id
     */
    const removePopover = (self: ControllerKey) => {
      const popover = popovers.value.get(self)
      if (!popover) return
      popover.stop?.()
      popovers.value.delete(self)
    }

    const tooltips = ref(new Map<ControllerKey, TooltipOrchestratorMapValue>())
    /**
     * @returns {ControllerKey} If `id` is passed to props, it will use that id, otherwise,
     * a symbol will be created that corresponds to its unique id.
     */
    const tooltip = (obj: TooltipOrchestratorShowParam): ControllerKey => {
      const {component, slots} = toValue(obj)
      if (component) {
        if (isRef(obj)) obj.value.component = markRaw(component)
        else if (typeof obj === 'object') obj.component = markRaw(component)
      }
      if (slots) {
        if (isRef(obj)) obj.value.slots = markRaw(slots)
        else if (typeof obj === 'object') obj.slots = markRaw(slots)
      }
      const resolvedProps = toRef(obj)
      const _self = resolvedProps.value?.id || Symbol('Tooltip controller')

      const stop = watch(
        resolvedProps,
        (newValue) => {
          const previous = tooltips.value.get(_self)
          // if (!previous) return
          const v = {
            ...(previous || {}),
          }

          for (const key in newValue) {
            v[key as keyof TooltipOrchestratorShowParam] = toValue(
              newValue[key as keyof TooltipOrchestratorShowParam]
            )
          }
          tooltips.value.set(_self, {
            ...v,
            ...(typeof toValue(newValue['modelValue']) !== 'undefined' &&
            (isRef(obj) || isRef(toValue(obj).modelValue))
              ? {
                  'onUpdate:modelValue': (val: boolean) => {
                    newValue['onUpdate:modelValue']?.(val)
                    const {modelValue} = toValue(obj)
                    if (isRef(obj) && !isRef(modelValue)) obj.value.modelValue = val
                    if (isRef(modelValue) && !isReadonly(modelValue)) {
                      ;(modelValue as Ref<TooltipOrchestratorParam['modelValue']>).value = val
                    }
                  },
                }
              : {}),
          })
        },
        {
          immediate: true,
          deep: true,
        }
      )

      tooltips.value.set(_self, {
        ...tooltips.value.get(_self),
        stop,
      })
      onScopeDispose(() => removeTooltip(_self), true)

      return _self
    }
    /**
     * @param {ControllerKey} self You can get the symbol param from the return value from the show method, or use props.id
     */
    const setTooltip = (self: ControllerKey, val: Partial<TooltipOrchestratorParam>) => {
      const tooltip = tooltips.value.get(self)
      if (!tooltip) return
      const v = toValue(val)
      tooltips.value.set(self, {
        ...tooltip,
        ...v,
        title: toValue(v.title),
        body: toValue(v.body),
        modelValue: toValue(v.modelValue),
      })
    }
    /**
     * @param {ControllerKey} self You can get the symbol param from the return value from the show method, or use props.id
     */
    const removeTooltip = (self: ControllerKey) => {
      const tooltip = tooltips.value.get(self)
      if (!tooltip) return
      tooltip.stop?.()
      tooltips.value.delete(self)
    }

    app.provide(popoverPluginKey, {
      popovers,
      tooltips,
      tooltip,
      popover,
      setPopover,
      setTooltip,
      removePopover,
      removeTooltip,
    })
  },
}
