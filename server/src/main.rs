use std::fs::OpenOptions;
use std::io::{self, BufRead, Write};

fn write_log(data: &str) -> () {
    let mut file = OpenOptions::new()
        .append(true)
        .create(true)
        .open("log.txt")
        .expect("Unable to open file");

    file.write_all(format!("{}\n", data).as_bytes())
        .expect("Unable to write data")
}

fn main() {
    write_log("SERVER STARTED");
    let stdin = io::stdin();
    for line in stdin.lock().lines() {
        let line = line.expect("Unable to read line from stdin");
        write_log(line.as_str());
        println!("{}", line);
    }
}
