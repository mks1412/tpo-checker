import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import SegmentedControl from '@/components/atoms/SegmentedControl.vue'

storiesOf('Input', module)
  .addDecorator(withInfo)
  .add(
    'SegmentedControl',
    () => ({
      components: { SegmentedControl },
      template: `
    <div class="p-8 bg-gray-200">
      <segmented-control class="mb-8" :options="options1" name="sex1" v-model="sex" />
      <segmented-control class="mb-8" :options="options2" name="sex2" v-model="sex" />
      <segmented-control class="mb-8" color="#48BB78" :options="options2" name="sex3" v-model="sex" />
    </div>
  `,
      data() {
        return {
          sex: 0,
          options1: [{ label: '男性', value: 0 }, { label: '女性', value: 1 }],
          options2: [{ label: '男性', value: 0 }, { label: '女性', value: 1 }, { label: '登録しない', value: 2 }]
        }
      }
    }),
    {
      info: {
        summary: 'Summary for SegmentedControl'
      }
    }
  )
