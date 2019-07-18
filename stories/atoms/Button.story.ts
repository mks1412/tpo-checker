import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import BaseButton from '@/components/atoms/BaseButton.vue'

storiesOf('Atoms', module)
  .addDecorator(withInfo)
  .add(
    'BaseButton',
    () => ({
      components: { BaseButton },
      template: `
    <div class="p-8">
      <BaseButton class="mb-4" label="Default" />
      <BaseButton class="mb-4" label="Custom color" :backgroundColor="backgroundColor" :textColor="textColor" />
      <BaseButton class="mb-4" label="Depressed" depressed />
      <BaseButton class="mb-4" label="Round" round />
      <BaseButton class="mb-4" label="Small" small />
      <BaseButton class="mb-4" label="Flat" flat :textColor="textColor" />
      <BaseButton class="mb-4" label="Disabled" disabled />
      <BaseButton class="mb-4" label="Loading" loading />
    </div>
  `,
      data() {
        return {
          backgroundColor: '#fff',
          textColor: '#08d9d6'
        }
      }
    }),
    {
      info: {
        summary: 'Summary for BaseButton'
      }
    }
  )
