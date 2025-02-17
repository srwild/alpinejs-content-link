# Alpine Content Link

> [!WARNING]
This plugin is still in development.

An Alpine Plugin for creating linked content inspired by Heydon Pickering‘s [Cards chapter in Inclusive Components](https://inclusive-components.design/cards/).

Wrapping a card or a similar component in an anchor or button element isn’t recommended. When screen readers announce the link or button they use all the content within the anchor element, the text isn’t selectable, and you can’t have multiple interactive elements in the card—nesting an anchor link in an anchor link is… well… do not do that.

## Installation

### CDN

Include the script before Alpine.

```html
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
