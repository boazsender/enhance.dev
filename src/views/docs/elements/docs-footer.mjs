export default function Footer({ html, state }) {
  const {
    store: { otherLinks },
  } = state
  const links = otherLinks?.community?.items || []

  if (links.length === 0) {
    return ''
  }

  const items = links.map((link) => descriptionLink(link)).join('')

  function descriptionLink(link) {
    const url = link?.url || ''
    const label = link?.label || ''
    const description = link?.description || ''
    return /* html */ `
      <dt>
        <a href="${url}" target="_blank">${label}</a>
      </dt>
      <dd class="mb-4">
        ${description}
      </dd>
    `
  }

  return html`
    <style>
      :host {
        display: block;
      }

      :host > footer {
        color: var(--inky-lily);
        background-color: var(--cloud-ateneo);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
      }
    </style>

    <hr class="block mt3 mb3 border1" />

    <docs-increment></docs-increment>

    <footer class="p0">
      <h3 class="mb-2">Community Resources</h3>
      <dl class="ml-2 list-none leading2">${items}</dl>
    </footer>
  `
}
