import { mount } from '@vue/test-utils'
import BaseButton from '@/components/atoms/BaseButton.vue'

describe('BaseButton', (): void => {
  test('is a Vue instance', (): void => {
    const wrapper = mount(BaseButton)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
