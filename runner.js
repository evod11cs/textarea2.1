let frame = query("iframe")[0]

function run() {
	let idoc = frame.contentWindow.document
	idoc.open()

	let content = `
	${html.getValues()}
	<style>
	${css.getValues()}
	</style>
	<script>
	${js.getValues()}
	</script>
	`

	idoc.write(content)
	idoc.close()
}
run()

function autoRun(){
  autoR = !autoR
}