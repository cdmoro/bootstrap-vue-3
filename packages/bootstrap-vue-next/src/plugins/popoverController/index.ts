import {isRef, markRaw, onScopeDispose, type Plugin, ref, toRef, toValue, watch} from 'vue'
import {popoverPluginKey} from '../../utils/keys'
import type {
  ControllerKey,
  PopoverOrchestratorParam,
  PopoverOrchestratorShowParam,
  PrivateOrchestratedTooltip,
  TooltipOrchestratorMapValue,
  TooltipOrchestratorShowParam,
} from '../../types/ComponentOrchestratorTypes'

export const popoverPlugin: Plugin = {
  install(app) {
    const popovers = ref(new Map<ControllerKey, PopoverOrchestratorParam>())
    /**
     * @returns {ControllerKey} If `id` is passed to props, it will use that id, otherwise,
     * a symbol will be created that corresponds to its unique id.
     */
    const popover = (obj: PopoverOrchestratorShowParam): ControllerKey => {
      const resolvedProps = toRef(obj)
      const _self = resolvedProps.value?.id || Symbol('Popover controller')

      watch(
        resolvedProps,
        (newValue) => {
          popovers.value.set(_self, {
            ...newValue,
            ...(typeof newValue['modelValue'] !== 'undefined' && isRef(obj)
              ? {
                  'onUpdate:modelValue': (val: boolean) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: How to add emit types?
                    newValue['onUpdate:modelValue']?.(val)
                    obj.value.modelValue = val
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
      onScopeDispose(() => popovers.value.delete(_self), true)

      return _self
    }
    /**
     * @param {ControllerKey} self You can get the symbol param from the return value from the show method, or use props.id
     */
    const setPopover = (self: ControllerKey, val: Partial<PopoverOrchestratorParam>) => {
      const popover = popovers.value.get(self)
      if (!popover) return
      popovers.value.set(self, {
        ...popover,
        ...toValue(val),
      })
    }
    /**
     * @param {ControllerKey} self You can get the symbol param from the return value from the show method, or use props.id
     */
    const removePopover = (self: ControllerKey) => popovers.value.delete(self)

    const tooltips = ref(new Map<ControllerKey, TooltipOrchestratorMapValue>())
    /**
     * @returns {ControllerKey} If `id` is passed to props, it will use that id, otherwise,
     * a symbol will be created that corresponds to its unique id.
     */
    const tooltip = (obj: TooltipOrchestratorShowParam): ControllerKey => {
      const resolvedProps = toRef(obj.props)
      const reference = toRef(obj.target)

      const _self = resolvedProps.value?.id || Symbol('Tooltip controller')

      watch(
        reference,
        (newValue) => {
          if (!newValue) {
            tooltips.value.delete(_self)
          } else {
            tooltips.value.set(_self, {
              component: !obj.component ? undefined : markRaw(obj.component),
              props: {...resolvedProps.value, _modelValue: false, _target: newValue},
            })
          }
        },
        {
          immediate: true,
        }
      )

      watch(resolvedProps, (newValue) => {
        const previous = tooltips.value.get(_self)
        if (!previous) return
        tooltips.value.set(_self, {
          component: !obj.component ? undefined : markRaw(obj.component),
          props: {...previous.props, ...newValue},
        })
      })
      onScopeDispose(() => tooltips.value.delete(_self), true)

      return _self
    }
    /**
     * @param {ControllerKey} self You can get the symbol param from the return value from the show method, or use props.id
     */
    const setTooltip = (self: ControllerKey, val: Partial<PrivateOrchestratedTooltip>) => {
      const tip = tooltips.value.get(self)
      if (!tip?.props) return
      tip.props = {
        ...tip.props,
        ...val,
      }
    }
    /**
     * @param {ControllerKey} self You can get the symbol param from the return value from the show method, or use props.id
     */
    const removeTooltip = (self: ControllerKey) => tooltips.value.delete(self)

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
