const source = await Deno.readFile("string_wasm.wasm");
const typedArray = new Uint8Array(source);

let msg = '';

WebAssembly.instantiate(typedArray, {
	env: {
		js_resvstr: (result) => {
			msg = msg + String.fromCharCode(result);
		}
	}
}).then(result => {

	const wasm_test_send_str = result.instance.exports.wasm_test_send_str;
	const wasm_test_resv_str = result.instance.exports.wasm_test_resv_str;
	const wasm_clear_buffer = result.instance.exports.wasm_clear_buffer;

	function getCharCodes(s) {
		let charCodeArr = [];

		for (let i = 0; i < s.length; i++) {
			let code = s.charCodeAt(i);
			charCodeArr.push(code);
		}

		return charCodeArr;
	}

	function js_sendstr(s) {
		const arr = getCharCodes(s);

		wasm_clear_buffer();

		for (let i = 0; i < arr.length; i++) {
			wasm_test_resv_str(arr[i]);
		}
	}

	msg = '';
	js_sendstr("Hello.");
	wasm_test_send_str();
	console.log(msg);

	msg = '';
	js_sendstr("My name is Hwoy(หวอย).");
	wasm_test_send_str();
	console.log(msg);

	msg = '';
	js_sendstr("I'm fine, thank you.");
	wasm_test_send_str();
	console.log(msg);

});