new Vue({
    name: 'game',
    el: '#app',

    data: state,

    template: `<div id="#app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" 
            :players="players" />
            <transition>
                <hand :cards="testHand" v-if="!activeOverlay" />
            </transition>
    </div>`,

    mounted () {
        console.log(this.$data === state)
    },

    computed: {
        testCard () {
            return cards.archers
        },
    },

    created () {
        this.testHand = this.createTestHand()
    },

    methods: {
        handlePlay () {
            console.log('You played a card!')
        },

        createTestHand () {
            const cards = []
            // Get the possible ids
            const ids = Object.keys(cards)

            // draw 5 cards
            for ( let i = 0; i < 5; i++ ) {
                cards.push(this.testDrawCard())
            }

            return cards
        },

        testDrawCard () {
            // choose a random card based on the ids
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]
            // Return a new card
            return {
                // unique id for the card
                uid: cardUid++,
                // Id of the definition
                id: randomId,
                // definition object
                def: cards[randomId],
            }
        }
    },

})

// Window resize handling
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})