const fs = require('fs');
const source = fs.readFileSync("prime_wasm.wasm");
const typedArray = new Uint8Array(source);

WebAssembly.instantiate(typedArray, {
  env: {
  }}).then(result => {
  const isPrime = result.instance.exports.isPrime;
  
  function printPrime(a,b)
  {
	  for(let i=a;i<=b;++i)
	  {
		  if(isPrime(i)==1)
		  {
			  console.log(i);
		  }
	  }
  }
  
  
  function usage(pname)
  {
	  console.log(`${pname} is a prime number generator`);
	  console.log(`${pname} num`);
	  console.log(`${pname} num1 num2`);
  }
  
  if(process.argv.length<3 || process.argv.length>4)
  {
	  const path=require('path');
	  let pname = process.argv[1];
	  path.basename(pname)
	  usage(path.basename(pname));
  }
  
  let a=1;
  let b=1;
  
  if(process.argv.length==3)
  {
	 b=process.argv[2];
  }
  else if(process.argv.length==4)
  {
	a=parseInt(process.argv[2],10);
	b=parseInt(process.argv[3],10);	
  }
  
  if(a!=NaN && b!=NaN && a>0 && b>0){
	  printPrime(a,b);
  }
  else{
	  console.log('Not a positive number!')
  }
});