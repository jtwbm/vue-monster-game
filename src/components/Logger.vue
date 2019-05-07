<template>
	<div class="logger">
		<ul class="gameActions">
			<li v-for="item in log"><span :class="item.who">{{ item.value }}</span></li>
		</ul>
	</div>
</template>

<script>
export default {
  data () {
    return {
    	log: []
    }
  },
  methods: {
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
	}
  }
}
</script>

<style lang="scss" scoped>
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
