<template lang="pug">
  .f-image-croppa
    .f-image-croppa__content.flex.justify-center.px-2
      croppa(
        v-model="croppa"
        :width="280"
        :height="280"
        :show-remove-button="true"
        remove-button-color="red"
        :show-loading="true"
        :file-size-limit="2097152"
        accept="image/*"
        placeholder="画像を選択する"
        @file-choose="onFileChoose"
        @file-type-mismatch="onFileTypeMismatch"
        @file-size-exceed="onFileSizeExceed"
        @image-remove="onFileRemoved"
      )
    .f-image-croppa__buttons.flex.w-full.mt-4.px-4
      base-button.mr-2(label="キャンセル" textColor="#E53E3E" small flat @click="onCancel")
      base-button(label="アップロード" backgroundColor="#38A169" :disabled="!fileExists" small depressed @click="uploadResizedImage")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { storage } from '@/lib/firebase'
import { LateInit } from '@/plugins/decorators'
import BaseButton from '@/components/atoms/BaseButton.vue'

interface VueCroppa {
  promisedBlob: (mimeType?: string, compressionRate?: number) => Blob
}

@Component({
  components: {
    BaseButton
  }
})
export default class ImageCroppa extends Vue {
  @Prop({ type: String, required: true }) path!: string

  @LateInit
  private croppa!: VueCroppa

  private filetype: string | null = null
  private errorMessage: string = ''
  private isLoading: boolean = false

  get fileExists(): boolean {
    return !!this.filetype
  }

  private onFileTypeMismatch(_: File) {
    this.errorMessage = 'ファイル形式が対象外です'
  }

  private onFileSizeExceed(_: File) {
    this.errorMessage = 'ファイルサイズは2MBが上限です'
  }

  private onFileChoose(file: File) {
    this.filetype = file.type
  }

  private onFileRemoved() {
    this.filetype = null
  }

  private async uploadResizedImage() {
    this.isLoading = true
    const blob = await this.croppa.promisedBlob(this.filetype || 'image/jpeg')
    const metadata = { cacheControl: 'public,max-age=86400', contentType: blob.type }
    try {
      const snapshot = await storage
        .ref()
        .child(this.path)
        .put(blob, metadata)
      const url = await snapshot.ref.getDownloadURL()
      if (url) this.$emit('uploaded', url)
    } catch (e) {
      this.errorMessage = 'アップロードエラー'
    } finally {
      this.isLoading = false
    }
  }

  private onCancel() {
    this.$emit('canceled')
  }
}
</script>

<style lang="scss" scoped>
.f-image-croppa {
}
</style>
