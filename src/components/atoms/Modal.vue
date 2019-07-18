<template lang="pug">
  transition(name="modal")
    .f-modal(v-show="visible")
      .f-modal__mask
        .f-modal__wrapper
          slot(name="content")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Loader extends Vue {
  @Prop({ type: Boolean, default: false }) visible!: boolean
}
</script>

<style lang="scss" scoped>
.f-modal {
  &__mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
