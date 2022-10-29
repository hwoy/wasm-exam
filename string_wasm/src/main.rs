#![no_main]

use barebone::export_cffi;

extern "C" {
    fn js_resvstr(_: u32);

}

fn send_str(s: &[u32], f: unsafe extern "C" fn(u32)) {
    for &i in s.iter() {
        unsafe {
            f(i);
        }
    }
}

use ::std::cell::RefCell;

thread_local! {pub static __MSG__:RefCell<Vec<u32>> = RefCell::new(Vec::new());}

#[export_cffi]
fn wasm_test_resv_str(ch: u32) {
    __MSG__.with(|x| x.borrow_mut().push(ch));
}

#[export_cffi]
fn wasm_test_send_str() {
    __MSG__.with(|x| send_str(x.borrow().as_slice(), js_resvstr));
}

#[export_cffi]
fn wasm_clear_buffer() {
    __MSG__.with(|x| x.borrow_mut().clear());
}
