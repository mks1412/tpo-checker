import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import UserAuthForm from '@/components/molecules/UserAuthForm.vue'

storiesOf('Molecules', module)
  .addDecorator(withInfo)
  .add(
    'UserAuthForm',
    () => ({
      components: { UserAuthForm },
      template: `
    <div class="p-8">
      <user-auth-form v-model="authInfo" buttonLabel="ログイン" />
    </div>
  `,
      data() {
        return {
          authInfo: {
            email: '',
            password: ''
          }
        }
      }
    }),
    {
      info: {
        summary: 'Summary for UserAuthForm'
      }
    }
  )
