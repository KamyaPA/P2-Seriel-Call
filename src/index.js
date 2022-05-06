import {call, callParalel} from './call.js';

const server = "http://localhost:8080/graphql";

const callResults = [];
function addResults(result){
	callResults.push(result);
}

addResults(await callParalel([
	call(server, "PokeAPI", "Pokemon", [{key : "pokemon", value : "squirtle"}], "{name=>name moves:[:{move:{name[=]moves}}]}"),
]));

addResults(await callParalel(
	callResults[0][0].moves.reduce((prev, cur) => {
		prev.push(call(server, "PokeAPI", "Move", [{key : "move", value : cur}], "{name=>name accuracy=>acc power=>pow pp=>pp}"))
		return prev
	}, [])
));

console.log(callResults);

