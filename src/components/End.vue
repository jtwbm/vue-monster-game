<template>
  <div class="finishGame">
	<hgroup>
		<h4 v-if="this.winner !== null">Игра окончена!</h4>
		<h5>{{ finishText }}</h5>
	</hgroup>
	<button @click="resetGame">Начать сначала</button>
	<router-link to="/about">Закончить игру</router-link>
  </div>
</template>

<script>
export default {
  name: 'Endgame',
  props: {
  	winner: {
  		required: true
  	}
  },
  data () {
    return {}
  },
  computed: {
  	finishText() {
  		let text = this.winner === null ? 'Победитель не определен' :
  								this.winner === 'both' ? 'Ничья'
  												: 'Победитель: ' + this.winner; 
  		return text;
  	}
  },
  methods: {
  	resetGame() {
  		console.log('reset');
  	}
  }
}
</script>

<style lang="scss" scoped>
hgroup {

}
</style>
