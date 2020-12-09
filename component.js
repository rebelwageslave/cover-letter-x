// {
//     "find" : "foo"
//     replace: "bar"
// }

const bus = new Vue()



Vue.component('variable', {
    props: ['variable', 'index'],
    template: `<div class="card">
  <div class="card-body bg-light">
        <form class="form-inline">
  <label class="sr-only" for="inlineFormInputName2">Variable</label>
  <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="{NAME}" v-model="variable.find">
    &nbsp; in the template will be replaced with &nbsp;
  <label class="sr-only" for="inlineFormInputGroupUsername2">Value</label>
  <div class="input-group mb-2 mr-sm-2">
    <input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="ex: Jhon"  v-model="variable.replace">
  </div>
   <div class="input-group mb-2 mr-sm-2">
    <button class="btn btn-danger btn-sm" @click="removeElement()" type="button">Delete</button>
  </div>
</form>
  </div>
</div>`,
    methods: {
        removeElement() {
            bus.$emit("remove-element", this.index )
        }
    }
})


Vue.component('variable-list', {

    template: `

        <template v-for="(variable, i) in variableList">
            
                    <variable :variable="variable" :index="i"></variable>
               
            </template>
            <br/>
            <button class="btn btn-sm btn-primary" @click="addNewVariable()">Add new variable</button>
            <button class="btn btn-sm btn-success" @click="saveVariables()">Save</button>
    `,

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