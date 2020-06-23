<template lang="pug">
  #portfolio.container-fluid.align-items-center.d-flex
    .row.justify-content-center
      .col-11.col-md-6.text-center.mb-5.main
        h1 Angelica Miranda S
        p.mb-1 Web developer with business insight.
        p Dedicated to learning and adopting new technologies to build&nbsp;
          | beautiful and functional products.
        .d-flex.flex-row.justify-content-center
          a.mx-2(href="https://github.com/satirama")
            img.mt-3(src="/img/github.png" alt="github")
          a.mx-2(href="https://gitlab.com/satirama")
            img.mt-3(src="/img/gitlab.png" alt="gitlab")
          a.mx-2(href="https://twitter.com/miirandas")
            img.mt-3(src="/img/twitter.png" alt="twitter")
      .col-12.mt-5.projects
        h4 Some projects
        a(href="/intersecta")
          p.title intersecta js
        p.description Lightweight lib for scrolling based animations.
          br
          | No external libs. 100% JS.
        a(href="https://defensoresdelademocracia.mx/" target="_blank" rel="noreferrer")
          p.title Democracy fighters
        p.description Brown Institute grant project
</template>
<script>
export default {
  name: 'Portfolio',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#portfolio {
  min-height: 100vh;
  .row {
    width: 100%;
  }
  .main {
    font-size: 1.05rem;
  }
  .projects {
    font-size: 0.8rem;
    .title {
      margin-bottom: 0.1rem;
      font-weight: 500;
      font-size: 1.1rem;
    }
  }
}
img {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}
</style>
