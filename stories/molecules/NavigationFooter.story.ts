import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import NavigationFooter from '@/components/molecules/NavigationFooter.vue'

storiesOf('Molecules', module)
  .addDecorator(withInfo)
  .add(
    'NavigationFooter',
    () => ({
      components: { NavigationFooter },
      template: `<navigation-footer />`
    }),
    {
      info: {
        summary: 'Summary for NavigationFooter'
      }
    }
  )
