import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import Logo from '@/components/atoms/Logo.vue'

storiesOf('Atoms', module)
  .addDecorator(withInfo)
  .add(
    'Logo',
    () => ({
      components: { Logo },
      template: `
    <div class="p-8 bg-gray-200">
      <div class="mb-4"><logo /></div>
      <div class="mb-4"><logo color="#828282" /></div>
      <div class="mb-4"><logo color="#333" /></div>
      <div class="mb-4"><logo color="#08d9d6" /></div>
    </div>
  `
    }),
    {
      info: {
        summary: 'Summary for Logo'
      }
    }
  )
