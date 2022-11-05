use crate::constants;

/// Search youtube based on a query
/// CORS bypassing
/// JSON data should be handled by the react app
pub fn search_query(query: &str) -> Result<String, String> {
    let url = format!("https://www.youtube.com/results?search_query={}", query);
    let body = match get_html(url) {
        Ok(x) => x,
        Err(x) => {
            return Err(x.to_string());
        }
    };

    let json_str = constants::REGEX_SEARCH.captures(&body[..]);
    match json_str {
        Some(x) => {
            let cap = match x.get(1) {
                Some(y) => y.as_str(),
                None => {return Err("failed to find capture".to_string());}
            };

            Ok(format!("{{{cap}}}", cap=cap))
        },
        None => {
            return Err("couldn't capture any regex".to_string());
        }
    }
}

/// Get the raw HTML of a url
fn get_html(url: String) -> Result<String, ureq::Error> {
    let body: String = ureq::get(&url[..])
        .set("User-Agent", random_user_agent())
        .call()?
        .into_string()?;
    
    Ok(body)
}

fn random_user_agent() -> &'static str {
    let i = fastrand::usize(..constants::USER_AGENTS.len());

    constants::USER_AGENTS[i]
}