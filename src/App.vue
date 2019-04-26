<template>
  <div id="app">
    <div class="content">
      <nav class="myLinks">
        <a href="https://github.com/jtwbm/vue-monster-game" target="_blank" class="myLinks__item" title="Проект на github">
          <i class="icon icon-github"></i>
        </a>
        <router-link to="/about" class="myLinks__item">Об игре</router-link>
        <router-link to="/" class="myLinks__item main">MonsterGAME</router-link>
      </nav>
      <hgroup class="gameTitle">
        <h1>Победи монстра</h1>
        <h2>Нажимай на кнопки, и будь что будет</h2>
      </hgroup>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');
@import url('https://fonts.googleapis.com/css?family=Oswald:400,600,700&subset=cyrillic');

html {
  font-size: 10px;
}
body {
  font-family: 'Oswald', sans-serif;
  color: #333;
  font-size: 1.6rem;

  * {
    box-sizing: border-box;
  }
}
h1 {
  text-align: center;
  text-transform: uppercase;
  font-size: 4rem;
  line-height: 1;
  margin: 0;
  font-weight: 600;
}
h2 {
  text-align: center;
  margin: 0;
  font-size: 2rem;
  font-weight: 300;
}
.content {
  max-width: 100rem;
  margin: 0 auto;
  padding: 0 2rem;
}
.myLinks {
  padding: 2rem 0;

  &::after {
    content: "";
    display: block;
    clear: both;
  }
  &__item {
    float: right;
    padding: 0 1rem;
    text-decoration: none;
    display: inline-block;
    color: inherit;
    height: 4rem;
    line-height: 4rem;
    margin-left: 1rem;

    &.main {
      float: left;
      font-size: 2rem;
      font-weight: 600;
      margin-left: 0;
    }
  }
}
.icon {
  display: inline-block;
  vertical-align: middle;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;

  &-github {
    width: 5rem;
    height: 2rem;
    background-image: url(./assets/GitHub_Logo.png);
  }
}
.gameTitle {
  margin-bottom: 4rem;
}
</style>
