'use strict';

var famous = require('famous');
var _ = require('underscore');

/*jshint -W079 */
var Node = famous.core.Node;/*jshint +W079 */
var FamousEngine = famous.core.FamousEngine;
var Position = famous.components.Position;
var Curves = famous.transitions.Curves;
var DOMElement = famous.domRenderables.DOMElement;

const DOT_SIZE = 35;
const DOT_MARGIN = 1;
const DOT_SIDE = DOT_SIZE + DOT_MARGIN;
const DIMENSION = 12;
const ROWS = DIMENSION;
const COLUMNS = DIMENSION;
const DURATION = 600;
const CURVE = 'outBounce'; //outQuint outElastic inElastic inOutEase inBounce outBounce

const FIGURES = [
	[
		{//             ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 1 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 1 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 2 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 3 //     ║      ║                               //
		} //            ╚══════╝                               //
	],

	[
		{//             ╔══════╗ ╔══════╗ ╔══════╗ ╔══════╗    //
			x: 0, //    ║      ║ ║      ║ ║      ║ ║      ║    //
			y: 0 //     ║      ║ ║      ║ ║      ║ ║      ║    //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝ ╚══════╝    //
		{ //                                                   //
			x: 1, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 3, //                                           //
			y: 0 //                                            //
		} //                                                   //
	],


	[
		{//                      ╔══════╗ ╔══════╗             //
			x: 0, //             ║      ║ ║      ║             //
			y: 1 //              ║      ║ ║      ║             //
		}, //                    ╚══════╝ ╚══════╝             //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 1, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 1 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 2 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                     ╔══════╗ ╔══════╗             //
			x: 1, //             ║      ║ ║      ║             //
			y: 0 //              ║      ║ ║      ║             //
		}, //                    ╚══════╝ ╚══════╝             //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//                      ╔══════╗                      //
			x: 0, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 2 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //            ╔══════╗                               //
			x: 1, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],


	[
		{//                      ╔══════╗                      //
			x: 0, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //            ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 1, //    ║      ║ ║      ║ ║      ║             //
			y: 0 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 1 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 2 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 0, //    ║      ║ ║      ║ ║      ║             //
			y: 0 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 0 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		} //                                                   //
	],

	[
		{//                      ╔══════╗                      //
			x: 0, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 1, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 2 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 0, //    ║      ║ ║      ║ ║      ║             //
			y: 1 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //                                                   //
			x: 1, //                                           //
			y: 1 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 1 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 2 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //                                                   //
			x: 1, //                                           //
			y: 0 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 0, //    ║      ║ ║      ║ ║      ║             //
			y: 0 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //                              ╔══════╗             //
			x: 1, //                      ║      ║             //
			y: 0 //                       ║      ║             //
		}, //                             ╚══════╝             //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//                      ╔══════╗                      //
			x: 0, //             ║      ║                      //
			y: 2 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 0 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 1, //    ║      ║ ║      ║                      //
			y: 1 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 2 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 0, //    ║      ║ ║      ║ ║      ║             //
			y: 0 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 1 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //                                                   //
			x: 1, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 0 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 0 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                     ╔══════╗                      //
			x: 1, //             ║      ║                      //
			y: 1 //              ║      ║                      //
		}, //                    ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 2 //                                            //
		} //                                                   //
	],

	[
		{//                               ╔══════╗             //
			x: 0, //                      ║      ║             //
			y: 1 //                       ║      ║             //
		}, //                             ╚══════╝             //
		{ //            ╔══════╗ ╔══════╗ ╔══════╗             //
			x: 1, //    ║      ║ ║      ║ ║      ║             //
			y: 1 //     ║      ║ ║      ║ ║      ║             //
		}, //           ╚══════╝ ╚══════╝ ╚══════╝             //
		{ //                                                   //
			x: 2, //                                           //
			y: 0 //                                            //
		}, //                                                  //
		{ //                                                   //
			x: 2, //                                           //
			y: 1 //                                            //
		} //                                                   //
	],

	[
		{//             ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 0 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗                               //
			x: 0, //    ║      ║                               //
			y: 1 //     ║      ║                               //
		}, //           ╚══════╝                               //
		{ //            ╔══════╗ ╔══════╗                      //
			x: 0, //    ║      ║ ║      ║                      //
			y: 2 //     ║      ║ ║      ║                      //
		}, //           ╚══════╝ ╚══════╝                      //
		{ //                                                   //
			x: 1, //                                           //
			y: 2 //                                            //
		} //                                                   //
	]
];

