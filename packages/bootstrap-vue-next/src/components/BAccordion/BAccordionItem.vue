<template>
  <div class="accordion-item" v-bind="props.wrapperAttrs" :class="wrapperClass">
    <BCollapse
      :id="computedId"
      v-model="modelValue"
      class="accordion-collapse"
      :class="props.collapseClass"
      :aria-labelledby="`${computedId}-heading`"
      v-bind="collapseAttrs"
      :tag="props.tag"
      :show="props.show"
      :horizontal="props.horizontal"
      :visible="props.visible"
      :is-nav="props.isNav"
      :lazy="props.lazy || parentData?.lazy.value"
      :unmount-lazy="props.unmountLazy || parentData?.unmountLazy.value"
      @show="emit('show', $event)"
      @shown="emit('shown', $event)"
      @hide="emit('hide', $event)"
      @hidden="emit('hidden', $event)"
      @hide-prevented="emit('hide-prevented', $event)"
      @show-prevented="emit('show-prevented', $event)"
      @toggle-prevented="emit('toggle-prevented', $event)"
      @toggle="emit('toggle', $event)"
    >
      <template #header="{visible: toggleVisible, toggle: slotToggle}">
        <component
          :is="props.headerTag"
          :id="`${computedId}-heading`"
          class="accordion-header"
          :class="props.headerClass"
          v-bind="props.headerAttrs"
        >
          <button
            class="accordion-button"
            v-bind="props.buttonAttrs"
            :class="[{collapsed: !toggleVisible}, props.buttonClass]"
            type="button"
            :aria-expanded="toggleVisible ? 'true' : 'false'"
            :aria-controls="computedId"
            @click="slotToggle"
          >
            <slot name="title"> {{ props.title }} </slot>
          </button>
        </component>
      </template>
      <div class="accordion-body" v-bind="props.bodyAttrs" :class="props.bodyClass">
        <slot />
      </div>
    </BCollapse>
  </div>
</template>

<script setup lang="ts">
import {inject, nextTick, onMounted, useAttrs, watch} from 'vue'
import BCollapse from '../BCollapse/BCollapse.vue'
import {accordionInjectionKey} from '../../utils/keys'
import {useDefaults} from '../../composables/useDefaults'
import {useId} from '../../composables/useId'
import type {BAccordionItemProps} from '../../types/ComponentProps'
import type {BCollapseEmits} from '../../types/ComponentEmits'

defineOptions({
  inheritAttrs: false,
})
const {class: wrapperClass, ...collapseAttrs} = useAttrs()

const _props = withDefaults(defineProps<Omit<BAccordionItemProps, 'modelValue'>>(), {
  bodyAttrs: undefined,
  bodyClass: undefined,
  buttonAttrs: undefined,
  buttonClass: undefined,
  collapseClass: undefined,
  headerAttrs: undefined,
  headerClass: undefined,
  headerTag: 'h2',
  horizontal: undefined,
  id: undefined,
  isNav: undefined,
  lazy: false,
  unmountLazy: false,
  tag: undefined,
  title: undefined,
  show: undefined,
  visible: false,
  wrapperAttrs: undefined,
})
const props = useDefaults(_props, 'BAccordionItem')

const emit = defineEmits<BCollapseEmits>()

defineSlots<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default?: (props: Record<string, never>) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title?: (props: Record<string, never>) => any
}>()

const parentData = inject(accordionInjectionKey, null)

const computedId = useId(() => props.id, 'accordion_item')

const modelValue = defineModel<Exclude<BAccordionItemProps['modelValue'], undefined>>({
  default: false,
})

modelValue.value =
  parentData?.openItem.value === computedId.value && !parentData?.initialAnimation.value

if (modelValue.value && !parentData?.free.value) {
  parentData?.setOpenItem(computedId.value)
}

onMounted(() => {
  if (!modelValue.value && parentData?.openItem.value === computedId.value) {
    nextTick(() => {
      modelValue.value = true
    })
  }
})

watch(
  () => parentData?.openItem.value,
  () =>
    (modelValue.value = parentData?.openItem.value === computedId.value && !parentData?.free.value)
)
watch(modelValue, () => {
  if (modelValue.value && !parentData?.free.value) parentData?.setOpenItem(computedId.value)
})
</script>
