<template>
  <b-card no-body
    :img-src="imgSrc"
    :img-alt="imgAlt"
    img-top
    tag="article"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </b-card>
</template>

<script>
  export default {
    name: 'BaseCard',
    props: {
      imgAlt: {
        type: String,
        default: 'Image',
      },
      imgSrc: {
        type: String,
        default: 'https://picsum.photos/600/300/?image=26',
      },
    }
  }
</script>

<style scoped>
.card-deck .card {
  cursor: pointer;
  flex: 0 0 calc(25% - 30px);
  margin-bottom: 30px;
}
@media (min-width: 576px) {
  .card-deck .card {
    flex: 0 0 calc(50% - 30px);
  }
}
@media (min-width: 992px) {
  .card-deck .card {
    flex: 0 0 calc(33% - 30px);
  }
}
@media (min-width: 1200px) {
  .card-deck .card {
    flex: 0 0 calc(25% - 30px);
  }
}

</style>
