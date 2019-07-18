<template lang="pug">
  .items.flex.items-center.py-4
    .items__content.w-full.px-6
      form-large-label(text="アイテム編集" align="left")
      item-data-form.mt-4(v-model="item" buttonLabel="更新" @submit="submit")
      base-button.mt-6(label="削除" textColor="#E53E3E" small flat @click="onDlete")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/vue-app'
import { ItemEntity } from '@/entities/Item'
import FormLargeLabel from '@/components/atoms/FormLargeLabel.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import ItemDataForm from '@/components/molecules/ItemDataForm.vue'
import { itemModule } from '@/store/item/const'
import { LateInit } from '@/plugins/decorators'
import ItemsRepository from '@/repositories/ItemsRepository'

@Component({
  components: { FormLargeLabel, ItemDataForm, BaseButton }
})
export default class NewItem extends Vue {
  @itemModule.Action('update')
  private update!: (item: ItemEntity) => Promise<void>

  @itemModule.Action('delete')
  private delete!: (item: ItemEntity) => Promise<void>

  @LateInit
  private item!: ItemEntity

  async asyncData(ctx: Context) {
    const repository = new ItemsRepository(ctx.store.getters['user/uid'])
    const item = await repository.getById(ctx.params.id)
    return { item }
  }

  private onDlete() {
    const check = confirm('本当にこのアイテムを削除しますか？')
    if (check) {
      this.delete(this.item)
        .then(() => this.$router.push('/items'))
        .catch((e) => console.log(e))
    }
  }

  private submit() {
    this.update(this.item)
      .then(() => this.$router.push('/items'))
      .catch((e) => console.log(e))
  }
}
</script>
