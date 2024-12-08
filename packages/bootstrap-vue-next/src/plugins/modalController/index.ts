import {isReadonly, isRef, markRaw, type Plugin, ref, type Ref, toRef, toValue, watch} from 'vue'
import {modalControllerPluginKey} from '../../utils/keys'
import type {
  ControllerKey,
  ModalOrchestratorMapValue,
  ModalOrchestratorShowParam,
} from '../../types/ComponentOrchestratorTypes'

export const modalControllerPlugin: Plugin = {
  install(app) {
    const modals = ref(new Map<ControllerKey, ModalOrchestratorMapValue>())

    const buildPromise = (): {
      value: Promise<boolean | null>
      resolve: (value: boolean | null) => void
    } => {
      let resolveFunc: (value: boolean | null) => void = () => {
        /* empty */
      }

      const promise = new Promise<boolean | null>((resolve) => {
        resolveFunc = resolve
      })

      return {
        value: promise,
        resolve: resolveFunc,
      }
    }

    const create = (
      obj: ModalOrchestratorShowParam = {},
      isConfirm: boolean
    ): Promise<boolean | null> => {
      // if (isRef(obj)) obj.value.modelValue = ref(true)
      // else if (typeof obj === 'object') obj.modelValue = ref(true)
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
      const _self = resolvedProps.value?.id || Symbol('Modals controller')

      const promise = buildPromise()

      const stop = watch(
        resolvedProps,
        (newValue) => {
          const previous = modals.value.get(_self)
          // if (!previous) return
          const v = {
            ...(previous || {}),
          }

          if (newValue.props) {
            Object.assign(v, newValue.props)
            delete newValue.props
          }
          for (const key in newValue) {
            v[key as keyof ModalOrchestratorShowParam] = toValue(
              newValue[key as keyof ModalOrchestratorShowParam]
            )
          }
          modals.value.set(_self, {
            ...v,
            ...(v.modelValue === undefined && {modelValue: true}),
            // 'component': !v.component ? undefined : markRaw(v.component),

            'onUpdate:modelValue': (val: boolean) => {
              newValue['onUpdate:modelValue']?.(val)
              const {modelValue} = toValue(obj)
              if (isRef(obj) && !isRef(modelValue)) obj.value.modelValue = val
              if (isRef(modelValue) && !isReadonly(modelValue)) {
                ;(modelValue as Ref<ModalOrchestratorMapValue['modelValue']>).value = val
              }
              if (val === false) {
                stop()
                modals.value.delete(_self)
              }
            },
            isConfirm,
            promise,
          })
        },
        {
          immediate: true,
          deep: true,
        }
      )

      return promise.value
    }
    const show = (obj: ModalOrchestratorShowParam = {}): Promise<boolean | null> =>
      create(obj, false)
    const confirm = (obj: ModalOrchestratorShowParam = {}): Promise<boolean | null> =>
      create(obj, true)

    /**
     * You can get the symbol param from the return value from the show method, or use props.id
     */
    const leave = (self: ControllerKey) => {
      const modal = modals.value.get(self)

      if (!modal) return
      modal['onUpdate:modelValue']?.(false)
    }

    /**
     * You can get the symbol param from the return value from the show method, or use props.id
     */
    const remove = (self: ControllerKey) => {
      modals.value.delete(self)
    }

    app.provide(modalControllerPluginKey, {
      modals,
      remove,
      show,
      confirm,
      leave,
    })
  },
}
