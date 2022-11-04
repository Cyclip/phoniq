#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate ureq;
extern crate fastrand;
extern crate lazy_static;
extern crate regex;

pub mod yt;
pub mod constants;
pub mod commands;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            // commands list
            commands::search_command::search
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
