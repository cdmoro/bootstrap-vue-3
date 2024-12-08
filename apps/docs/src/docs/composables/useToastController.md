<ComposableHeader path="useToastController/index.ts" title="useToastController" />

<ContentsSidebar>

[[toc]]

</ContentsSidebar>
<div class="lead mb-5">

Often times one may want to open a `Toast` in a global context, without the need for declaring a component, perhaps to display an error after a function threw an error. `useToastController` is used to create `Toasts` on demand. You must have initialized the `BToastOrchestrator` component once in your application. The following functionality requires the existance of that component

</div>

<UsePluginAlert />

## BToastOrchestrator

You must have initialized `BToastOrchestrator` component once and only once (doing multiple may display multiple `Toasts`). This is usually best placed at the App root.

<HighlightCard>

<template #html>

```vue-html
<BToastOrchestrator />
```

  </template>
</HighlightCard>

The only props it access are `teleportDisabled` and `teleportTo` to modify the location that it is placed

In addition, it contains a few exposed methods. These exposed methods on the `template ref` correspond to those in the `useToastController` function, described below

- remove
- show
- toasts

## Showing a Toast

Showing a toast is done through the show method

<HighlightCard>
  <BButton @click="show({  title: 'Hello', body: 'World'  })">Show</BButton>
  <template #html>

```vue
<template>
  <BButton @click="show({title: 'Hello', body: 'World'})">Show</BButton>
</template>

<script setup lang="ts">
const {show} = useToastController()
</script>
```

  </template>
</HighlightCard>

The `show` method returns a `promise` that is resolved then the toast closes. You can give toast a unique id. Since `Toasts` are fluid and can move around a lot, returning the index at a given point in time is not ideal for as its position may be changed in the array. So, for use with the `remove` method, you need to give a unique identifier

### Show Options

The `show` method accepts an object with the following values `props` and `component`

The props property corresponds to mostly that of the `BToast` components props. The props object, in addition to the props declared on `BToast`, includes `position`. The `position` value effects its position, its type is [Container Position](/docs/types#containerposition)

### Reactivity Within Show

`show` props property can accept a `MaybeRefOrGetter`, meaning that you can make properties reactive

<HighlightCard>
  <BButton @click="showReactiveExample">Show</BButton>
  <template #html>

```vue
<template>
  <BButton @click="showMe">Show</BButton>
</template>

<script setup lang="ts">
const {show} = useToastController()

const firstRef = ref<OrchestratedToast>({
  body: `${Math.random()}`,
})
onMounted(() => {
  setInterval(() => {
    firstRef.value.body = `${Math.random()}`
  }, 1000)
})

const showMe = () => {
  show(
    computed(() => ({
      ...firstRef.value,
      variant: (Number.parseInt(firstRef.value.body?.charAt(2) ?? '0') % 2 === 0
        ? 'danger'
        : 'info') as ColorVariant,
    }))
  )
}
</script>
```

  </template>
</HighlightCard>

### Advanced usage

Using props can work for most situations, but it leaves some finer control to be desired. For instance, you can add HTML to any `slot` value. This can either be an imported SFC or an inline render function. For reactvity, you must use a getter function.

<HighlightCard>
  <BButton @click="showMeAdvancedExample">Show</BButton>
  <template #html>

```vue
<template>
  <BButton @click="showMe">Show</BButton>
</template>

<script setup lang="ts">
import {BToast} from 'bootstrap-vue-next'

const {show} = useToastController()

const firstRef = ref<OrchestratedToast>({
  body: `${Math.random()}`,
})

onMounted(() => {
  setInterval(() => {
    firstRef.value.body = `${Math.random()}`
  }, 1000)
})

const showMe = () => {
  show({
    body: firstRef.value.body,
    slots: {default: () => h('div', null, {default: () => `custom! ${firstRef.value.body}`})},
  })
  // Demonstration psuedocode, you can also import a component and use it
  // const importedComponent () => {
  //   show({
  //     component: import('./MyToastComponent.vue'),
  //   })
  // }
}
</script>
```

  </template>
</HighlightCard>

## Programmatically Hiding a Toast

Hiding a `Toast` programmatically is very simple. Simply use the return value from the show method, and pass it into the `remove` function

<HighlightCard>
  <BButtonGroup>
    <BButton @click="showMe" variant="success">
      Show the Toast
    </BButton>
    <BButton @click="hideMe" variant="danger">
      Hide the Toast
    </BButton>
  </BButtonGroup>
  <template #html>

```vue
<template>
  <BButtonGroup>
    <BButton @click="showMe" variant="success"> Show the Toast </BButton>
    <BButton @click="hideMe" variant="danger"> Hide the Toast </BButton>
  </BButtonGroup>
</template>

<script setup lang="ts">
const {show, remove} = useToastController()

let showValue: undefined | string

const showMe = () => {
  if (showValue !== undefined) return
  // `show` returns a symbol
  showValue = 'toast1'
  show({
    title: 'Showing',
    value: true,
    variant: 'success',
    position: 'bottom-center',
    id: showValue,
  })
}

const hideMe = () => {
  if (showValue === undefined) return
  remove?.(showValue)
  showValue = undefined
}
</script>
```

  </template>

</HighlightCard>

<script setup lang="ts">
import {data} from '../../data/components/toast.data'
import {BButton, useToastController, BButtonGroup, BToast} from 'bootstrap-vue-next'
import HighlightCard from '../../components/HighlightCard.vue'
import ContentsSidebar from '../../components/ContentsSidebar.vue'
import UsePluginAlert from '../../components/UsePluginAlert.vue'
import {ref, computed, h, onMounted} from 'vue'
import ComposableHeader from './ComposableHeader.vue'

const {show, remove, toasts} = useToastController()

let showValue: undefined | string

const showMe = () => {
  if (showValue !== undefined) return
  showValue = 'toast-1'
  show({ title: 'Showing',  variant: 'success', position: 'bottom-center', id: showValue } )
}

const hideMe = () => {
  if (showValue === undefined) return
  remove(showValue)
  showValue = undefined
}

const firstRef = ref<OrchestratedToast>({
  body: `${Math.random()}`,
})

onMounted(() => {
  setInterval(() => {
    firstRef.value.body = `${Math.random()}`
  }, 1000)
})

const showReactiveExample = () => {
  show(
    computed(() => ({
      ...firstRef.value,
      variant: (Number.parseInt(firstRef.value.body?.charAt(2) ?? '0') % 2 === 0
        ? 'danger'
        : 'info') as ColorVariant,
    })),
  )
}

const showMeAdvancedExample = () => {
  show({
    body: firstRef.value.body,
    position: 'bottom-center',
    slots: {default: () => h('div', null, {default: () => `custom! ${firstRef.value.body}`})},
  })
}

</script>
