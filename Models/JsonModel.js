class JsonNode{
    constructor(jsonObject, prevNode, nextNode){
        this.jsonObject = jsonObject
        this.prevNode = prevNode
        this.nextNode = nextNode
    }
}

export default { JsonNode }