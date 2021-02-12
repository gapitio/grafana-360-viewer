/**
 * The HTML node from the HTML/SVG code.
 *
 * It's a shadow root https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM.
 */

interface HTMLNode extends ShadowRoot {
  onpanelupdate: () => void;
}

declare const htmlNode: HTMLNode;
