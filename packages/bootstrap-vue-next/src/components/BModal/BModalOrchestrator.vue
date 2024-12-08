<template>
  <ConditionalTeleport :to="props.teleportTo" :disabled="props.teleportDisabled">
    <div id="__BVID__modal-container" v-bind="$attrs">
      <component
        :is="_component ?? BModal"
        v-for="[self, {component: _component, promise, isConfirm, slots, ...val}] in tools.modals
          ?.value"
        :key="self"
        v-bind="val"
        initial-animation
        :teleport-disabled="true"
        @hide="
          (e: BvTriggerableEvent) => {
            // These following are confirm rules, otherwise we always resolve true
            if (isConfirm === true) {
              if (e.trigger === 'ok') {
                promise.resolve(true)
                return
              }
              if (e.trigger === 'cancel') {
                promise.resolve(false)
                return
              }
              promise.resolve(null)
            }
            promise.resolve(true)
          }
        "
        @hidden="tools.remove?.(self)"
      >
        <template v-for="(comp, slot) in slots" #[slot]="scope" :key="slot">
          <component :is="comp" v-bind="scope" />
        </template>
      </component>
    </div>
  </ConditionalTeleport>
</template>

<script setup lang="ts">
import type {BvTriggerableEvent} from '../../utils'
import {useDefaults} from '../../composables/useDefaults'
import type {BModalOrchestratorProps} from '../../types/ComponentProps'
import BModal from './BModal.vue'
import ConditionalTeleport from '../ConditionalTeleport.vue'
import {useModalController} from '../../composables/useModalController'

defineOptions({
  inheritAttrs: false,
})

const _props = withDefaults(defineProps<BModalOrchestratorProps>(), {
  teleportDisabled: false,
  teleportTo: 'body',
})
const props = useDefaults(_props, 'BModalOrchestrator')

const tools = useModalController()

defineExpose({
  ...tools,
})
</script>
