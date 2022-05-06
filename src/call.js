import fetch from 'node-fetch';


// calls the api server with a specific domain, filter and argumets 
export async function call(server, domain, endpoint, argv, filter){
	let argvStr = argv.reduce((prev, cur) => prev += '"' + cur.key + '=' + cur.value + '",', "")
	return (await fetch(`${server}?query={call(api:"${domain}/${endpoint}",argv:[${argvStr}],filter:"${filter}")}`, {
		method : "GET"
	}).then(res => res.json()).then(body => body)).data.call;
}

export async function callParalel(calls){
	return await Promise.all(calls);
}



