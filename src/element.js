/* eslint-env browser */
import sparkline from "./sparkline";

export default class Sparkline extends HTMLOListElement {
	createdCallback() {
		this.viz = document.createElement("pre");
		this.insertBefore(this.viz, this.firstChild);

		this.update = this.update.bind(this);

		// monitor content changes
		let observer = new MutationObserver(this.update);
		observer.observe(this, { childList: true });
	}

	attachedCallback() {
		this.update();
	}

	update() {
		let items = this.querySelectorAll("li");
		let numbers = [].map.call(items, item => parseFloat(item.textContent));

		this.viz.textContent = sparkline(numbers);
	}
}
