<template>
	<div>
  		<div class="players">
  			<div v-if="winner === 'both'">Ничья!</div>
		    <div class="player">
		    	<div v-if="winner === 'player'">Победитель</div>
		    	<div class="player__name">You</div>
		    	<div class="player__line"><div class="player__hp" :style="{ width: player.hp + '%' }"></div><span>Здоровье</span></div>
		    	<div class="player__line"><div class="player__mp" :style="{ width: player.mp + '%' }"></div><span>Мана</span></div>

		    	<div class="actions" v-if="winner === null">
		    		<div class="actions__title">Атаки</div>
					<button class="button default-color" @click="action()">Обычный удар</button>
					<button class="button combo-color" @click="action('combo')">Комбо</button>
					<button class="button magic-color" @click="action('magic')">Заклинание</button>
					<button class="button heal-color" @click="action('heal', 'player')">Лечение</button>
				</div>
		    </div>
		    <div class="player">
		    	<div v-if="winner === 'monster'">Победитель</div>
		    	<div class="player__name">Monster</div>
		    	<div class="player__line"><div class="player__hp" :style="{ width: monster.hp + '%' }"></div><span>Здоровье</span></div>
		    	<!-- <div class="player__line"><div class="player__mp" :style="{ width: monster.mp + '%' }"></div><span>Мана</span></div> -->
		    </div>
		</div>
		<ul class="gameActions">
			<li v-for="(log, index) in log"><span :class="log.who">{{ log.value }}</span></li>
		</ul>
  </div>
</template>

<script>
export default {
  name: 'Default',
  data () {
    return {
    	winner: null,
    	attacks: {
    		default: generateRandom(-4, -1),
    		combo: generateRandom(-10, -5),
    		magic: generateRandom(-14, -10),
    		heal: generateRandom(4, 12)
    	},
      	player: {
	      	hp: 100,
	      	mp: 100
      	},
      	monster: {
	      	hp: 100
      	},
      	log: []
    }
  },
  methods: {
  	action(actionName = 'default', who = 'monster') {
  		let attack = this.attacks[actionName].next().value,
  			logValue;
  		this[who].hp = getValidAction(this[who].hp, attack);

  		if(actionName === 'heal') {
  			logValue = {
	  			who: who,
	  			value: `${ who } произнес заклинание лечения: +${ attack }HP`
	  		};
  		} else {
  			logValue = {
	  			who: getOtherPlayer(who),
  				value: `${ getOtherPlayer(who) } нанес удар ${ who }: ${ attack }HP`
	  		};
  		}
  		this.log.unshift(logValue);
  		this.log = this.log.slice(0, 3);

  		// monster attack
		this.player.hp = getValidAction(this.player.hp, -5);
		this.log.unshift({
			who: 'monster',
			value: `monster нанес удар player: -5HP`
  		});
  		this.log = this.log.slice(0, 3);

  		// isWin?
  		if(this.player.hp <= 0 && this.monster.hp <= 0) {
  			this.winner = 'both';
  		} else if(this.player.hp > 0 && this.monster.hp <= 0) {
  			this.winner = 'player';
  		} else if(this.player.hp <= 0 && this.monster.hp > 0) {
  			this.winner = 'monster';
  		}
  	}
  }
}

function getOtherPlayer(currentPlayer) {
	return currentPlayer == 'monster' ? 'player' : 'monster';
}

// соблюдает лимиты значений от 0 до 100
function getValidAction(currentVal, actionVal) {
	return currentVal + actionVal > 100 ? 100 :
				currentVal + actionVal < 0 ? 0 :
					currentVal + actionVal;
}

// рандомная генерация атак/лечения
function* generateRandom(min = 1, max = 5) {
	while(true) {
		yield Math.floor(Math.random() * (max - min + 1) + min); // от min до max включительно
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
	&__line {
		height: 3rem;
		position: relative;
		background-color: #ccc;
		margin-bottom: .5rem;

		span {
			display: block;
			color: #fff;
			font-size: 1.2rem;
			line-height: 3rem;
			height: 100%;
			text-align: left;
			z-index: 10;
			position: relative;
			padding: 0 2rem;
		}
	}
	&__hp,
	&__mp {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	&__hp {
		background-color: green;
	}
	&__mp {
		background-color: blue;
	}
}
.actions {
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	margin-top: 2rem;
	flex-wrap: wrap;

	.button {
		flex: 1 1 20%;
	}
	&__title {
		text-transform: uppercase;
		color: #333;
		margin-bottom: 1rem;
		flex-basis: 100%;
	}
}
.button {
	cursor: pointer;
	color: #fff;
	border: none;
	font-size: 1.4rem;
	transition: all .3s;
	padding: 1rem;

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
.gameActions {
	text-align: center;
	margin: 3rem auto;
	list-style: none;
	padding: 0;

	&:empty {
		display: none;
	}
	p {
		margin: 0 0 1rem;

		&:empty {
			display: none;
		}
	}
	.player {
		color: green;
	}
	.monster {
		color: red;
	}
}
</style>
