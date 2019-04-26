<template>
	<div>
  		<div class="players">
		    <div class="player">
		    	<div class="player__name">You</div>
		    	<div class="player__xp"></div>
		    </div>
		    <div class="player">
		    	<div class="player__name">Monster</div>
		    	<div class="player__xp"></div>
		    </div>
		</div>
		<div class="actions">
			<button class="button">Обычный удар</button>
			<button class="button">Супер удар</button>
			<button class="button">Подлечиться</button>
		</div>
  </div>
</template>

<script>
export default {
  name: 'Default',
  data () {
    return {
      msg: 'default component'
    }
  }
}
</script>

<style lang="scss">
.players {
	text-align: center;
}
.player {
	display: inline-block;
	vertical-align: top;
	width: 40%;
	margin: 0 2rem;

	&__name {
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 700;
		margin-bottom: 2rem;
		line-height: 1;
	}
	&__xp {
		display: block;
		height: 1rem;
		background: green;
	}
}
</style>
