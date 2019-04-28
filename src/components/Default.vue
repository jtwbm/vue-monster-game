<template>
	<div>
		<div class="gameActions">
			<p class="gameActions__player">Игрок атаковал монстра обычным ударом: -3HP</p>
			<p class="gameActions__monster">Монстр применил комбо: -12HP</p>
		</div>
  		<div class="players">
		    <div class="player">
		    	<div class="player__name">You</div>
		    	<div class="player__line"><div class="player__hp" :style="{ width: player.hp + '%' }"></div><span>Здоровье</span></div>
		    	<div class="player__line"><div class="player__mp" :style="{ width: player.mp + '%' }"></div><span>Мана</span></div>

		    	<div class="actions">
		    		<div class="actions__title">Атаки</div>
					<button class="button default-color" @click="gameAction('default')">Обычный удар</button>
					<button class="button combo-color" @click="gameAction('combo')">Комбо</button>
					<button class="button magic-color" @click="gameAction('magic')">Заклинание</button>
					<button class="button heal-color" @click="gameAction('heal', 'player')">+20HP</button>
				</div>
		    </div>
		    <div class="player">
		    	<div class="player__name">Monster</div>
		    	<div class="player__line"><div class="player__hp" :style="{ width: monster.hp + '%' }"></div><span>Здоровье</span></div>
		    	<!-- <div class="player__line"><div class="player__mp" :style="{ width: monster.mp + '%' }"></div><span>Мана</span></div> -->
		    </div>
		</div>
		
  </div>
</template>

<script>
export default {
  name: 'Default',
  data () {
    return {
    	attacks: {
    		default: generateRandom(-4,-1),
    		combo: generateRandom(-10,-5),
    		magic: generateRandom(-14,-10),
    		heal: generateRandom(4,12)
    	},
      	player: {
	      	hp: 100,
	      	mp: 100,

      	},
      	monster: {
	      	hp: 100,
      	},
      	info: {
      		winner: null
      	}
    }
  },
  computed: {

  },
  methods: {
  	// атака / лечение указанного персонажа
  	gameAction(variant = 'default', player = 'monster') {
  		let newAction = this.attacks[variant].next().value;

		if(variant == 'default' || variant == 'combo') {
			this[player].hp = getValidAction(this[player].hp, newAction);
		}

		if(variant == 'magic' && this[getOtherPlayer(player)].mp >= 44) { // атака magic отнимает 44 маны:
			this[getOtherPlayer(player)].mp -= 44; 
		}
		if(variant == 'heal' && this[player].mp >= 39) { // heal отнимает 39 маны:
			this[player].mp -= 39; 
		}

		// ответная атака монстра
		// this.player.hp = getValidAction(this.player.hp, -4);

		
		// если у кого-либо hp == 0, игра оконечна, выделить победителя и проигравшего
		// магические атаки только если маны хватает
		// монстр бьет рандомно из существующих атак после каждого действия (можно настраивать)
		// после активации комбо-атаки ее нельзя юзать еще 2 хода
		// N последних действий записывается в лог и выводится на экран
		// после окончания игры предложить перейти на гитхаб или попробовать снова
		// русская и английская версии
		// возможность написать свое имя в заголовке
		// возможность выбрать аватарку - сделать анимации на каждые 10% здоровья + при хиле
		// сделать возможность пригласить друга в игру
		// записывать по желанию счет + ник в облачную бд
		// выводить топ участников
		// описать проект на странице Об игре
		// 
		// адаптивная верстка
		// анимация
		// иллюстрации
		// эффекты

		// выкатить в портфолио
  	}
  }
}

const gameCONFIG = {

};

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

	p {
		margin: 0 0 1rem;

		&:empty {
			display: none;
		}
	}
	&__player {
		color: green;
	}
	&__monster {
		color: red;
	}
}
</style>
