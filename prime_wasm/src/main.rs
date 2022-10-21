#![no_main]

#[no_mangle]
pub extern "C" fn isPrime(num: u32) -> u32 {
    libprime::is_prime(num) as u32
}
