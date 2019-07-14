import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import TextField from '@/components/atoms/TextField.vue'

storiesOf('Input', module)
  .addDecorator(withInfo)
  .add(
    'TextField',
    () => ({
      components: { TextField },
      template: `
    <div class="p-8 bg-gray-100">
      <TextField class="mb-4" placeholder="Basic" label="テキスト" required />
      <TextField class="mb-4" placeholder="Basic" label="ヒント付きテキスト" hint="10文字以上" required />
      <TextField class="mb-4" placeholder="Password" label="パスワード" type="password" />
      <TextField class="mb-4" placeholder="Suffix" suffix="cm" type="number" :min="min" :max="max" />
      <TextField class="mb-4" placeholder="Box" box required />
    </div>
  `,
      data() {
        return {
          min: 0,
          max: 100
        }
      }
    }),
    {
      info: {
        summary: 'Summary for TextField'
      }
    }
  )
