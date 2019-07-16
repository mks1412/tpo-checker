import { mount, Wrapper } from '@vue/test-utils'
import BaseButton from '@/components/atoms/BaseButton.vue'

describe('BaseButton', (): void => {
  describe('clickされたとき(to設定)', (): void => {
    let wrapper: Wrapper<BaseButton>
    const to = '/signup'
    const push = jest.fn()

    beforeEach(() => {
      const $router = { push }
      wrapper = mount(BaseButton, {
        propsData: { to },
        mocks: { $router }
      })
    })

    test('emitされないこと', () => {
      wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    test('toに遷移すること', () => {
      wrapper.find('button').trigger('click')
      expect(push).toHaveBeenCalledWith(to)
    })
  })

  describe('clickされたとき(to未設定)', (): void => {
    test('emitされること', () => {
      const wrapper = mount(BaseButton)
      wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).not.toBeUndefined()
    })
  })
})
