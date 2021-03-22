'use strict';

// Variables
const result = document.getElementById('result');
const equal = document.getElementById('equal');
let numbers = [];
let operation = ['', false];
let res;
let record;
let charactersMax = 11;
let point = 0;

function insert(num) {
	if (result.textContent.length == charactersMax) {
		alert('Sorry You dont write more numbers. This is the Limit');
	} else {
		result.textContent += num;
	}
}

function insertPoint() {
	if (point == 0 && result.textContent.length > 0) {
		result.textContent += '.';
		point = 1;
	}
}

function pressOperations(sign) {
	if (operation[1] !== true) {
		numbers[0] = result.textContent;
		operation[0] = sign;
		operation[1] = true;
		result.textContent += sign;
		point = 0;
	}
}

function showRecord() {
	result.textContent = record;
}

function insertParenthesis() {
	if (result.textContent.length === 0) {
		result.textContent = '(';
	} else if (result.textContent.includes('(') &&
			 !(result.textContent.includes(')'))) {
		result.textContent += ')';
	} else if (result.textContent.length > 0) {
		pressOperations('*(');
	}
}

function changeSign() {
	let number = parseFloat(result.textContent);
	if (isNaN(number) &&
	    result.textContent.length == 0) {
		result.textContent = '-';
	} else if (number > 0) {
		number = '-' + number;
		result.textContent = number;
	} else {
		number = number.toString().replace('-', '');
		result.textContent = number;
	}
}

function delet() {
	let index = '';
	let lastIndex = result.textContent.length;
	let string = result.textContent;
	result.textContent = string.substring(index.length, lastIndex - 1);
}

function reset() {
	numbers = [];
	operation = ['', false];
	result.textContent = '';
	res = '';
	point = 0;
	result.removeAttribute('class');;
}

function verifyLength(result, max) {
	result = result.toString();
	if (result.length > max) {
		let rest = result.length - max;
		result = result.substring(0, result.length - rest);
		return result;
	} else {
		return result;
	}
}

function takeFirstNumber() {
	let number = numbers[0];
	if (number.includes('(')) {
		number = number.replace('(', '');
		console.info(number)
		return number;
	} else {
		return number;
	}
}

function takeSecondNumber() {
	let number = '';
	let display = result.textContent;
	let index;

	if (display.includes('+')) {
		index = display.indexOf('+') + 1;
		number = display.substring(index, display.length);
		return number;

	} else if (display.includes('-')) {
		index = display.indexOf('-') + 1;
		number = display.substring(index, display.length);
		return number;

	} else if (display.includes('*(')) {
		index = display.indexOf('(') + 1;
		number = display.substring(index, display.length);
		return number;

	} else if (display.includes('*')) {
		index = display.indexOf('*') + 1;
		number = display.substring(index, display.length);
		return number;

	} else if (display.includes('/')) {
		index = display.indexOf('/') + 1;
		number = display.substring(index, display.length);
		return number;

	} else if (display.includes('%')) {
		index = display.indexOf('%') + 1;
		number = display.substring(index, display.length);
		return number;
	}
}

function resolve() {
	numbers[0] = takeFirstNumber();
	numbers[1] = takeSecondNumber();
	console.log(`${numbers[0]}, ${numbers[1]}`)
	if (operation[0] == '+') {
		res = parseFloat(numbers[0]) + parseFloat(numbers[1]);
	} else if (operation[0] == '-') {
		res = parseFloat(numbers[0]) - parseFloat(numbers[1]);
	} else if (operation[0] == '*' || operation[0] == '*(') {
		res = parseFloat(numbers[0]) * parseFloat(numbers[1]);
	} else if (operation[0] == '/') {
		res = parseFloat(numbers[0]) / parseFloat(numbers[1]);
	} else if (operation[0] == '%') {
		let numPercentage = parseFloat(numbers[0]);
		let numTotal = parseFloat(numbers[1]);
		res = (numPercentage * numTotal) / 100;
	}
	res = verifyLength(res, charactersMax);
	record = res;
	result.classList.add('green');
	result.textContent = res;
}
