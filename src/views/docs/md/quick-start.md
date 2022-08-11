---
title: Getting Started
---

To create a project, run:

```bash
npm create @enhance ./myproject -y
```

After setup is complete, run the following commands to install deps, and start the local dev server:

```bash
cd myproject
npm install
npm start
```

## Index route

Once you app starts up, navigate to [http://localhost:3333](http://localhost:3333).
The source for the index page can be found in your app at `app/pages/index.html`.

```
app
└── pages ............. file based routing
    └── index.html
```

## Add a route

Add a new route at the `"/about"` URL by creating a new file called `about.html` in the `pages` folder at `app/pages/about.html`

You can add something like this:
```html
<!-- app/pages/about.html -->
Hello world, I am <i>very</i> <strong>excited</strong> to meet you.
```

Reload the app, and navigate to [`http://localhost:3333/about`](http://localhost:3333/about) to see your new page in action!

## Reuse code with custom elements

Add an `"elements"` folder to your app at `app/elements`.

Your project should now look like this:
```
app
├── elements .......... define pure functions that return custom elements
└── pages ............. file based routing
    ├── about.html
    └── index.html
```

Add a pure function that returns an html string.
Your function will be passed an object containing an `html` render function for expanding custom elements.

Add a `my-header.mjs` file in the `app/elements/` folder.

The contents of `my-header.mjs` should look like this:
```javascript
// app/elements/my-header.mjs
export default function MyHeader({ html }) {
  return html`
<header>
  <h1>Header</h1>
  <nav>
    <a href=/>home</a>
    <a href=/about>about</a>
  </nav>
</header>`
}
```

Your project should now look like this:
```
app
├── elements .......... define pure functions that return custom elements
│   └── my-header.mjs
└── pages ............. file based routing
    ├── about.html
    └── index.html
```

Modify `app/pages/about.html` to include your new custom element header:

```html
<!-- app/pages/about.html -->
<my-header></my-header>
Hello world, I am <i>very</i> <strong>excited</strong> to meet you.
```

Reloading your app will show the new header with working navigation to and from `"/about"`.

## That's it

You are off to a great start! You now know how to add routes, pages, and elements.
