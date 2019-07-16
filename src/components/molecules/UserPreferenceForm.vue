<template lang="pug">
  .user-preference-form.flex.flex-wrap.justify-center
    .user-preference-form__content.flex.flex-wrap
      .user-preference-form__item(class="w-1/3 md:w-1/4" v-for="image in images" :key="image.id")
        selectable-image(
          :src="require(`@/assets/images/fashion_type/${imageDir}/${image.id}.jpg`)"
          :value="image.id"
          :selected="image.selected"
          round
          @input="toggle"
        )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SelectableImage from '@/components/atoms/SelectableImage.vue'
import { Gender } from '@/entities/User'

@Component({
  components: {
    SelectableImage
  }
})
export default class UserPreferenceForm extends Vue {
  @Prop({ type: Array, required: true }) value!: number[]
  @Prop({ type: Number, required: true }) gender!: Gender

  private images = [...Array(6).keys()].map((id: number) => ({ id, selected: false }))

  get imageDir() {
    return this.gender === Gender.male ? 'men' : 'women'
  }

  private toggle(id: number) {
    this.images.splice(id, 1, { id, selected: !this.images[id].selected })
    this.$emit('input', this.images.filter((img) => img.selected).map((img) => img.id))
  }
}
</script>
