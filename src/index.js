import {call, callParalel} from './call.js';

const server = "http://localhost:8080/graphql";

function CallParameters(){

}


const callResults = [];
function addResults(result){
	callResults.push(result);
}

addResults(await call(server, {
			domain : "PokeAPI", 
			endpoint : "Pokemon", 
			argv : [{key : "pokemon", value :"charmander"}], 
			filter : "{name=>name moves:[between 1..20:{move:{name[=]moves}}]}",
	})
);

let paralellObj = callResults[0].moves.reduce((prev, cur) => {
		prev.push({
			domain : "PokeAPI",
			endpoint : "Move",
			argv : [{key: "move", value : cur}],
			filter : "{name=>name power=>pow pp=>pp accuracy=>acc}"
		})
		return prev
	}, [])

addResults(await callParalel(server, paralellObj));

console.log(callResults);

