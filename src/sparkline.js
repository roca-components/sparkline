// `series` is an array of values
// `width` (optional) is the number of characters to use (two dots each)
//
// adapted from @potch:
// https://gist.github.com/potch/ee16dfec3266c50d2f93
function sparkline(series, width) {
	let len = series.length;
	width = width * 2 || Math.floor(len / 2) * 2;
	let chunk = len / width;
	let scaled = [];
	for(let i = 0; i < width; i++) {
		let start = Math.round(i * chunk);
		let end = Math.min(Math.round(i * chunk + chunk), len);
		let c = series.slice(start, end);
		let ca = c.reduce((_, v) => _ + v, 0) / c.length;
		scaled.push(ca);
	}

	let min = scaled.reduce((_, v) => Math.min(_, v), Infinity);
	let max = scaled.reduce((_, v) => Math.max(_, v), -Infinity);

	let range = max - min;
	let binned = scaled.map(v => Math.round((v - min) / range * 3));

	let res = [];
	for(let i = 0; i < binned.length; i += 2) {
		let a = (3 - binned[i]);
		let b = (3 - binned[i + 1]);
		let n;
		if(a === 3) {
			if(b === 3) {
				n = 0x28C0;
			} else {
				n = 0x2840 + (4 << (b + 1));
			}
		} else {
			if(b === 3) {
				n = 0x2880 + (1 << a);
			} else {
				n = 0x2800 + (1 << a) + (1 << (b + 3));
			}
		}
		res.push(String.fromCodePoint(n));
	}
	return res.join("");
}
