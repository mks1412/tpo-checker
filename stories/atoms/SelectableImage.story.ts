import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import SelectableImage from '@/components/atoms/SelectableImage.vue'

storiesOf('Atoms', module)
  .addDecorator(withInfo)
  .add(
    'SelectableImage',
    () => ({
      components: { SelectableImage },
      template: `
    <div class="p-8 flex flex-wrap">
      <div class="w-1/3">
        <selectable-image src="images/fashion_type/men/0.jpg" :value="1" round />
      </div>
      <div class="w-1/3">
        <selectable-image src="images/fashion_type/men/1.jpg" :value="2" />
      </div>
      <div class="w-1/3">
        <selectable-image src="images/fashion_type/men/2.jpg" :value="3" selected round />
      </div>
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
        summary: 'Summary for SelectableImage'
      }
    }
  )
