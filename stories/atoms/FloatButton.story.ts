import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import FloatButton from '@/components/atoms/FloatButton.vue'

storiesOf('Atoms', module)
  .addDecorator(withInfo)
  .add(
    'FloatButton',
    () => ({
      components: { FloatButton },
      template: `
    <div class="p-8">
      <float-button/>
    </div>
  `
    }),
    {
      info: {
        summary: 'Summary for FloatButton'
      }
    }
  )
