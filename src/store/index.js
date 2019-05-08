import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
  	state: gameConfig(),
  	getters: {
  		getEndgame: state => state.endgame,
  		getWinner: state => state.winner,

      // get attacks
      getAttacks: state => state.attacks,
      getDefaultAttack: state => state.attacks.default,
      getComboAttack: state => state.attacks.combo,
      getMagicAttack: state => state.attacks.magic,
      getHealAttack: state => state.attacks.heal,

      getPlayer: state => state.player,
      getMonster: state => state.monster,

      getLog: state => state.log
  	},
  	mutations: {
      reset: state => {
        let config = gameConfig(),
            dataKeys = Object.keys(config);
        
        dataKeys.map(el => {
          state[el] = config[el];
        });
      },
  		setEndgame: (state, val) => state.endgame = val,
  		setWinner: (state, player) => state.winner = player,

      setLog: (state, item) => {
        state.log.unshift(item);
        state.log.length = 3;
      },
      setHP: (state, payload) => {
        state[payload.purpose].hp = state[payload.purpose].hp + payload.damage > 100 ? 100 :
                                      state[payload.purpose].hp + payload.damage < 0 ? 0 :
                                        state[payload.purpose].hp + payload.damage;
      }
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
  	},
    log: []
	}
}

function* generateRandom(min = 1, max = 5) {
	while(true) {
		yield Math.floor(Math.random() * (max - min + 1) + min); // от min до max включительно
	}
}
