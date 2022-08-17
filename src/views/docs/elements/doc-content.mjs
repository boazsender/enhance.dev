export default function DocContent({ html }) {
  return html`
    <style>
      :host {
        padding: 1rem;
      }
      :host > * {
        max-width: 52rem;
        margin: auto;
      }
      li {
        list-style-position: inside;
      }

      :host > ::slotted([slot]) > * {
        margin-bottom: 1.5rem;
      }

      h1,
      h2,
      h3,
      h4 {
        margin-bottom: 0.75rem;
        font-weight: 500;
      }

      h1 {
        font-size: 1.953rem;
      }

      h2 {
        font-size: 1.563rem;
      }

      h3 {
        font-size: 1.25rem;
      }

      h4 {
        font-size: 1rem;
        font-weight: normal;
      }

      strong {
        color: var(--black-white);
      }
      small {
        color: var(--inky-lily);
      }

      table {
        border: 1px solid var(--smoke-indigo);
      }
      table thead th,
      table tfoot th {
        color: var(--inky-lily);
        background: var(--smoke-indigo);
      }
      table caption {
        padding: 0.5rem;
      }
      table th,
      table td {
        padding: 0.5rem;
        border: 1px solid var(--smoke-indigo);
      }

      blockquote {
        padding: 0.8rem 0.6rem 0.6rem;
        background-color: var(--smoke-indigo);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 1px 0px;
        border-radius: 0.333rem;
      }

      :not(pre) > code {
        padding: 0.1rem 0.2rem;
        line-height: 1rem;
        overflow-wrap: break-word;
        background-color: var(--smoke-indigo);
        font-family: Menlo, Monaco, Consolas, monospace;
        border-radius: 0.25rem;
      }

      blockquote :not(pre) > code {
        background-color: var(--smoke-denim);
      }

      pre button {
        display: none;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        width: 1rem;
        height: 1rem;
        opacity: 0.5;
        color: var(--inky-lily);
      }
      pre:hover button {
        display: block;
      }
      pre button:hover {
        opacity: 1;
      }
      pre button svg {
        width: 1rem;
        height: 1rem;
        pointer-events: none;
      }

      hr {
        border-color: var(--smoke-indigo);
      }
    </style>

    <slot name="doc"></slot>

    <docs-footer></docs-footer>

    <script>
      const codeBlocks = document.querySelectorAll('pre.hljs')
      const svgCopy = '<svg><use xlink:href="#copy"></use></svg>'
      const svgCheck = '<svg><use xlink:href="#check"></use></svg>'

      for (const codeBlock of codeBlocks) {
        codeBlock.classList.add('relative')
        const button = document.createElement('button')
        //button.className = buttonClassList.join(' ')
        button.innerHTML = svgCopy

        button.onclick = (evt) => {
          const target = evt.target
          const parent = target.closest('pre')
          const codeText = parent.querySelector('code').textContent.trim()

          navigator.clipboard.writeText(codeText).then(
            () => {
              target.innerHTML = svgCheck
              setTimeout(() => (target.innerHTML = svgCopy), 2000)
            },
            () => (target.innerHTML = 'Error copying!')
          )
        }

        codeBlock.appendChild(button)
      }
    </script>
  `
}