const FIGURESCOUNT = 2;

const DOT_STATE__HOVERED = 1;
const DOT_STATE__UNTOUCHED = 0;
const DOT_STATE__PLACED = -1;
const DOT_COLOR__HOVERED = 'rgb(122,199,79)';
const DOT_COLOR__UNTOUCHED = 'rgb(232,116,97)';
const DOT_COLOR__PLACED = 'rgb(10,10,97)';

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Initialize fixed-sized array with incremented values
 * @param {number} length - Length of array
 */
/*jshint -W121 */
if (!Array.prototype.initialize) {
	Array.prototype.initialize = function (length) {
		var arr = [];
		for (var i = 0; i < length; i++) {
			arr.push(i);
		}
		return arr;
	};
}
Array.prototype.max = function() {
	return Math.max.apply(null, this);
};
Array.prototype.min = function() {
	return Math.min.apply(null, this);
};/*jshint -W121 */

function Game(rows, cols) {
	Node.call(this);
	this.domElement = new DOMElement(this, {});

	var count = 0;
	this.dots = [];
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			let dot = new Dot(count++);
			this.addChild(dot);
			this.dots.push(dot);
		}
	}

	this.figures = [];

	this.generateFigure = function generateFigure(figureId) {
		let figures = this.figures || [];
		let rand = getRandomInt(0, FIGURES.length);;

		if (figures.length < 1) {
			figures.push(FIGURES[rand]);
		} else {
			let figuresCount = FIGURESCOUNT;
			let figuresIndexes = [];
			let isFiguresEqual = function(f1, f2) {
				return f1.every(function(element, index) {
					return _.isEqual(element, f2[index]);
				});
			}
			let findIndex = function(figure) {
				return FIGURES.findIndex(function (element) {
					return isFiguresEqual(element, figure);
				});
			}
			let isHashUnique = function(array, hash) {
				if (hash !== figureId) {
					return array.every(function(element) { return element !== hash });
				} else {
					return false;
				}
			}
			for (let i = 0; i < Math.min(figuresCount, figures.length); i++) {
				if (figureId !== i) {
					figuresIndexes.push(figures[i]);
				}
			}
			let figuresHash = [];
			for (let i = 0; i < figuresIndexes.length; i++) {
				figuresHash[i] = findIndex(figuresIndexes[i]);
			}

			while(!isHashUnique(figuresHash, rand)) {
				rand = getRandomInt(0, FIGURES.length);
			}
			figures[figureId] = FIGURES[rand];
		}
	}

	for (let figure = 0; figure < 2; figure++) {
		this.generateFigure(figure);
		console.log('generateFigure', this.figures);
	}

	this.checkFigure = function checkFigure() {
		console.log('checkFigure', this.hoverDots);
		let hovers = this.hoverDots;

		if (hovers.length === 4) {

			let figures = this.figures;
			let dots = this.dots;
			let rows = this.orderRows;
			let columns = this.orderColumns;

			let _rows = hovers.map(function (element) {
				return element % DIMENSION
			});
			let _columns = hovers.map(function (element) {
				return Number.parseInt(element / DIMENSION)
			});

			let virtualRow = [];
			let virtualColumn = [];
			for (let i = 0; i < 4; i++) {
				virtualRow.push(columns.findIndex(function (element) {
					return element === _columns[i]
				}));
				virtualColumn.push(rows.findIndex(function (element) {
					return element === _rows[i]
				}));
			}
			console.log('virtualRow', virtualRow);
			console.log('virtualColumn', virtualColumn);
			let zeroPoint = virtualRow.min() * 10 + virtualColumn.min();

			let data = [];
			for (let i = 0; i < 4; i++) {
				data[i] = {
					x: Math.abs(virtualRow[i] - Number.parseInt(zeroPoint / 10)),
					y: Math.abs((virtualColumn[i] % 10) - (zeroPoint % 10))
				}
			}
			data.sort(function (a, b) {
				var n = a.x - b.x;
				if (n !== 0) {
					return n;
				}
				return a.y - b.y;
			});
			console.log('data', data);

			for (var figure = 0; figure < FIGURESCOUNT; figure++) {
				var f = figures[figure];
				if (f[0].x === data[0].x && f[0].y === data[0].y && f[1].x === data[1].x && f[1].y === data[1].y && f[2].x === data[2].x && f[2].y === data[2].y && f[3].x === data[3].x && f[3].y === data[3].y) {
					for (var j = 0; j < 4; j++) {
						//
					}
					figure = FIGURESCOUNT;
				}
			}
		}
	}

	this.mousing = 0;

	/**
	 * Allow hovering dots by mousemoving
	 * @param {number} id - Id of dot
	 */
	this.mousingDown = function (id) {
		this.mousing = this.dots[id].state ? -1 : +1;
	};
	this.mousingUp = function (id) {
		this.mousing = 0;
	};

	this.hoverDots = [];

	/**
	 * Check dot for hoverability
	 * @param {number} id - Id of dot
	 */
	this.hoverDot = function (id) {
		console.log('this.hoverDots', this.hoverDots);
		if (id !== undefined) {
			if (this.hoverDots.indexOf(id) < 0) {
				if (this.hoverDots.length < 4) {
					this.hoverDots.push(id);
				} else {
					this.dots[this.hoverDots[0]].unhover();
					this.hoverDots.shift();
					this.hoverDots.push(id);
				}
				this.dots[id].hover();
				if (this.hoverDots.length === 4) {
					this.checkFigure();
				}
			}
		}
	};

	this.orderRows = [].initialize(ROWS);
	this.orderColumns = [].initialize(COLUMNS);

	/**
	 * Check lines if dots are stateed
	 */
	/*jshint -W074 */
	this.checkLines = function checkLines() {
		var dots = this.dots;
		var stateedRows = [];
		var stateedColumns = [];
		for (let line = 0; line < DIMENSION; line++) {
			let row = dots.filter((element) => Number.parseInt(element.id / ROWS) === line && element.state === true);
			let column = dots.filter((element) => element.id % COLUMNS === line && element.state === true);
			if (row.length === ROWS) {
				console.log('Filled row: ', line);
				stateedRows.push(line);
			}
			if (column.length === COLUMNS) {
				stateedColumns.push(line);
				console.log('Filled column: ', line);
			}
		}
		stateedRows.sort(function (x, y) {
			if (x < (ROWS / 2)) {
				return y - x;
			} else {
				return x - y;
			}
		});
		stateedColumns.sort(function (x, y) {
			if (x < (COLUMNS / 2)) {
				return y - x;
			} else {
				return x - y;
			}
		});
		for (let row = 0; row < stateedRows.length; row++) {
			this.moveLine(stateedRows[row], 'y');
		}
		for (let column = 0; column < stateedColumns.length; column++) {
			this.moveLine(stateedColumns[column], 'x');
		}
	};/*jshint +W074 */

	/**
	 * Move stateed line
	 * @param {number} id - Id of stateed line
	 */
	/*jshint -W071, -W074 */
	this.moveLine = function moveLine(line, direction) {
		console.log('moveLine', line, direction);
		let orderRows = this.orderRows;
		let orderColumns = this.orderColumns;
		let order = [];
		let lineHash = 0;

		switch (direction) {
		case 'x':
				order = orderColumns;
				lineHash = order.indexOf(line);
				if (line < (COLUMNS / 2)) {
					for (let row = 0; row < ROWS; row++) {
						let dot = this.dots[row * ROWS + order[lineHash]];
						let position = dot.position;
						let x = position.getX();
						position.setX(x - DOT_SIDE * lineHash, {
							duration: DURATION,
							curve: CURVE
						});
						dot.unhover();
					}
					for (let column = lineHash - 1; column >= 0; column--) {
						for (let row = 0; row < ROWS; row++) {
							let dot = this.dots[row * ROWS + order[column]];
							let position = dot.position;
							let x = position.getX();
							position.setX(x + DOT_SIDE, {
								duration: DURATION,
								curve: CURVE
							});
						}
					}
					orderColumns.splice(lineHash, 1);
					orderColumns.unshift(line);
				} else {
					for (let row = 0; row < ROWS; row++) {
						let dot = this.dots[row * ROWS + order[lineHash]];
						let position = dot.position;
						let x = position.getX();
						position.setX(x + DOT_SIDE * (ROWS - 1 - lineHash), {
							duration: DURATION,
							curve: CURVE
						});
						dot.unhover();
					}
					for (let column = COLUMNS - 1; column > lineHash; column--) {
						for (let row = 0; row < ROWS; row++) {
							let dot = this.dots[row * ROWS + order[column]];
							let position = dot.position;
							let x = position.getX();
							position.setX(x - DOT_SIDE, {
								duration: DURATION,
								curve: CURVE
							});
						}
					}
					orderColumns.splice(lineHash, 1);
					orderColumns.push(line);
				}
				break;
		case 'y':
				order = orderRows;
				lineHash = order.indexOf(line);
				if (line < (ROWS / 2)) {
					for (let column = 0; column < COLUMNS; column++) {
						let dot = this.dots[order[lineHash] * COLUMNS + column];
						let position = dot.position;
						let y = position.getY();
						position.setY(y - DOT_SIDE * lineHash, {
							duration: DURATION,
							curve: CURVE
						});
						dot.unhover();
					}
					for (let row = lineHash - 1; row >= 0; row--) {
						for (let column = 0; column < COLUMNS; column++) {
							let dot = this.dots[order[row] * COLUMNS + column];
							let position = dot.position;
							let y = position.getY();
							position.setY(y + DOT_SIDE, {
								duration: DURATION,
								curve: CURVE
							});
						}
					}
					orderRows.splice(lineHash, 1);
					orderRows.unshift(line);
				} else {
					for (let column = 0; column < COLUMNS; column++) {
						let dot = this.dots[order[lineHash] * COLUMNS + column];
						let position = dot.position;
						let y = position.getY();
						position.setY(y + DOT_SIDE * (COLUMNS - 1 - lineHash), {
							duration: DURATION,
							curve: CURVE
						});
						dot.unhover();
					}
					for (let row = ROWS - 1; row > lineHash; row--) {
						for (let column = 0; column < COLUMNS; column++) {
							let dot = this.dots[order[row] * COLUMNS + column];
							let position = dot.position;
							let y = position.getY();
							position.setY(y - DOT_SIDE, {
								duration: DURATION,
								curve: CURVE
							});
						}
					}
					orderRows.splice(lineHash, 1);
					orderRows.push(line);
				}
				break;
		default:
				return false;
		}
	};/*jshint +W071, +W074 */

	var hoverId;

	/**
	 * Fill dot
	 * @param {number} id - Id of dot
	 */
	this.stateDot = function (id) {
		if (id !== undefined && id !== hoverId) {
			this.hoverDot(id);
			this.checkLines();
			hoverId = id;
		}
	};

	// Centering
	this
		.setMountPoint(0.5, 0.5, 0)
		.setAlign(0.5, 0.5, 0)
		.setOrigin(0.5, 0.5, 0)
		.setPosition(0, 0, 0);
	this.layout = new Layout(this);

	this.addUIEvent('mousedown');
	this.addUIEvent('mouseup');
}

