use std::env;
use std::str::FromStr;

fn usage(pname: String) {
    eprintln!("{} is a number generator", pname);
    eprintln!("{} num", pname);
    eprintln!("{} num1 num2", pname);
}

fn main() {
    let args: Vec<_> = env::args().skip(1).collect();
    let pname = env::args().nth(0).unwrap();
    let count = args.len();

    if count < 1 || count > 2 {
        usage(pname);
        return;
    }

    let a: Option<u32> = if count == 1 {
        Some(1)
    } else {
        match u32::from_str(args[0].as_str()) {
            Ok(n) => Some(n),
            _ => None,
        }
    };

    let b = match u32::from_str(args[if count == 1 { 0 } else { 1 }].as_str()) {
        Ok(n) => Some(n),
        _ => None,
    };

    match (a, b) {
        (Some(a), Some(b)) => {
            for i in (a..=b).filter(|&x| libprime::is_prime(x)) {
                println!("{}", i);
            }
        }
        _ => eprintln!("Not a positive number!"),
    }
}
