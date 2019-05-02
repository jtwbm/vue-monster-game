# Monster Game
Игра создана исключительно в учебных целях.

## Установка и запуск

```sh
# Клонируем проект
$ git clone https://github.com/jtwbm/vue-monster-game.git
# Переходим в папку проекта
$ cd vue-monster-game
```
Если вы используете NPM:
```sh
# Устанавливаем зависимости
$ npm install
# Запуск проекта в режиме разработки (по умолчанию localhost:8080)
$ npm run dev
# Минифицированная продакшн-версия
$ npm run build
```
Если вы используете Yarn:
```sh
# Устанавливаем зависимости
$ yarn install
# Запуск проекта в режиме разработки (по умолчанию localhost:8080)
$ yarn run dev
# Минифицированная продакшн-версия
$ yarn run build
```

## О проекте
Идея игры проста: есть игрок и монстр, которого нужно победить с помощью разных атак (обычная, комбо, заклинание). В процессе битвы игрок может произнести заклинание лечения, если здоровье на критическом уровне.

В качестве основы проекта использовался стандартный Vue.js [шаблон webpack ](https://github.com/vuejs-templates/webpack).

В данный момент трудно сказать, какие технологии, кроме стандартных html, css/sass и js я буду использовать -- раздел будет пополняться по мере написания игры.

## Основные условия (ТЗ)
- ![check](https://github.com/jtwbm/vue-monster-game/blob/master/static/check.png) Есть несколько вариантов действий: обычная атака, комбо, заклинание, лечение
- ![check](https://github.com/jtwbm/vue-monster-game/blob/master/static/check.png) После каждой атаки монстр генерирует случайную атаку на игрока
- ![check](https://github.com/jtwbm/vue-monster-game/blob/master/static/check.png) Игра закончена, если у кого-либо HP === 0. Подсчет ведется за 1 раунд (ход игрока, ход монстра). Т. е. если в конце раунда у обеих сторон здоровье на нуле -- получается ничья
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Магические атаки и лечение происходят за счет маны. Если ее не хватает, то атака не может быть выполнена.
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Мана восстанавливается по 10 ед. за ход
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) После комбо-атаки ею нельзя пользоваться следующие 2 хода
- ![check](https://github.com/jtwbm/vue-monster-game/blob/master/static/check.png) N последних действий игрока и монстра вносятся в историю событий и выводится на экран
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) После окончания игры дать возможность пройти ее снова
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Адаптивная верстка
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Анимировать и застилизовать эффекты и приложение в целом
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Вывести README на страницу About

## Дополнительные условия (хорошо бы сделать)
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) 2 режима игры: однопользовательский и многопользовательский
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Создать простую логику атак монстра: максимально эффективная атака в приоритете + если здоровье на низком уровне -- монстр будет лечиться, если хватает маны
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Создать разные уровни сложности
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Сделать возможность ввести игроку свое имя
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Русская и английская версии
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Нарисовать и анимировать несколько монстров и игрока (мужчина/женщина) с анимацией на каждые 10% HP
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Записывать в БД счет игрока (по желанию)
- ![uncheck](https://github.com/jtwbm/vue-monster-game/blob/master/static/no.png) Выводить ТОП участников