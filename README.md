# Alpine Content Link

> This plugin is still in development.

An Alpine Plugin that add `x-content-link` directive for creating linked content. Inspired by Heydon Pickering‘s [Cards chapter in Inclusive Components](https://inclusive-components.design/cards/).

Wrapping a card or a similar component in an anchor or button element isn’t recommended. When screen readers announce the link or button they use all the content within the anchor element, the text isn’t selectable, and you can’t have multiple interactive elements in the card—nesting an anchor link in an anchor link is… well… do not do that.

## Installation

### CDN

Include the script before Alpine. Change `x.x.x` to use a specific version.

```html
<script defer src="https://cdn.jsdelivr.net/npm/@srwild/alpinejs-content-link@x.x.x/dist/cdn.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM Package

```shell
npm install @srwild/alpinejs-content-link
```

```js
import Alpine from 'alpinejs';
import ContentLink from '@srwild/alpinejs-content-link';

Alpine.plugin(ContentLink);

window.Alpine = Alpine;
window.Alpine.start();
```

## Usage

```html
<ul>
  <li x-content-link>
    <img src="..." alt="...">
    <h2><a href="https://www.thing.com">Main Link</a></h2>
    <p>Text...</p>
  </li>

  <li x-content-link>
    <img src="..." alt="...">
    <h2><a href="https://www.thing.com">Merrymac Farm Sanctuary</a></h2>
    <p>Text... <a href="https://www.thing.com/nothing">Nested link</a> ...</p>
  </li>
</ul
```

🐈‍⬛ Adopt don’t shop 🐈‍⬛
