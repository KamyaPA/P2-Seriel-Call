import {H, P, S} from './config.js';
import {call, callParalel} from "./call.js";
const R = [];
import http from 'http';
import url from 'url';
export const server = http.createServer(async (req, res)=>{
		R.push(url.parse(req.url).query.match(/[^&]+/g).reduce((p, c)=>{
		let v = c.split("=");
		console.log(v);
		return p[v[0]] = v[1];
	}, {}));
	switch (req.url){
		case "/pokemons": 
			R.push(await call(S,{domain:"PokeAPI",endpoint:"Pokemon",argv:[{key:"pokemon",value:R[0]["pokemon"]}],filter:"{name=>name moves:[:{move:{name[=]moves}}]}"}));
			R.push(await callParalel(S,R[1]["moves"].map((_v,_i,_a) => ({domain:"PokeAPI",endpoint:"Move",argv:[{key:"move",value:_v}],filter:"{name=>name power=>pow}"}))));
			console.log(R);
			res.statusCode = 200;
			res.write(JOSN.stringify(R));
			res.send;
			res.end();
			res.close();
		break;
	}
});
server.listen(P,H,()=>{console.log(`Server is running on ${H}:${P}`);
 });

