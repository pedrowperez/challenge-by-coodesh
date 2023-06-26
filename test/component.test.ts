import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SharedInput from '../src/components/SharedInput.vue'

describe('SharedInput.vue', () => {
  it('should render', () => {
    const wrapper = mount(SharedInput, { model: { initial: '' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
