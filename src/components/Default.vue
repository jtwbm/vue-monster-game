<template>
	<div>
		<endscreen :winner="winner" v-if="endgame" @finishGame="resetGame()"></endscreen>
		<template v-else>
			<game></game>
			<logger></logger>
		</template>
  </div>
</template>

<script>
import Game from '@/components/Game.vue';
import Logger from '@/components/Logger.vue';
import End from '@/components/End.vue';

export default {
  components: {
  	game: Game,
  	logger: Logger,
  	endscreen: End
  },
  data () {
  	return {

  	}
  }
}
</script>

<style lang="scss">

</style>
