import { configure, addParameters, addDecorator } from '@storybook/vue'
import 'tailwindcss/dist/tailwind.min.css'

addParameters({ viewport: { defaultViewport: 'iphonex' } })

function loadStories() {
  const req = require.context('../stories', true, /\.story\.ts$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
