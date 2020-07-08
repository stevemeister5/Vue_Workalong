// New VueJS instance 
new Vue({
    // CSS selector of the root DOM element 
    el: '#notebook',

    // Some Data
    data () {
        return {
            content: 'This is a note.',
        }
    },

    // Computed properties
    computed: {
        notePreview () {
            // Markdown rendered to HTML
            return marked(this.content)
        },
    },

    // change watchers 
    watch: {
        // watching content data property
        content: {
            handler: 'saveNote',
        },
    },

    // Called when the instance is ready 
    created() {
        // Set the content to the stored value
        this.content = localStorage.getItem('content') || 'You can write in **markdown**'
    },

    // Methods 
    methods: {
        saveNote (val) {
            console.group('saving note:', val)
            localStorage.setItem('content', val)
        },
    },

})