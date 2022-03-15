export default function LandingPage({ html }) {
  return html`
    <style>
      .max-h-sm {
        max-height: 16rem;
      }
      .max-w-lg {
        max-width: 48rem;
      }
    </style>
    <div>
      <div
        class="
          m-auto
          max-w-lg
          pt2
          pt4-lg
        "
      >
        <page-header>
          <span slot="title">✨enhance</span>
          <span slot="subtitle">
            The Web Native framework for your Functional Web App
          </span>
        </page-header>
        <email-signup></email-signup>
      </div>
    </div>
  `
}
