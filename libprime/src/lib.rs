use std::ops::{Mul, Range, Rem};

pub fn is_prime<T>(num: T) -> bool
where
    T: Copy + Clone + From<u8> + PartialOrd + Mul<Output = T> + Rem<Output = T>,
    Range<T>: Iterator<Item = T>,
{
    if num < 2u8.into() {
        false
    } else {
        (2u8.into()..num)
            .take_while(|&x| (x * x) <= num)
            .all(|x| (num % x) != 0u8.into())
    }
}
