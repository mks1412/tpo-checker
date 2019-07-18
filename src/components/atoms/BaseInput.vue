<template lang="pug">
  .f-input(:style="styles")
    .f-input__label
      slot(name="label")
    .f-input__field
      slot(name="field")
    .f-input__details
      slot(name="details")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class BaseInput extends Vue {
  @Prop({ type: String, default: 'inactive' }) inputState!: 'inactive' | 'active' | 'error'

  get styles(): { [key: string]: string } {
    const inputColors = {
      inactive: '#999',
      active: '#1867c0',
      error: '#ff5252'
    }
    return {
      '--input-color': inputColors[this.inputState]
    }
  }
}
</script>

<style lang="scss">
.f-input {
  --input-color: #999;

  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  font-size: 16px;
  text-align: left;

  input::placeholder,
  textarea::placeholder {
    color: rgba(0, 0, 0, 0.87);
  }

  &__label {
    color: var(--input-color);
    font-size: 16px;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    pointer-events: none;
    text-overflow: ellipsis;
    transform: scale(0.75);
    transform-origin: bottom left;
    white-space: nowrap;
    width: 100%;
  }

  &__field {
    align-items: center;
    color: #333;
    display: flex;
    min-height: inherit;
    position: relative;
    width: 100%;

    > div {
      width: 100%;
    }

    .f-input__slot {
      border-bottom: solid 1px var(--input-color);

      &--box {
        background-color: #fff;
        border-radius: 6px;
        border: none;
        box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
        padding: 5px 15px;
      }
    }
  }

  &__details {
    color: var(--input-color);
    display: flex;
    flex: 1 0 auto;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    margin-top: 8px;
    overflow: hidden;
    width: 100%;
  }

  &__slot {
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
}
</style>
