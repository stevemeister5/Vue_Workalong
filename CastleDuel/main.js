new Vue({
    name: 'game',
    el: '#app',

    data: state,

    template: `<div id="#app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" 
            :players="players" />
            <transition name="hand">
                <hand :cards="testHand" v-if="!activeOverlay" @card-play="testPlayCard" />
            </transition>
    </div>`,

    

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
        },

        testPlayCard (card) {
            // Remove the card from player hand
            const index = this.testHand.indexOf(card)
            this.testHand.splice(index, 1)
        }
    },

})

// Window resize handling
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})