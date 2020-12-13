// {
//     "find" : "foo"
//     replace: "bar"
// }

const bus = new Vue()


/**
* A single variable template, sync the props
* to the parent element.
**/
Vue.component('variable', {
    props: ['variable', 'index'],
    template: '#variable_template',
    methods: {
        removeElement() {
            bus.$emit("remove-element", this.index )
        },
        updateParent(value, type) {
            bus.$emit( "update:"+type, this.index, value)
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

        bus.$on( "update:find", function (index, value) {
            self.variableList[index].find = value
        })

        bus.$on( "update:replace", function (index, value) {
              self.variableList[index].replace = value
            
        })
    }

})

new Vue({el: '#variables'})