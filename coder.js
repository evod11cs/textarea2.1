let ides = []
let tabs = []

let x = 0
let y = 30

let html = new Editor(1)
let css = new Editor(2)
let js = new Editor(3)


html.start(x,y)
css.start(x,y)
js.start(x,y)
ides = [html,css,js]

tab_html = new Tab(ides,html)
tab_css = new Tab(ides,css)
tab_js = new Tab(ides,js)
tabs = [tab_html,tab_css,tab_js]

tab_html.addTab(tabs)
tab_css.addTab(tabs)
tab_js.addTab(tabs)

tab_html.start("index.html")
tab_css.start("style.css")
tab_js.start("script.js")





