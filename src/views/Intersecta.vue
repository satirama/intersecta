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
        .item
        .item
        .item
        .item
        .item
      .group
        .item
        .item
        .item
        .item
      .group
        .item
        .item
        .item
        .item
        .item
      .group
        .item
        .item
        .item
        .item
      .group
        .item
        .item
        .item
        .item
        .item
      .group
        .item
        .item
        .item
        .item
      .group
        .item
        .item
        .item
        .item
        .item
      .group
        .item
        .item
        .item
        .item
      .group
        .item
        .item
        .item
        .item
        .item
</template>
<script>
import intersecta from '@/intersecta/intersecta';

export default {
  name: 'Intersecta',
  data() {
    return {
      animation: 'fadeIn',
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
      colors: [
        'rgba(168,251,169',
        'rgba(211,127,125',
        'rgba(236,254,97',
        'rgba(51,39,241',
      ],
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
    document.querySelectorAll('.item').forEach((el) => {
      const item = el;
      const random = Math.floor(Math.random() * this.colors.length);
      item.style.background = `linear-gradient(125deg,
      ${this.colors[random]}, 0.8), ${this.colors[random]}, 1))`;
    });
    this.observer = intersecta({
      selector: '.item',
      once: false,
      animation: 'fadeIn',
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
  .group {
    display: flex;
    position: relative;
    justify-content: space-between;
    min-height: 200px;
    align-items: center;
    padding: 3rem;
    margin: 1rem auto;
    .item {
      width: 1rem;
      height: 1rem;
      background-color: black;
      border-radius: 50%;
      box-shadow: 2px 1px 3px 0px rgba(0, 0, 0, 0.2);
    }
  }
  .group:nth-child(even) {
    justify-content: space-around;
  }
}
</style>
