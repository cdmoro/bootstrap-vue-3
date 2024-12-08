import {computed, type Plugin, reactive, readonly} from 'vue'
import {
  globalShowHideStorageInjectionKey,
  type RegisterShowHideFnInput,
  type RegisterShowHideMapValue,
} from '../../utils/keys'

export const showHidePlugin: Plugin = {
  install(app) {
    const values: Record<string, RegisterShowHideMapValue> = reactive({})

    const fun = ({
      id,
      value,
      toggle,
      show,
      hide,
      registerTrigger,
      unregisterTrigger,
    }: RegisterShowHideFnInput) => {
      values[id] = computed(() => ({
        value: value.value,
        toggle,
        show,
        hide,
        registerTrigger,
        unregisterTrigger,
      })) as unknown as RegisterShowHideMapValue
      return {
        unregister() {
          delete values[id]
        },
      }
    }

    fun.map = readonly(values)
    app.provide(globalShowHideStorageInjectionKey, fun)
  },
}
