<template lang="pug">
  .items
    .items__nav
      ul.items-nav-list
        li.items-nav-list__item(v-for="category in categories" :key="category.value")
          input.hidden(type="radio" :value="category.value" :id="category.value" v-model="activeCategory")
          label.items-nav-label(:for="category.value") {{ category.label }}
    transition(name="fade")
      .loader-wrapper(v-show="isLoading")
        loader(color="#08d9d6")
    .items__content.p-4
      template(v-if="activeItems.length > 0")
        .items-list(v-for="item in activeItems" :key="item.id")
          item-card.mb-2(:item="item")
      template(v-else)
        empty-state(:src="require('@/assets/images/hanger.png')" title="Closet is empty" caption="ファッションアイテムを登録できます")

    float-button(to="/items/new")
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { ItemEntity } from '@/entities/Item'
import BaseButton from '@/components/atoms/BaseButton.vue'
import Loader from '@/components/atoms/Loader.vue'
import FloatButton from '@/components/atoms/FloatButton.vue'
import EmptyState from '@/components/atoms/EmptyState.vue'
import ItemCard from '@/components/atoms/ItemCard.vue'
import Logo from '@/components/atoms/Logo.vue'
import { ItemCategories } from '@/constants/ItemCategory'
import { itemModule } from '@/store/item/const'
import { userModule } from '@/store/user/const'
import { Gender, SelectableOption } from '@/entities/User'

@Component({
  components: {
    BaseButton,
    FloatButton,
    Logo,
    Loader,
    ItemCard,
    EmptyState
  }
})
export default class Items extends Vue {
  @itemModule.State('items')
  private items!: { [key: string]: ItemEntity[] }

  @userModule.Getter('gender')
  private gender!: Gender

  @itemModule.Action('load')
  private load!: (params: { category: string; force?: boolean }) => Promise<void>

  @Watch('activeCategory')
  onChangeActiveCateogry(category: string) {
    if (this.items[category]) return
    this.isLoading = true
    this.load({ category }).finally(() => (this.isLoading = false))
  }

  private isLoading: boolean = false
  private activeCategory: string = 'tops'
  private categories: SelectableOption[] = ItemCategories(this.gender)

  get activeItems() {
    return this.items[this.activeCategory] || []
  }

  fetch(ctx: { query: any }) {
    if (ctx.query.cetegory) {
      console.log(ctx.query)
      this.isLoading = true
      this.load({ category: ctx.query.category, force: true })
    }
  }

  mounted() {
    this.isLoading = true
    setTimeout(() => {
      this.load({ category: this.activeCategory }).finally(() => (this.isLoading = false))
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.items {
  padding-top: 40px;

  &__nav {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    position: fixed;
    top: 50px;
    background: #fff;
    z-index: 100;

    .items-nav-list {
      align-items: center;
      display: flex;
      height: 40px;
      line-height: 35px;
      margin: 0 auto;
      list-style: none;

      &__item {
        flex-shrink: 0;

        .items-nav-label {
          display: block;
          padding: 0 20px;
        }

        input:checked + .items-nav-label {
          border-bottom: solid 2px theme('colors.base');
          color: theme('colors.base');
          font-weight: bold;
        }
      }
    }
  }

  .loader-wrapper {
    position: fixed;
    background: #fff;
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    top: 0;
    z-index: 50;
  }
}
</style>
