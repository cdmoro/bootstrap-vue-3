import {inject, ref} from 'vue'
import {useSharedModalStack} from '../useModalManager'
import {modalControllerPluginKey} from '../../utils/keys'

export const useModalController = () => {
  const {lastStack, stack} = useSharedModalStack()
  const noop = () => {}
  const noopPromise = () => Promise.resolve(null)
  const modalControllerPlugin = inject(modalControllerPluginKey, {
    modals: ref(new Map()),
    show: noopPromise,
    confirm: noopPromise,
    remove: noop,
    leave: noop,
  })
  if (modalControllerPlugin.leave === noop) {
    throw Error(
      'useModalController() was called outside of the setup() function! or the plugin is not provided.'
    )
  }

  const hide = (trigger = '') => {
    if (lastStack?.value) {
      lastStack?.value.exposed?.hide(trigger)
    }
  }

  const hideAll = (trigger = '') => {
    stack?.value.forEach((modal) => {
      modal.exposed?.hide(trigger)
    })
  }

  return {
    ...modalControllerPlugin,
    hide,
    hideAll,
    // Todo: Supports listening events globally in the future
  }
}
