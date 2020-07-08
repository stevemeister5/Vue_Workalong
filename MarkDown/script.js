// Date filter 
Vue.filter('date', time => moment(time)
    .format('DD/MM/YY, HH:mm') )

// New VueJS instance 
new Vue({
    // CSS selector of the root DOM element 
    el: '#notebook',

    // Some Data
    data () {
        return {

            notes: JSON.parse(localStorage.getItem('notes')) || [],
            
            // ID of the selected note
            selectedId: localStorage.getItem('selected-id') || null,
            
        }
    },

    // Computed properties
    computed: {
        notePreview () {
            // Markdown rendered to HTML
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },

        addButtonTitle () {
            return this.notes.length + ' note(s) already'
        },

        selectedNote() {
            // Return the matching note with selectedId
            return this.notes.find(note => note.id === this.selectedId)
        },

        sortedNotes () {
            return this.notes.slice()
                .sort((a, b) => a.created - b.created)
                .sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite? -1 : 1)
        },

        linesCount () {
            if(this.selectedNote) {
                // Count the number of new line characters
                return this.selectedNote.content.split(/\r\n|\r|\n/).length
            }
        },

        wordsCount () {
            if (this.selectedNote) {
                var s = this.selectedNote.content
                // Turn new line characters into white-spaces
                s = s.replace(/\n/g, ' ')
                // Exclude start and end white-spaces
                s = s.replace(/(^\s*)|(\s*$)/gi, '')
                // Turn 2 or more duplicate white-spaces into 1
                s = s.replace(/\s\s+/gi, ' ')
                // Return the number of spaces
                return s.split(' ').length
            }
        },

        characterCount () {
            if (this.selectedNote) {
                return this.selectedNote.content.split('').length
            }
        },
    },

    // change watchers 
    watch: {
    //     // watching content data property
    //     content: {
    //         handler: 'saveNote',
    //     },
        notes: {
            // Handler and method name
            handler: 'saveNotes',

            // Watch for nested changes
            deep: true,
        },

        // Save the former selection
        selectedId(val) {
            localStorage.setItem('selected-id', val)
        },

    },

    // Called when the instance is ready 
    // created() {
    //     // Set the content to the stored value
    //     this.content = localStorage.getItem('content') || 'You can write in **markdown**'
    // },

    // Methods 
    methods: {
        // saveNote (val) {
        //     console.group('saving note:', val)
        //     localStorage.setItem('content', val)
        // },

        // Add a note with some default content and select it
        addNote () {
            const time = Date.now()
            // Default new note
            const note = {
                id: String(time),
                title: 'New note ' + (this.notes.length + 1),
                content: '**Hi!** This noteboook is using [markdown] for formattign!',
                created: time,
                favorite: false,
            }

            // add to the list 
            this.notes.push(note)
        },

        selectNote (note) {
            this.selectedId = note.id
        },

        saveNotes () {
            // Stringify JSON before storing
            localStorage.setItem('notes', JSON.stringify(this.notes))
            console.log('Notes saved!', new Date() )
        },

        removeNote () {
            if (this.selectedNote && confirm('Delete the note?')) {
                // Remove the note from the array
                const index = this.notes.indexOf(this.selectedNote)
                if (index !== -1) {
                    this.notes.splice(index, 1)
                }
            }
        },

        favoriteNote() {
            this.selectedNote.favorite ^= true
        },
    },

})