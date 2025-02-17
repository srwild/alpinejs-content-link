function ContentLink(Alpine) {
  Alpine.directive('content-link', (el, {}, { cleanup }) => {
    const interactiveElements = el.querySelectorAll('a, button');
    if (!interactiveElements.length) return;

    const firstInteractiveElement = interactiveElements[0];
    el.style.cursor = 'pointer';

    let clickStartTime;
    const isQuickClick = () => Date.now() - clickStartTime < 200;

    const handleMouseDown = () => {
      clickStartTime = Date.now();
    };

    const handleMouseUp = (event) => {
      // Ignore the click if the target is a nested link or button other than the main link
      if (
        event.target.closest('a, button') &&
        event.target !== firstInteractiveElement
      )
        return;

      // Trigger the primary link click if it's a quick click
      if (isQuickClick()) {
        firstInteractiveElement.click();
      }
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseup', handleMouseUp);

    // Cleanup event listeners when the directive is destroyed
    cleanup(() => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseup', handleMouseUp);
    });
  });
}

export default ContentLink;
