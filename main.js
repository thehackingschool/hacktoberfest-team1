const Vue = require("vue")

import GraphicView from "./Components/GraphicView.js"

const WorkArea = Vue.createApp({
    components:{
        GraphicView
    },
    data(){
        return{
            code: ""
        }
    },
    methods: {
    }
}).mount("#mainDiv")