<template lang="pug">
  .image-uploader
    template(v-if="imageExists")
      .image-uploader__placeholder(:class="classes" @click="openModal" :style="`background-image:url('${value}')`")
    template(v-else)
      .image-uploader__placeholder.noimage(:class="classes" @click="openModal")
    modal(:visible="modalVisible" @close="closeModal")
      .shadow.bg-white.m-auto(class="py-6 w-11/12 max-w-2xl" slot="content")
        image-croppa(:path="path" @canceled="closeModal" @uploaded="uploaded")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Modal from '@/components/atoms/Modal.vue'
import ImageCroppa from '@/components/molecules/ImageCroppa.vue'

@Component({
  components: {
    Modal,
    ImageCroppa
  }
})
export default class Logo extends Vue {
  @Prop({ type: String, required: true }) value!: string
  @Prop({ type: String, required: true }) path!: string
  @Prop({ type: Boolean, default: true }) round!: string

  private modalVisible: boolean = false

  get classes(): { [key: string]: string } {
    return {
      'image-uploader--round': this.round
    }
  }

  get imageExists(): boolean {
    return !!this.value
  }

  private openModal() {
    this.modalVisible = true
  }

  private closeModal() {
    this.modalVisible = false
  }

  private uploaded(url: string) {
    console.log(url)
    this.$emit('input', url)
    this.closeModal()
  }
}
</script>

<style lang="scss" scoped>
.image-uploader {
  width: 100%;
  max-width: 320px;

  &__placeholder {
    background-position: center;
    background-size: contain;
    border: solid 1px #eee;
    display: block;
    height: 0;
    width: 100%;
    padding-bottom: 100%;

    &.noimage {
      background-image: url('~assets/images/noimage.jpg');
    }
  }

  &--round,
  &--round img {
    border-radius: 15px;
  }

  &--circle,
  &--circle img {
    border-radius: 999px;
  }
}
</style>
