import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import EmptyState from '@/components/atoms/EmptyState.vue'

storiesOf('Atoms', module)
  .addDecorator(withInfo)
  .add(
    'EmptyState',
    () => ({
      components: { EmptyState },
      template: `
    <div class="p-8">
      <empty-state src="images/hanger.png" :title="title" :caption="caption" />
    </div>
  `,
      data() {
        return {
          title: 'Closet is empty',
          caption: 'This is a captiono for user'
        }
      }
    }),
    {
      info: {
        summary: 'Summary for EmptyState'
      }
    }
  )
