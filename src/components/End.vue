<template>
  <div class="finishGame">
  	<hgroup v-if="winner !== null">
  		<h4>Игра окончена!</h4>
  		<h5>{{ finishText }}</h5>
  	</hgroup>
    <p v-else>Вы куда-то не туда зашли :) Выберите что-нибудь ниже:</p>
  	<button @click="finishGame()" class="button heal-color">Начать сначала</button>
  	<router-link to="/about" class="button combo-color">Закончить игру</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    winner() {
      return this.$store.getters.getWinner;
    },
  	finishText() {
  		let text = this.winner === null ? 'Победитель не определен' :
  								this.winner === 'both' ? 'Ничья'
  												: 'Победитель: ' + this.winner; 
  		return text;
  	}
  },
  methods: {
  	finishGame() {
      this.$store.commit('reset');
  	}
  }
}
</script>

<style lang="scss" scoped>
.finishGame {
  text-align: center;
  margin: 5rem auto 2rem;
  padding: 3rem 2rem;
  max-width: 50rem;
  background-color: #e2e2e2;
  border-radius: 1rem;
  box-shadow: 0 .2rem .5rem 0 rgba(0,0,0,.3);

  hgroup {
    h4 {
      margin: 0;
      font-size: 2rem;
      text-transform: uppercase;
    }
    h5 {
      margin: 1rem 0 4rem;
      font-size: 1.6rem;
      font-weight: 300;
    }
  }
}
</style>
