import ContentLink from '../src/index';

document.addEventListener('alpine:initializing', () => {
  ContentLink(window.Alpine);
});
