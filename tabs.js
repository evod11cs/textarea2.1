let autoR = false

function fx(){
  this.ides.forEach(p=>{
      p.display("hide")
    })
    this.tabs.forEach(p=>{
      p.tab.style.borderBottomColor = "red";
      p.tab.style.backgroundColor = "rgb(236, 6, 6)"
    })
  this.ide.display("show")
  this.tab.style.borderBottomColor = "rgb(0,0,160)";
  this.tab.style.backgroundColor = "rgba(230, 45, 1, 0.966)"
}


class Tab{
  constructor(ides,ide){
    this.ides = ides
    this.ide = ide
    this.tabs = []
    this.name = ""
  }
  addTab(t){
    this.tabs = t
  }

  createTab(name){
    this.name = name
    this.tab = document.createElement("button")
    this.tab.className = "tab " + name
    this.tab.innerHTML = name
    this.createEvent()
    let don = query("#tabs")[0]
    don.appendChild(this.tab)
  }
  createEvent(){
    this.tab.onclick = (e) =>{
      fx.call(this)
    }
  }
  start(name){
    this.createTab(name)
  }
}