Game.prototype = Object.create(Node.prototype);
Game.prototype.constructor = Node;

Game.prototype.onReceive = function onReceive(type, ev) {
	switch (type) {
	case 'mousedown':
			this.emit('x', ev.x).emit('y', ev.y);
			this.mousing = true;
			break;
	case 'mouseup':
			this.emit('x', ev.x).emit('y', ev.y);
			this.mousing = false;
			break;
	default:
			return false;
	}
};

function Layout(node) {
	this.node = node;
	this.id = this.node.addComponent(this);
	this.current = 0;
	this.curve = [Curves.outQuint, Curves.outElastic, Curves.inElastic, Curves.inOutEase, Curves.inBounce];
	this.duration = [0.5 * DURATION, 3 * DURATION, 3 * DURATION, DURATION, 0.5 * DURATION];

	this.next();
}

Layout.prototype.next = function next() {
	if (this.current++ === ROWS) {
		this.current = 0;
	}
	let duration = this.duration[this.current];
	let curve = this.curve[this.current];
	let row = 0;
	let col = 0;
	let dimension = DOT_SIDE;
	let bounds = [-(((dimension) * ROWS / 2) - (dimension / 2)), -(((dimension) * COLUMNS / 2) - (dimension / 2))];
	for (let i = 0; i < this.node.getChildren().length; i++) {
		let x = bounds[0] + ((dimension) * col++);
		let y = bounds[1] + ((dimension) * row);
		let z = 0;
		this.node.dots[i].position.set(x, y, z, {
			duration: i * ROWS + duration,
			curve: curve
		});
		if (col >= COLUMNS) {
			col = 0;
			row++;
		}
	}
};


