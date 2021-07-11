module.exports = function(pxSize: number) {
	return `${getValue(pxSize) / getValue(16)}rem`
}

function getValue(value: number) {
	return (value / (value * 0 + 1))
}
