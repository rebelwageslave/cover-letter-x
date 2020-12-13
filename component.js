// {
//     "find" : "foo"
//     replace: "bar"
// }

const bus = new Vue()



Vue.component('variable', {
    props: ['variable', 'index'],
    template: '#variable_template',
    methods: {
        removeElement() {
            bus.$emit("remove-element", this.index )
        }
    }
})


Vue.component('variable-list', {

    template: '#variable_list_template',

    data() {
        return {
            variableList: []
        }
    },


    methods: {
        addNewVariable() {
            this.variableList.push({
                find: "",
                replace: ""
            })
        },

        saveVariables() {
            console.log(this.variableList)
            chrome.storage.sync.set({"variableList": this.variableList})
        }

    },

    created: function () {

        let self = this
        // get the list from api.
        chrome.storage.sync.get("variableList", function (data) {
            let list = data.variableList
            if (!list) {
                list = [{
                    find: "",
                    replace: ""
                }]
            }
            Vue.set(self, "variableList", list)
        })

        bus.$on('remove-element', function ( index ) {
            self.variableList.splice(index, 1);
        })
    }

})

new Vue({el: '#variables'})