<template>
  <li class="nav-item dropdown">
    <BDropdown
      ref="_dropdown"
      v-bind="props"
      v-model="modelValue"
      is-nav
      @show="emit('show', $event)"
      @shown="emit('shown', $event)"
      @hide="emit('hide', $event)"
      @hidden="emit('hidden', $event)"
      @hide-prevented="emit('hide-prevented', $event)"
      @show-prevented="emit('show-prevented', $event)"
      @toggle-prevented="emit('toggle-prevented', $event)"
      @toggle="emit('toggle', $event)"
      @click="emit('click', $event)"
    >
      <template #button-content>
        <slot name="button-content" />
      </template>
      <template #toggle-text>
        <slot name="toggle-text" />
      </template>
      <template #default>
        <slot :hide="hide" :show="show" />
      </template>
    </BDropdown>
  </li>
</template>

<script setup lang="ts">
import {useTemplateRef} from 'vue'
import BDropdown from '../BDropdown/BDropdown.vue'
import type {BDropdownProps} from '../../types/ComponentProps'
import {useDefaults} from '../../composables/useDefaults'
import type {BDropdownEmits} from '../../types/ComponentEmits'

const _props = withDefaults(defineProps<Omit<BDropdownProps, 'modelValue'>>(), {
  ariaLabel: undefined,
  autoClose: true,
  block: false,
  boundary: 'clippingAncestors',
  boundaryPadding: undefined,
  teleportTo: undefined,
  teleportDisabled: false,
  disabled: false,
  floatingMiddleware: undefined,
  id: undefined,
  initialAnimation: false,
  isNav: true,
  lazy: false,
  menuClass: undefined,
  noCaret: false,
  noFlip: false,
  noShift: false,
  noSize: false,
  offset: 0,
  role: 'menu',
  size: 'md',
  split: false,
  splitButtonType: 'button',
  splitClass: undefined,
  splitDisabled: undefined,
  splitHref: undefined,
  splitTo: undefined,
  splitVariant: undefined,
  placement: undefined,
  noWrapper: undefined,
  wrapperClass: undefined,
  strategy: 'absolute',
  text: undefined,
  toggleClass: undefined,
  toggleText: 'Toggle dropdown',
  variant: 'link',
})
const props = useDefaults(_props, 'BNavItemDropdown')

const emit = defineEmits<BDropdownEmits>()

const modelValue = defineModel<Exclude<BDropdownProps['modelValue'], undefined>>({default: false})

defineSlots<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'button-content'?: (props: Record<string, never>) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'default'?: (props: {hide: () => void; show: () => void}) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'toggle-text'?: (props: Record<string, never>) => any
}>()
const dropdown = useTemplateRef<InstanceType<typeof BDropdown>>('_dropdown')

const hide = () => {
  dropdown.value?.hide()
}
const show = () => {
  dropdown.value?.show()
}
const toggle = () => {
  dropdown.value?.toggle()
}

defineExpose({
  hide,
  show,
  toggle,
})
</script>
