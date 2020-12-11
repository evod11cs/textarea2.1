const setStyles = function(styles, element){
    Object.assign(element.style, styles);
}

function query(sl){
  return document.querySelectorAll(sl)
}

let x = new Editor(1)
x.start(0,0)
x.setValue("<h1></h1>\n<h1></h1>")

let y = new Editor(2)
y.start(530,400)
