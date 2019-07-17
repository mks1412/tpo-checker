import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import GlobalHeader from '@/components/molecules/GlobalHeader.vue'

storiesOf('Molecules', module)
  .addDecorator(withInfo)
  .add(
    'GlobalHeader',
    () => ({
      components: { GlobalHeader },
      template: `<global-header />`
    }),
    {
      info: {
        summary: 'Summary for GlobalHeader'
      }
    }
  )
