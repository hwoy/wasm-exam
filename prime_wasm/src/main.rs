#![no_main]

use barebone::export_cffi;

#[export_cffi]
fn isPrime(num: u32) -> u32 {
    libprime::is_prime(num) as u32
}
