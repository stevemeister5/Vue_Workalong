Vue.component('castle', {
    template: `<div class="castle" :class="'player-' + index">
        <img class="building" :src="'svg/castle' + index + '.svg'" />
        <img class="ground" :src="'svg/ground' + index + '.svg'" />
        <!-- Later, we will add a castle-banners component here -->
        <castle-banners :player="player" />
    </div>`,
    props: ['player', 'index'],
})

Vue.component('castle-banners', {
    template: `
        <div class="banners">
            <!-- Food -->
            <img class="food-icon" src="svg/food-icon.svg" />
            <!-- Bubble here -->
            <bubble type="food" :value="player.food" :ratio="foodRatio" />
            <!-- Banner bar here -->
            <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />

            <!-- Health -->
            <img class="health-icon" src="svg/health-icon.svg" />
            <!-- Bubble here -->
            <bubble type="health" :value="player.health" :ratio="healthRatio" />
            <!-- Banner bar here -->
            <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />

        </div>
    `,
    props: ['player'],

    computed: {
        foodRatio () {
            return this.player.food / maxFood
        },
        healthRatio () {
            return this.player.health / maxHealth
        },
    },
})


Vue.component('bubble', {
    template: `<div class="stat-bubble" :class="type + '-bubble'"
    :style="bubbleStyle">
        <img :src="'svg/' + type + '-bubble.svg'" />
        <div class="counter">{{ value }}</div>
    </div>`,
    props: ['type', 'value', 'ratio'],
    computed: {
        bubbleStyle () {
            return {
                top: (this.ratio * 220 + 40) * state.worldRatio + 'px',
            }
        },
    },
})

Vue.component('banner-bar', {
    template: '#banner',
    props: ['color', 'ratio'],
    computed: {
        height () {
            return 220 * this.ratio + 40
        },
    },
})