function Dot(id) {
	Node.call(this);

	// Center dot.
	this
		.setMountPoint(0.5, 0.5, 0)
		.setAlign(0.5, 0.5, 0)
		.setSizeMode('absolute', 'absolute', 'absolute')
		.setAbsoluteSize(DOT_SIZE, DOT_SIZE, DOT_SIZE);

	this.domElement = new DOMElement(this, {
		properties: {
			background: DOT_COLOR__UNTOUCHED
		}
	});

	this.id = id;

	this.state = DOT_STATE__UNTOUCHED;

	this.hover = function hover() {
		if (this.state === DOT_STATE__UNTOUCHED) {
			this.state = DOT_STATE__HOVERED;
			this.domElement.setProperty('background-color', DOT_COLOR__HOVERED);
		}
	};

	this.unhover = function unhover() {
		if (this.state === DOT_STATE__HOVERED) {
			this.state = DOT_STATE__UNTOUCHED;
			this.domElement.setProperty('background-color', DOT_COLOR__UNTOUCHED);
		}
	};

	this.place = function place() {
		if (this.state === DOT_STATE__HOVERED) {
			this.state = DOT_STATE__PLACED;
			this.domElement.setProperty('background-color', DOT_COLOR__PLACED);
		}
	};

	this.unplace = function unplace() {
		if (this.state === DOT_STATE__PLACED) {
			this.state = DOT_STATE__UNTOUCHED;
			this.domElement.setProperty('background-color', DOT_COLOR__UNTOUCHED);
		}
	};

	this.position = new Position(this);

	this.addUIEvent('mousedown');
	this.addUIEvent('mousemove');
	this.addUIEvent('click');
	this.addUIEvent('mouseup');
}

Dot.prototype = Object.create(Node.prototype);
Dot.prototype.constructor = Dot;

/*jshint -W074 */
Dot.prototype.onReceive = function onReceive(type, ev) {
	switch (type) {
	case 'mousedown':
			this._parent.mousingDown(this.id);
			break;
	case 'mousemove':
			if (this._parent.mousing === true) {
				this._parent.stateDot(this.id);
				this.emit('id', this.domElement.id).emit('state', this.domElement.state);
			}
			break;
	case 'click':
			this._parent.stateDot(this.id);
			this.emit('id', this.domElement.id).emit('state', this.domElement.state);
			break;
	case 'mouseup':
			this._parent.mousingUp(this.id);
			break;
	default:
			return false;
	}
};/*jshint +W074 */

FamousEngine.init();
var scene = FamousEngine.createScene();
var game = new Game(ROWS, COLUMNS);
scene.addChild(game);
