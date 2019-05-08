<template>
	<div>
		<endscreen v-if="endgame"></endscreen>
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
  	return {}
  },
  computed: {
    endgame() {
      return this.$store.getters.getEndgame;
    }
  }
}
</script>

<style lang="scss">
.button {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  color: #fff;
  border: none;
  font-size: 1.4rem;
  transition: all .3s;
  text-decoration: none;
  line-height: 4rem;
  padding: 0 2rem;
  height: 4rem;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 .5rem 0 rgba(0,0,0,.3);
  }
  &.default-color {
    background-color: #ffaa0a;

    &:hover {
      background-color: #ffaa0a + #111;
    }
  }
  &.combo-color {
    background-color: #ff0a0a;

    &:hover {
      background-color: #ff0a0a + #111;
    }
  }
  &.magic-color {
    background-color: #c029e4;

    &:hover {
      background-color: #c029e4 + #111;
    }
  }
  &.heal-color {
    background-color: #1bd488;

    &:hover {
      background-color: #1bd488 + #111;
    }
  }
}
</style>
