class Editor{
    constructor(pos){
        this.lines = 0
        this.ideValues = ""
        this.rawValues = ""
        this.pos = pos
        this.ideValueList = []
        this.numberLine = false
        this.numbersWidth = 30;
        this.width = 600;
        this.height = 600;
        this.x = 0
        this.y = 0
        this.lineHeight = 27;
        this.fontSize = 17;
    }


    setupAll(){
      this.div = document.createElement("div");
      this.textarea = document.createElement("textarea");
      this.number = document.createElement("div");
      this.textBar = document.createElement("span")
      this.textBar.id = "textBar"
      this.div.id = "textDiv" + this.pos;
      this.textarea.id = "editor" + this.pos;
      this.number.id = "numbers" + this.pos;
      this.textarea.style.width = this.width + "px"
      this.textarea.style.height = this.height + "px"   
      this.textarea.spellcheck = false   

      document.body.appendChild(this.textarea)
      document.body.appendChild(this.div)
      document.body.appendChild(this.number)
    }
    getValues(){
      return this.rawValues
    }
    setupTextarea(){
      let style = `
      

body{
	margin: 0;
}

#editor${this.pos},#textDiv${this.pos}{
  outline: none;
	position: absolute;
	left:${this.numbersWidth + this.x}px;
  top:${this.y}px;
	background: black;
	font-family: monospace;
	color: white;
	width:${this.width}px;
	height:${this.height}px;
	resize: none;
	border: none;
	font-size: ${this.fontSize}px;
  font-weight:400;
	margin:0;
}

#numbers${this.pos}{
  position:absolute;
  left:${this.x}px;
  top:${this.y}px;
	height: ${this.height - 17}px;
	max-height: ${this.height - 17}px;
	display: inline-block;
	background-color: rgba(100,120,130,0.5);
	overflow: hidden;
}

#editor${this.pos}{
	/*visibility: hidden;*/
/*	opacity: 0;*/
  line-height: ${this.lineHeight}px;
  padding: 0;
	color: black;
	caret-color:white;
	background-color: rgba(0,0,0,0);
	mix-blend-mode: lighten;
	overflow: scroll;
	overflow-x: scroll;
	white-space: pre;
}

#numbers${this.pos} span{
	display: flex;
  flex-direction: row;
	height: ${this.lineHeight}px !important;
	width:${this.numbersWidth}px;
  min-height: ${this.lineHeight}px;
}

#textDiv${this.pos} span{
  display: flex;
  flex-direction: row;
	height: ${this.lineHeight}px !important;
  min-height: ${this.lineHeight}px;
}

.num{
	color: white;

}



#textDiv${this.pos}{
	position: absolute;
	max-width: ${this.width - 17}px;
	max-height: ${this.height - 17}px;
	overflow: hidden;
  padding-top:3px;
	width:${this.width - 17}px;
	z-index: -1;
}

#textDiv${this.pos}::-moz-selection{
	background-color: unset;
	color: unset;
}

#editor${this.pos}::-moz-selection{
	background-color: rgba(200,200,200,0.3);
	color: rgba(0,0,0,0);
}

#textDiv${this.pos}::selection{
	background-color: unset;
	color: unset;
}

#editor${this.pos}::selection{
	background-color: rgba(200,200,200,0.3);
	color: rgba(0,0,0,0);
}




.tag{
	color: green;
}
.active{
	background-color: rgb(68,60,51);
}
      `
      let elt = document.createElement("style")
      elt.innerHTML = style
      document.body.appendChild(elt)
    }

    setDiv(value){
        this.div.style.left = this.textarea.offsetLeft + "px"
        this.div.style.top = this.textarea.offsetTop + "px"
        this.div.innerHTML = value
        let x = this.div.innerHTML.replace(/&lt;(.*?)&gt;/g,"<font class='tag'>&lt;$1&gt;</font>")
        this.div.innerHTML = x
    }

    setValue(value){
        this.textarea.value = value
        this.reLines()
            this.setDiv(this.ideValues)
            this.createLineNumber()
    }

    getRows(){
        return this.textarea.value.split(/\n/).length;
    }

    locateCursor(){
        let loc = this.textarea.selectionStart + 1
        let list = this.textarea.value.split(/\n/)
        let pLen = 0
        let line = 1
        for (var i = 0; i < list.length; i++) {
            let p = list[i]
            pLen += p.length + 1
            if (pLen  >= loc){
                let l2 = Math.abs((p.length + 1) - Math.abs((pLen  - (loc))))
                if (l2 != 0){
                    l2 --;
                }
                return [l2,i]
                break;
            }
            line++;
        }

    }
    currentLine(){
        return this.locateCursor()[1]
    }
    reLines() {
        this.lines = this.textarea.value.split(/\n/).length
        let v = this.textarea.value.split(/\n/)
        this.valueList = v
        this.ideValues = ""
        let newLine = ""
        this.rawValues = ""
        for (var i = 0; i < this.lines; i++) {
            this.rawValues += v[i]
            this.textarea.innerHTML = v[i]
            this.textarea.innerHTML = this.textarea.innerHTML.replace(/\s/g,"&nbsp;")
            this.ideValueList.push(newLine + `<span class="lol${i}">${this.textarea.innerHTML}</span>`)
            this.ideValues += `<span class="lol${i}">${this.textarea.innerHTML}</span>`
            newLine = "<br>"
            this.textarea.innerHTML = ""
        }
        this.cursorEnd = this.textarea.selectionStart
        return this.lines
    }

    start(x,y){
      this.x = x
      this.y = y
      this.setupAll()
      this.cursorEnd = this.textarea.selectionStart
      this.cursorLocation = this.locateCursor()
      this.rows = this.getRows()
      this.createLineNumber()
      this.setupTextarea()
        this.reLines()
        this.setDiv(this.ideValues)
        this.textarea.focus()
        this.textarea.oninput = (e) =>{
            this.reLines()
            this.setDiv(this.ideValues)
            this.createLineNumber()
            if (autoR){
            run()
            }
        }

        this.textarea.onscroll = (e) =>{
            this.div.scrollTop = this.textarea.scrollTop 
            this.div.scrollLeft = this.textarea.scrollLeft
            if (this.numberLine){
                this.number.scrollTop = this.textarea.scrollTop
            }
        }
        this.textarea.onkeydown = (e)=>{
            setTimeout(()=>{
                if (this.numberLine){
                this.createLineNumber()
            }
            },10);
        }

        this.textarea.onclick = (e) =>{
              setTimeout(()=>{
                if (this.numberLine){
                this.createLineNumber()
            }
            },10);
        }
        this.textarea.onselect = (e) =>{
          this.createLineNumber()
        }
    }
    display(type){
      if (type == "hide"){
        this.number.style.visibility = "hidden"
        this.textarea.style.visibility = "hidden"
        this.div.style.visibility = "hidden"
      }
      else{
        this.number.style.visibility = "visible"
        this.textarea.style.visibility = "visible"
        this.div.style.visibility = "visible"
      }
    }
    createLineNumber(){
        this.numberLine = true
        let nums = this.getRows()
        let lineElt = [this.number]

        let newLine = ""
        lineElt[0].innerHTML = ""
        for (var i = 0; i < nums; i++) {
            let elt = document.createElement("span")
            elt.className = "num"
            if (this.currentLine() == i){
                elt.className += " active"
            }
            elt.innerHTML = i + 1
            lineElt[0].appendChild(elt)
            // lineElt[0].appendChild(document.createElement('br'))
        }
    }
}