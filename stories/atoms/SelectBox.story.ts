import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import SelectBox from '@/components/atoms/SelectBox.vue'

storiesOf('Atoms', module)
  .addDecorator(withInfo)
  .add(
    'SelectBox',
    () => ({
      components: { SelectBox },
      template: `
    <div class="p-8 bg-gray-100">
      <select-box class="mb-4" label="Basic" :options="options" v-model="category1" />
      <select-box class="mb-4" label="Hint" :options="options" v-model="category1" hint="This is hint" />
      <select-box class="mb-4" label="Placeholder" :options="options" v-model="category2" placeholder="Select Category" />
      <select-box class="mb-4" :options="options" v-model="category2" placeholder="Box without Label" box />
    </div>
  `,
      data() {
        return {
          category1: 'a',
          category2: '',
          options: [
            { label: 'Category A', value: 'a' },
            { label: 'Category B', value: 'b' },
            { label: 'Category C', value: 'c' }
          ]
        }
      }
    }),
    {
      info: {
        summary: 'Summary for TextField'
      }
    }
  )
