// {
//     "find" : "foo"
//     replace: "bar"
// }


Vue.component('variable', {
    props: ['findProp', 'replaceProp'],
    data: function () {
        return {
            find: this.findProp,
            replace: this.replaceProp
        }
    },
    template: `<div class="card">
  <div class="card-body bg-light">
        <form class="form-inline">
  <label class="sr-only" for="inlineFormInputName2">Variable</label>
  <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="{NAME}" v-model="find">
    &nbsp; in the template will be replaced with &nbsp;
  <label class="sr-only" for="inlineFormInputGroupUsername2">Value</label>
  <div class="input-group mb-2 mr-sm-2">
    <input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="ex: Jhon"  v-model="replace">
  </div>
</form>
  </div>
</div>`
})


Vue.component('variable-list', {

    template: `

        <template v-for="variable in variableList">
            
                    <variable :find-prop="variable.find" :replace-prop="variable.replace"></variable>
               
            </template>
            <br/>
            <button class="btn btn-lg btn-primary" @click="addNewVariable()">Add new variable</button>
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
                "replace": ""
            })
        }

    },

    created: function () {

        let self = this
        // get the list from api.
        chrome.storage.sync.get("variableList", function (data) {
            let list = data.variableList
            if (!list) {
                list = [{
                    find: "{NAME}",
                    replace: "Jhon"
                }]
            }
            Vue.set(self, "variableList", list)
        })
    }

})

new Vue({el: '#variables'})