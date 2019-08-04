<template>
    <div>
        <h1>{{ title }}</h1>
        <h5>Total: {{ totalNotes }}</h5>

        <div class="form mb-4">
            <div class="form-group">
                <label>Note title</label>
                <input
                        class="form-control"
                        :class="inputsValidity.title ? 'valid' : 'invalid'"
                        type="text"
                        v-model="note.title"
                        @keyup="validateTitle"
                >
            </div>
            <div class="form-group">
                <label>Note text</label>
                <input
                        class="form-control"
                        :class="inputsValidity.text ? 'valid' : 'invalid'"
                        type="text"
                        v-model="note.text"
                        @keyup="validateText"
                >
            </div>
            <div class="form-group">
                <label>Email</label>
                <input
                        class="form-control"
                        :class="inputsValidity.email ? 'valid' : 'invalid'"
                        type="text"
                        v-model="note.email"
                        @keyup="validateEmail"
                >
            </div>
            <button
                    class="btn btn-primary"
                    :disabled="!isValidInputs"
                    @click="addNote">
                Submit
            </button>
        </div>


        <div class="mb-4 text-left">
            <label class="font-weight-bold">Sort by:</label>
            <div class="btn-group" role="group">
                <button type="button" :class="isSortedByTitle ? 'btn btn-secondary' : 'btn btn-success'"
                        @click="sortByDate">
                    Date
                </button>
                <button type="button" :class="isSortedByTitle ? 'btn btn-success' : 'btn btn-secondary'"
                        @click="sortByTitle">
                    Title
                </button>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 col-sm-9 col-lg-4 note" v-for="(note, index) in notes">
                <div class="card">
                    <div class="card-block m-1">
                        <button class="close" @click="removeNote(index)">x</button>
                        <h4 class="card-title d-inline">
                            {{ note.title }}
                            <button class="btn btn-outline-secondary btn-sm py-0 copy-button"
                                    @click="copyNote(index)">
                                duplicate
                            </button>
                        </h4>
                        <h6 class="card-subtitle mb-2 mt-1 text-muted">
                            {{ note.dateNum | formatDate }} - {{ note.email }}
                        </h6>
                        <p class="card-text">{{ note.text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Notes',
                isSortedByTitle: false,
                note: {
                    title: '',
                    text: '',
                    email: ''
                },
                inputsValidity: {
                    title: false,
                    text: false,
                    email: false
                },
                notes: [
                    {
                        title: 'B - Visited Hawaii',
                        text: 'I loved the beaches and delicious fresh coconuts',
                        dateNum: Date.now(),
                        email: 'some@mail.com'
                    },
                    {
                        title: 'A - Visited London',
                        text: 'I loved the beaches and delicious fresh coconuts',
                        dateNum: Date.now() + 1,
                        email: 'some@mail.com'
                    }
                ]
            }
        },
        computed: {
            totalNotes() {
                return this.notes.length;
            },
            isValidInputs() {
                return this.inputsValidity.title
                    && this.inputsValidity.text
                    && this.inputsValidity.email;
            }
        },
        methods: {
            addNote(){
                let { text, title, email } = this.note;
                this.notes.push({
                    text,
                    title,
                    email,
                    dateNum: Date.now()
                });
                this.note = {
                    title: '',
                    text: '',
                    email: ''
                };
                if (this.isSortedByTitle) {
                    this.sortByTitle(true);
                }
                this.inputsValidity = {
                    title: false,
                    text: false,
                    email: false
                };
            },
            removeNote(index){
                this.notes.splice(index, 1)
            },
            copyNote(index){
                let { text, title, email } = this.notes[index];
                this.notes.push({
                    text,
                    title: title + "(copy)",
                    email,
                    dateNum: Date.now()
                });
                if (this.isSortedByTitle) {
                    this.sortByTitle(true);
                }
            },
            validateEmail() {
                let email = this.note.email;
                let re = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;

                this.inputsValidity.email = re.test(String(email).toLowerCase());
            },
            validateTitle() {
                let title = this.note.title || '';
                let re = /^[A-Z]\s*\S{2,}/;    // только латиница

                this.inputsValidity.title = re.test(title);
            },
            validateText() {
                let re = /\b\w+\b/g;    // только латиница
                let text = this.note.text || '';

                this.inputsValidity.text =
                    (text.match(re) || []).length > 2
            },
            sortByDate() {
                if (!this.isSortedByTitle) {
                    return;
                }
                this.notes.sort((note1, note2) =>
                { return note1.dateNum - note2.dateNum });

                this.isSortedByTitle = false;
            },
            sortByTitle(forced) {
                if (this.isSortedByTitle && !forced) {
                    return;
                }
                this.notes.sort((note1, note2) =>
                { return (note1.title > note2.title) ? 1 : -1 });

                this.isSortedByTitle = true;
            }
        },
        filters: {
            formatDate: function (dateNum) {
                if(!dateNum) return '';
                let dateObj = new Date(dateNum);
                let day = dateObj.getDate();
                let month = dateObj.getMonth();
                let year = dateObj.getFullYear().toString();

                day = day < 10 ? 0 + day.toString() : day.toString();
                month = month < 10 ? 0 + month.toString() : month.toString();

                return `${day}.${month}.${year}`;
            }
        }
    }
</script>

<style scoped>
    .form {
        text-align: left;
    }
    .card {
        text-align: left;
        border: 1px solid #2c3e50;
        border-radius: 4px;
        padding-left: 8px;
        padding-right: 8px;
    }
    .note {
        padding: 5px;
    }
    .copy-button {
        margin-top: -5px;
    }
    input[type="text"] {
        -webkit-appearance:none;
    }
    input[type="text"]:focus {
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,0.2);
    }
    input[type="text"].valid {
        border: 1px solid lightgreen;
    }
    input[type="text"].valid:focus {
        border: 2px solid lightgreen;
    }
    input[type="text"].invalid {
        border: 1px solid lightcoral;
    }
    input[type="text"].invalid:focus {
        border: 2px solid lightcoral;
    }
</style>
