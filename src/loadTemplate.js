import fs from 'fs';


// Setup
function loadTemplates(){
	let templateStr = fs.readFileSync("./template.js", "utf-8");
	let templateArr = templateStr.match(/(?<=(\/\/#))[^@]+(?=(\/\/@))/gm);
	let templateObj = {};
	templateArr.forEach((string) => {
		let strArr = string.split("#").map(value => value.trim().replace(/\s+/g,' '));
		templateObj[strArr[0]] = strArr[1];
	});
	return templateObj;
}

const templates = loadTemplates();
const RAW = "<@raw>"

// Creating the .js file
/*export function createFunctions(objectTemplate){
	let rtn = setTemplate("Setup").slice(RAW.length);
	rtn += setTemplate("Setup HTTP", [
		setTemplate("Default Endpoint", [
			setTemplate("Create Response", [
				"Hello World"
			])
		])
	]).slice(RAW.length);
	rtn += setTemplate("Start Server").slice(RAW.length);
	return rtn;
}
*/
export function createFunctions(objectTemplate){
	let rtn = setTemplate("Setup").slice(RAW.length);
	rtn += setTemplate("Setup HTTP", [setTemplate("Create Endpoint", [
		"/pokemons",
		setTemplate("Single Call", [
			setTemplate("Call Object", [
				"PokeAPI",
				"Pokemon",
				[{key : "pokemon", value : RAW + 'R[0]["pokemon"]'}],
				"{name=>name moves:[:{move:{name[=]moves}}]}"
			])
		]) +  setTemplate("Multi Call",[
			setTemplate("Map", [
				1, "moves",
				setTemplate("Call Object", [
					"PokeAPI",
					"Move",
					[{key : "move", value : RAW + '_v'}],
					"{name=>name power=>pow}"
				])
			])
		]).slice(RAW.length) +
		setTemplate("Create Response", [RAW + "JSON.stringify(R)"]).slice(RAW.length),
	])]).slice(RAW.length);
	rtn += setTemplate("Start Server").slice(RAW.length);
	return rtn;
}


// Helping functions
function setTemplate(template, parameters = []){
	let templateStr = templates[template];
	let argumentStr;
	parameters.forEach((parameter, index) => {
		templateStr = templateStr.replace(`_${index}_`, createJsStr(parameter));
	})
	return RAW + templateStr;
}

// Creates the right formatted string for java Script to replace the parameters  
function createJsStr(parameter){
	if(Array.isArray(parameter)){
		return createArrStr(parameter);
	} else {
		switch(typeof(parameter)){
			case 'boolean':
			case 'number':
				return parameter.toString();
			case 'string':
				if(parameter.slice(0, RAW.length) === RAW){
					return parameter.slice(6);
				} else {
					return '"' + parameter + '"';
				}
			case 'object':
				return createObjStr(parameter);
		}
	}
}

function createArrStr(parameter){
	let rtn = '[';
	parameter.forEach(value => {
		rtn += createJsStr(value) + ',';
	})
	return rtn.replace(/.$/, ']');
}

function createObjStr(parameter){
	let rtn = '{';
	let keys = Object.keys(parameter);
	let values = Object.values(parameter);

	for(let i in values){
		rtn += keys[i] + ":" +  createJsStr(values[i]) + ',';
	}
	return rtn.replace(/.$/,'}');
}



