<template lang="pug">
  .body.container-fluid
    .content
      h1.mb-4 intersecta js
      p.mb-0 lightweight lib for scrolling based animations
      p.mb-0 100% JS
      p No external libs only WebAPI.
      b-form-select(v-model="animation" :options="animationOptions" @change="updateObserver")
      a(href="https://github.com/satirama/intersecta")
        img.mt-4(src="/img/github.png" alt="github")
    .background
      .group
        h3.item *
        h3.item *
        h3.item *
        h3.item *
        h3.item *
      .group
        h3.item *
        h3.item *
        h3.item *
        h3.item *
      .group
        h3.item *
        h3.item *
        h3.item *
        h3.item *
        h3.item *
      .group
        h3.item *
        h3.item *
        h3.item *
        h3.item *
      .group
        h3.item *
        h3.item *
        h3.item *
        h3.item *
        h3.item *
      .group
        h3.item *
        h3.item *
        h3.item *
        h3.item *
      .group
        h3.item *
        h3.item *
        h3.item *
        h3.item *
        h3.item *
      .group
        h3.item *
        h3.item *
        h3.item *
        h3.item *
      .group
        h3.item *
        h3.item *
        h3.item *
        h3.item *
        h3.item *
</template>
<script>
import intersecta from '@/intersecta/intersecta';

export default {
  name: 'Intersecta',
  data() {
    return {
      animation: 'flipLeft',
      animationOptions: [
        'fadeIn',
        'fadeOut',
        'zoomIn',
        'zoomOut',
        'slideDown',
        'slideUp',
        'slideLeft',
        'slideRight',
        'flipLeft',
        'flipRight',
      ],
      observer: undefined,
    };
  },
  methods: {
    updateObserver(value) {
      this.observer.stop();
      if (value !== 'fadeOut') {
        document.querySelectorAll('.item').forEach((el) => {
          const item = el;
          item.animate([
            { opacity: 0 },
            { opacity: 1 },
          ], {
            duration: 1,
            fill: 'forwards',
          });
        });
      }
      this.observer = intersecta({
        selector: '.item',
        once: false,
        animation: value,
        threshold: 1,
      });
    },
  },
  mounted() {
    this.observer = intersecta({
      selector: '.item',
      once: false,
      animation: 'flipLeft',
      threshold: 1,
      delay: 0,
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  h1 {
    font-weight: 800;
  }
  img {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
}

.background {
  width: 100%;
  height: 100%;
}

.background .group {
  display: flex;
  position: relative;
  justify-content: space-between;
  min-height: 200px;
  align-items: center;
  padding: 3rem;
}

.background .group:nth-child(even) {
  justify-content: space-around;
}
</style>
