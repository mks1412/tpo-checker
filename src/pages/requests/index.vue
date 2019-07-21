<template lang="pug">
  .request.p-4
    form-large-label(text="コーディネート依頼一覧" align="left")
    .request__content.mt-4
      ul
        li(v-for="req in requests" :key="req.id")
          request-card.mb-3(:request="req")
    p.mt-6
      | 依頼に対して運営がコーデを提案し、完了した依頼をタップしたら詳細ページへ遷移して提案コーデを閲覧できる想定。時間が足りず未実装。
    float-button(to="/requests/new")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FloatButton from '@/components/atoms/FloatButton.vue'
import RequestCard from '@/components/atoms/RequestCard.vue'
import FormLargeLabel from '@/components/atoms/FormLargeLabel.vue'
import { requestModule } from '@/store/request/const'
import { RequestEntity } from '@/entities/Request'

@Component({ components: { FormLargeLabel, FloatButton, RequestCard } })
export default class Requests extends Vue {
  @requestModule.State('requests')
  private requests!: RequestEntity[]

  @requestModule.State('loading')
  private isLoading!: boolean

  @requestModule.Action('load')
  private load!: (force: boolean) => Promise<void>

  mounted() {
    setTimeout(() => this.load(true), 0)
  }
}
</script>
