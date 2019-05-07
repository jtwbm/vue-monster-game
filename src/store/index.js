import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
  	state: gameConfig(),
  	getters: {
  		getEndgame: () => state.endgame,
  		getWinner: () => state.winner,
  		getAttack: name => {
  			if(name in state.attacks) {
  				return state.attacks[name];
  			}
  			return false;
  		},
  		getHP: player => {
  			if(player in state) {
  				return state[player].hp;
  			}
  			return false;
  		},
  		getMP: player => {
  			if(player in state && 'mp' in state[player]) {
  				return state[player].mp;
  			}
  			return false;
  		}
  	},
  	mutations: {
  		setEndgame: val => state.endgame = val,
  		setWinner: player => state.winner = player,
  		// setHP: (player, newHP) => {
  		// 	if(player in state) {
  		// 		return state[player].hp;
  		// 	}
  		// 	return false;
  		// }
  	}
});

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
      	}
	}
}

function* generateRandom(min = 1, max = 5) {
	while(true) {
		yield Math.floor(Math.random() * (max - min + 1) + min); // от min до max включительно
	}
}
