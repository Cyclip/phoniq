use crate::yt::search::search_query;

#[tauri::command]
pub async fn search(query: String) -> String {
    match search_query(&query[..]) {
        Ok(x) => x,
        Err(x) => {
            return x;
        }
    }
}