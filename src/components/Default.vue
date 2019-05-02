<template>
	<div>
		<endgame :winner="winner" v-if="endgame" @finishGame="resetGame()"></endgame>
		<template v-else>
			<div class="players">
	  			<div v-if="winner === 'both'">Ничья!</div>
			    <div class="player">
			    	<div v-if="winner === 'player'">Победитель</div>
			    	<div class="player__name">You</div>
			    	<div class="player__line"><div class="player__hp" :style="{ width: player.hp + '%' }"></div><span>Здоровье</span></div>
			    	<div class="player__line"><div class="player__mp" :style="{ width: player.mp + '%' }"></div><span>Мана</span></div>

			    	<div class="actions" v-if="winner === null">
			    		<div class="actions__title">Атаки</div>
						<button class="button default-color" @click="gameRound()">Обычный удар</button>
						<button class="button combo-color" @click="gameRound('combo')">Комбо</button>
						<button class="button magic-color" @click="gameRound('magic')">Заклинание</button>
						<button class="button heal-color" @click="gameRound('heal', 'player')">Лечение</button>
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
				<li v-for="item in log"><span :class="log.who">{{ item.value }}</span></li>
			</ul>
		</template>
  </div>
</template>

<script>
import End from '@/components/End.vue'; // Экран окончания игры

export default {
  name: 'Default',
  components: {
  	endgame: End
  },
  data () {
    return gameConfig()
  },
  methods: {
  	gameRound(actionName = 'default', purpose = 'monster') {
  		// actionName - название атаки/заклинания
  		// purpose - на кого направлена атака/заклинание

  		// атака игрока
  		this._attack(actionName, purpose);

  		// атака монстра
  		let monsterAttack = this._randomAttack();
  		this._attack(monsterAttack, monsterAttack === 'heal' ? 'monster' : 'player');

  		// проверка, есть ли победитель/проигравший/ничья
  		this.endRound(); 
  	},
  	endRound() {
  		// есть ли победитель
  		if(this.player.hp <= 0 && this.monster.hp <= 0) {
  			this.winner = 'both';
  			this.endgame = true;
  		} else if(this.player.hp > 0 && this.monster.hp <= 0) {
  			this.winner = 'player';
  			this.endgame = true;
  		} else if(this.player.hp <= 0 && this.monster.hp > 0) {
  			this.winner = 'monster';
  			this.endgame = true;
  		}
  	},
  	resetGame() {
  		// обнулить данные, начать игру сначала
  		let config = gameConfig(),
  			dataKeys = Object.keys(config);
  		
  		dataKeys.map(el => {
  			this[el] = config[el];
  		});
  	},
  	_attack(actionName = 'default', purpose = 'monster') {
  		let damage = this.attacks[actionName].next().value;
  		this[purpose].hp = getValidAction(this[purpose].hp, damage);
  		// записать в лог действие
  		this._logAction(purpose, damage, actionName);
  	},
  	_logAction(purpose = 'monster', damage, attackName = 'default') {
  		let attackText = '',
  			person = attackName === 'heal' ? purpose : this._getOtherPlayer(purpose);

  		switch (attackName) {
  			case 'combo':
  				attackText = 'нанес комбо-удар:';
  				break;
  			case 'magic':
  				attackText = 'произнес боевое заклинание:';
  				break;
  			case 'heal':
  				attackText = 'произнес заклинание лечения:';
  				break;
  			default:
  				attackText = 'нанес урон обычным ударом:';
  		}

  		// добавляем в начало лога новое действие персонажа
  		this.log.unshift({
  			who: person,
  			value: `${ person } ${ attackText } ${ damage > 0 ? '+' + damage : damage }HP`
  		});

  		// оставить только последние 3 действия в истории
  		this.log = this.log.slice(0, 3);
  	},
  	_getOtherPlayer(currentPlayer) {
		return currentPlayer == 'monster' ? 'player' : 'monster';
	},
	_randomAttack() {
		// генерация рандомной атаки у монстра: default, combo, magic или heal
		return Object.keys(this.attacks)[this._monsterAttack.next().value];
	}
  },
  mounted() {
  	// инициализация рандомных атак монстра
  	this._monsterAttack = generateRandom(0,3);
  }
}

function gameConfig() {
	return {
		endgame: false,
    	winner: null,
    	attacks: {
    		// настройки атак по умолчанию
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
