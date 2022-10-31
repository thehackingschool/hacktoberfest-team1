export default {
    name: 'JsonView',
    props: ['jsonKey', 'jsonObject'],
    emits: ['notifyNode', 'elementPosChange'],
    data(){
        return{
            position:{
                pointerX: undefined,
                pointerY: undefined,
                movementX: 0,
                movementY: 0
            },
            selfRef: {}
        }
    },
    methods: {
        onPointerPress(evt){
            //evt.preventDefault()
            this.position.pointerX = evt.clientX
            this.position.pointerY = evt.clientY
            document.onmousemove = this.startDrag
            document.onmouseup = this.endDrag

        },
        startDrag(evt){
            //evt.preventDefault()

            this.$emit("elementPosChange", this.selfRef)

            this.position.movementX = this.position.pointerX - evt.clientX
            this.position.movementY = this.position.pointerY - evt.clientY
            this.position.pointerX = evt.clientX
            this.position.pointerY = evt.clientY
            this.selfRef.style.top = (this.selfRef.offsetTop - this.position.movementY) + 'px'
            this.selfRef.style.left = (this.selfRef.offsetLeft - this.position.movementX) + 'px'
        },
        endDrag(evt){
            document.onmouseup = null
            document.onmousemove = null
        },
        dragableRef(element){
            this.selfRef = element
        },
        valClick(clickedSub){
            console.log('valClick: clickedSub', clickedSub)
            this.$emit("notifyNode", clickedSub, this.selfRef)
        }
    },
    watch:{
        jsonObject(newVal, oldVal){
            console.log("watch triggered")
        }
    },
    mounted(){
        console("mounted")
        this.$emit("elementPosChange", this.selfRef)
    },
    template:`
    <div class="jsonDiv" :ref="dragableRef" @mousedown="onPointerPress">
    <div v-if="jsonObject != null">
        <p>Type:</p>
        <p :class="typeof jsonObject">{{typeof jsonObject}}</p>

        <!-- This needs to be improved-->


        <p v-if="typeof jsonObject == 'string'" class="value">{{jsonObject}}</p>
        <p v-if="typeof jsonObject == 'number'" class="value">{{jsonObject}}</p>
        <p v-if="typeof jsonObject == 'null'" class="value">{{jsonObject}}</p>
        <p v-if="typeof jsonObject == 'boolean'" class="value">{{jsonObject}}</p>

        <div v-if="Array.isArray(jsonObject)" class="jsonObject">
            <p v-for="(val, KEY) in jsonObject" @click="valClick(KEY)">
                {{KEY}} : {{typeof val}}
            </p>
        </div>

        <div v-else class="jsonObject">
            <p v-for="(val, KEY) in jsonObject" @click="valClick(KEY)">
                {{KEY}} : {{typeof val}}
            </p>
        </div>
    </div>
    </div>
    `
}