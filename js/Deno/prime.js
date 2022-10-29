const source = await Deno.readFile("prime_wasm.wasm");
const typedArray = new Uint8Array(source);

WebAssembly.instantiate(typedArray, {
	env: {}
}).then(result => {
	const isPrime = result.instance.exports.isPrime;

	function printPrime(a, b) {
		for (let i = a; i <= b; ++i) {
			if (isPrime(i) == 1) {
				console.log(`${i}`);
			}
		}
	}


	function usage(pname) {
		console.log(`${pname} is a prime number generator`);
		console.log(`${pname} num`);
		console.log(`${pname} num1 num2`);
	}

	if (Deno.args.length < 1 || Deno.args.length > 2) {
		usage("prime.js");
	}
	
	else{

		let a = 1;
		let b = 1;

		if (Deno.args.length == 1) {
			b = parseInt(Deno.args[0],10);
		} else if (Deno.args.length == 2) {
			a = parseInt(Deno.args[0], 10);
			b = parseInt(Deno.args[1], 10);
		}

		if (a != NaN && b != NaN && a > 0 && b > 0) {
			printPrime(a, b);
		} else {
			console.log('Not a positive number!')
		}
	}
});