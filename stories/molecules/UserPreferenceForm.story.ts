import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import UserPreferenceForm from '@/components/molecules/UserPreferenceForm.vue'
import { Gender } from '@/entities/User'

storiesOf('Molecules', module)
  .addDecorator(withInfo)
  .add(
    'UserPreferenceForm',
    () => ({
      components: { UserPreferenceForm },
      template: `
    <div class="p-8">
      <user-preference-form v-model="profile.preferences" :gender="profile.gender" />
    </div>
  `,
      data() {
        return {
          profile: {
            preferences: [],
            gender: Gender.male
          }
        }
      }
    }),
    {
      info: {
        summary: 'Summary for UserPreferenceForm'
      }
    }
  )
