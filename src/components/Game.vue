<template>
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
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
	return {}
  },
  computed: {
  	...mapGetters({
      endgame: 'getEndgame',
      winner: 'getWinner',
      player: 'getPlayer',
      monster: 'getMonster'
    })
  },
  methods: {
  	gameRound(actionName = 'default', purpose = 'monster') {
  		// actionName - название атаки/заклинания
  		// purpose - на кого направлена атака/заклинание

  		// атака игрока
  		this._attack(actionName, purpose);

  		// атака монстра
  		// let monsterAttack = this._attack('default', 'player');
  		// this._attack(monsterAttack, monsterAttack === 'heal' ? 'monster' : 'player');

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
  	_attack(actionName = 'default', purpose = 'monster') {
  		// let damage = this.attacks[actionName].next().value;
  		let attackName = 'get' + actionName[0].toUpperCase() + actionName.slice(1) + 'Attack';
  		let damage = this.$store.getters[attackName].next().value;

  		this.$store.commit('setHP', {purpose: purpose, damage: damage});

  		// console.log(attackName);

  		// записать в лог действие
  		// this._logAction(purpose, damage, actionName);
  	},
	// _randomAttack() {
	// 	// генерация рандомной атаки у монстра: default, combo, magic или heal
	// 	return Object.keys(this.attacks)[this._monsterAttack.next().value];
	// }
  }
}

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
</style>
