import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import SelectableColor from '@/components/atoms/SelectableColor.vue'

storiesOf('Atoms', module)
  .addDecorator(withInfo)
  .add(
    'SelectableColor',
    () => ({
      components: { SelectableColor },
      template: `
    <div class="p-8 flex flex-wrap">
      <selectable-color :value="color" />
    </div>
  `,
      data() {
        return {
          color: {
            label: 'ネイビー',
            value: '#203058'
          }
        }
      }
    }),
    {
      info: {
        summary: 'Summary for SelectableColor'
      }
    }
  )
