// This file WILL NOT run it contains bits and pieces for creating a js server
// All this is so that the IDE likes the code

	// Code used variables
	let rtn, s /*Server*/;

	// User set variables 
	let _0_, _1_, _2_, _3_, _4_, _5_, _6_, _7_, _8_, _9_;

	// Others
	let errorRemover;

//# Setup #
import {H, P, S} from './config.js';
import {call, callParalel} from "./call.js";
const R = [];
//@


//# Setup HTTP #
import http from 'http';
import url from 'url';
export const server = http.createServer(async (req, res)=>{
	let u = url.parse(req.url);
	if(u.query){
		R.push(u.query.match(/[^&]+/g).reduce((p, c)=>{
			let v = c.split("=");
			p[v[0]] = v[1];
			console.log(p);
			return p;
		}, {}));
	}
	console.log(u);
	switch (u.pathname){_0_}
});
//@

//# Create Endpoint #
case _0_:
	console.log("Hello");
	_1_
	break;
//@

//# Default Endpoint #
default:
	_0_
	break;
//@

//# Create Response #
	res.setHeader("Content-Type", "application/json");
	res.statusCode = 200;
	res.write(_0_);
	res.send;
	res.end();
	res.close();
//@

//# Start Server #
	server.listen(P,H,()=>{
		console.log(`Server is running on ${H}:${P}`);
	});
//@

//# Single Call #
R.push(await call(S,_0_));
console.log(R);
//@

//# Multi Call #
R.push(await callParalel(S,_0_));
console.log(R);
//@
errorRemover = 
//# Call Object #
{domain:_0_,endpoint:_1_,argv:_2_,filter:_3_}
//@

//# Map #
R[_0_][_1_].map((_v,_i,_a) => (_2_))
//@
