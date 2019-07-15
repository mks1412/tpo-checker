import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import UserProfileForm from '@/components/molecules/UserProfileForm.vue'

storiesOf('Molecules', module)
  .addDecorator(withInfo)
  .add(
    'UserProfileForm',
    () => ({
      components: { UserProfileForm },
      template: `
    <div class="p-8">
      <user-profile-form :profile="profile" />
    </div>
  `,
      data() {
        return {
          profile: {
            name: '',
            gender: 0,
            age: 20,
            height: null,
            weight: null
          }
        }
      }
    }),
    {
      info: {
        summary: 'Summary for UserProfileForm'
      }
    }
  )
