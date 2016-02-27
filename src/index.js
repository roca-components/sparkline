/* eslint-env browser */
import Sparkline from "./element";

export default Sparkline;

document.registerElement("spark-line", {
	prototype: Sparkline.prototype,
	extends: "ol"
});
