import {enableAutoUnmount, mount} from '@vue/test-utils'
import {afterEach, describe, expect, it} from 'vitest'
import BToastOrchestrator from './BToastOrchestrator.vue'
import {createBootstrap} from '../../plugins'

describe('toast-orchestator', () => {
  enableAutoUnmount(afterEach)

  it('has expected structure', async () => {
    const wrapper = mount(BToastOrchestrator, {
      global: {
        stubs: {teleport: true},
        plugins: [createBootstrap()],
      },
    })

    expect(wrapper.vm).toBeDefined()

    const $div = wrapper.find('div')
    expect($div.attributes('id')).toBe('__BVID__toaster-container')
    expect($div.attributes('aria-live')).toBeUndefined()
    expect($div.attributes('aria-atomic')).toBeUndefined()
    expect($div.attributes('role')).toBeUndefined()
  })
})
