import map from '../../http/get-index/node_modules/@architect/importmap/browser/index.mjs'
export default function EnhanceRunnerTemplate({ html }) {
  return html`
    <script type="module">
      import API from '${map.api}'
      import enhance from '${map.enhance}'
      import beautify from '${map.beautify}'
      import Prism from '${map.prism}'

      class EnhanceRunner extends HTMLElement {
        constructor() {
          super()
          this.api = API()
          this.update = this.update.bind(this)
          this.allEditors = document.querySelectorAll('code-editor')
          this.editorNames = []
          this.allDocs = this.allEditors.forEach(
            (editor, i) => (this.editorNames[i] = editor.docName)
          )
          this.api.repl.create({ name: 'enhanceMarkup', doc: '' })
          this.api.repl.create({ name: 'iframeSrc', doc: '' })
        }

        connectedCallback() {
          this.api.subscribe(this.update, this.allDocs)
        }
        disconnectedCallback() {
          this.api.unsubscribe(this.update)
        }

        async update(docs) {
          const { entrySrc = '', component1Src = '', component2Src = '' } = docs

          const userDoc = await process({
            entrySrc,
            component1Src,
            component2Src
          })
          this.api.repl.update({
            name: 'enhancedMarkup',
            doc: userDoc.enhancedMarkup
          })
          this.api.repl.update({
            name: 'iframeSrc',
            doc: userDoc.iframeSrc
          })

          async function process(repl) {
            const entryFunction = funkifyEntry(repl.entrySrc)
            const component1Function = funkifyComponent(repl.component1Src)
            const tagName1 = getTagName(repl.component1Src)
            const component2Function = funkifyComponent(repl.component2Src)
            const tagName2 = getTagName(repl.component2Src)
            const elements = {}
            if (tagName1) elements[tagName1] = component1Function()
            if (tagName2) elements[tagName2] = component2Function()
            const html = enhance({ elements })
            const handler = await entryFunction({ html, elements, enhance })
            const previewDoc = await handler()
            //  const prettyMarkup = prettier
            //    .format(previewDoc.document, {
            //      parser: 'babel',
            //      plugins: [parserBabel, parserHtml]
            //    })
            //    .replace(new RegExp('&', 'g'), '&amp;')
            //    .replace(new RegExp('<', 'g'), '&lt;')
            const prettyMarkup = beautify.html_beautify(previewDoc.document)
            const enhancedMarkup = Prism.highlight(
              prettyMarkup,
              Prism.languages.markup,
              'markup'
            )
            return {
              enhancedMarkup: enhancedMarkup,
              //enhancedMarkup: previewDoc.document
              //  .replace(new RegExp('&', 'g'), '&amp;')
              //  .replace(new RegExp('<', 'g'), '&lt;'),
              iframeSrc: previewDoc.document
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
            }
          }

          function funkifyEntry(str) {
            const AsyncFunction = Object.getPrototypeOf(
              async function () {}
            ).constructor
            const patternImport = new RegExp(
              /import(?:["'\\s]*([\\w*\${}\\n\\r\\t, ]+)from\\s*)?["'\\s]["'\\s](.*[@\\w_-]+)["'\\s].*;?$/,
              'mg'
            )
            const funcString = str
              ?.replace(/export default/, 'return ')
              ?.replace(/^\\s*import\\s*enhance\\s*from.*$/gm, '')
              ?.replace(patternImport, "const $1= (await import('$2')).default")
            const funcStringWithScope =
              ' const {enhance={},html={},elements={}}= args; return (async function(){ ' +
              funcString +
              ' })()'
            const newFunc = new AsyncFunction('args', funcStringWithScope)
            return newFunc
          }

          function funkifyComponent(str) {
            const funcString = str?.replace(/export default/, 'return ')
            const newFunc = new Function(funcString)
            return newFunc
          }
          function getTagName(text) {
            return text?.replace(
              new RegExp(
                /^(.|\\n|\\r)*^\\s*customElements.define\\(['"]([a-zA-Z\\-0-9]*)['"](.|\\n|\\r)*$/,
                'mg'
              ),
              '$2'
            )
          }
        }
      }
      customElements.define('enhance-runner', EnhanceRunner)
    </script>
  `
}
