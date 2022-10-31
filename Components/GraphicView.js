import JsonModel from "../Models/JsonModel.js"
import JsonView from "./JsonView.js"

export default {
    props: {
        codeToParse: String
    },
    components:{
        JsonView
    },
    data(){
        return{
            jsonDataModel: {},
            code: "",
            nodes: [],
            nodeDivs: [],
            segues: [],
        }
    },
    methods: {
        renderGraphic(){
            this.code = this.$props.codeToParse
            this.jsonDataModel = JSON.parse(this.code)
            this.drawTree(this.jsonDataModel)
        },
        drawTree(jsonObj){
            let rootNode = new JsonModel.JsonNode(jsonObj, null, null)
            this.nodes.push(rootNode)
            console.log("drawTree : this.nodes", this.nodes)
            console.log("drawTree : node", rootNode)
        },
        nodeNotify(key, index, element){
            let tempArr = this.nodes.splice(0, index+1);
            let prevNode = this.nodes[tempArr.length-1]
            let newNode = new JsonModel.JsonNode(tempArr[tempArr.length-1].jsonObject[key], prevNode, null)
            tempArr.push(newNode)
            this.nodes = tempArr
            this.nodeDivs.push(element)

        },
        drawSegue(element){
            console.log(this.nodeDivs)
            if(this.nodeDivs.length > 1){
                let prevElement = this.nodeDivs[this.nodeDivs.length - 1]
                var posAL = {
                    x: prevElement.offsetLeft - 8,
                    y: prevElement.offsetTop  + prevElement.offsetHeight / 2
                  };
                  var posnARight = {
                    x: prevElement.offsetLeft + prevElement.offsetWidth + 8,
                    y: prevElement.offsetTop  + prevElement.offsetHeight / 2    
                  };
                  var posBL = {
                    x: element.offsetLeft - 8,
                    y: element.offsetTop  + element.offsetHeight / 2
                  };
                  var posnBRight = {
                    x: element.offsetLeft + element.offsetWidth + 8,
                    y: element.offsetTop  + element.offsetHeight / 2
                  };

                let posA = { x: prevElement.offsetRight-8 + prevElement.offsetWidth+8, y:prevElement.offsetTop  + prevElement.offsetHeight / 2 }
                let posB = { x: element.offsetLeft-8, y:element.offsetTop  + element.offsetHeight / 2 }
                let strLeft = "M" + (posAL.x) + "," + (posAL.y) + " " + "C"
                + (posAL.x - 100) + "," + (posAL.y) + " " +
                + (posBL.x - 100) + "," + (posBL.y) + " "
                + (posBL.x) + "," + (posBL.y); 
                console.log(posA);
                this.$refs.arrowLeft.setAttribute("x1", posA.x);
                this.$refs.arrowLeft.setAttribute("x2", posB.x);
                this.$refs.arrowLeft.setAttribute("y1", posA.y);
                this.$refs.arrowLeft.setAttribute("y2", posB.y);
            }
        }
    },
    mounted(){
        this.renderGraphic()
    },
    template:`
    <div id='graphicViewDiv'>
    <button @click="renderGraphic">Render</button>
    <div>
    <!--
        <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="3" refY="5"
                markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
                <g fill="none" stroke="red" stroke-width="2" marker-end="url(#arrowhead)">
                    <line ref="arrowLeft"/>
                </g>
            </defs>
        </svg>
        -->
        <div v-for="(obj, index) in nodes">
            <json-view :json-object="obj.jsonObject" @elementPosChange="drawSegue" :json-key="'key'" @notifyNode="(key, elementRef) => nodeNotify(key, index, elementRef)"></json-view>
        </div>
    </div>
    </div>
    `
}