<template lang="pug">
  .f-loader(:style="styles")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Loader extends Vue {
  @Prop({ type: String }) color!: string

  get styles() {
    return {
      '--color': this.color
    }
  }
}
</script>

<style lang="scss" scoped>
.f-loader {
  --color: #fff;

  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(224, 224, 224, 0.9);
  border-right: 1.1em solid rgba(224, 224, 224, 0.9);
  border-bottom: 1.1em solid rgba(224, 224, 224, 0.9);
  border-left: 1.1em solid var(--color);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load 1.1s infinite linear;
  animation: load 1.1s infinite linear;
  border-radius: 50%;
  width: 10em;
  height: 10em;

  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
}

@-webkit-keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
