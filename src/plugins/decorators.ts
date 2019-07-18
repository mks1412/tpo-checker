import Vue from 'vue'
import { createDecorator } from 'vue-class-component'

export const LateInit = createDecorator((options, key) => {
  options.mixins = [
    ...(options.mixins || []),
    {
      data(this: Vue) {
        return {
          [key]: null
        }
      }
    }
  ]
})
