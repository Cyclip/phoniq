import { invoke } from "@tauri-apps/api";

export const search = async (query) => {
    return invoke("search", { query: query }).then(
        (res) => {
            return parseSearchJson(res);
        }
    );
}

function parseSearchJson(json) {
    let data = JSON.parse(json);
    console.log("Parsing", data);

    // const isDefined = (element) => element == undefined;

    let refinements = data.refinements || [];
    
    let videoList = data['contents']['twoColumnSearchResultsRenderer']['primaryContents']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'];

    let rv = [];

    for (let i = 0; i < videoList.length; i++) {
        try {
            let vid = videoList[i]['videoRenderer'];
            console.log(`Found video:`, vid);

            // check if it has official artist badge
            let badges = vid["ownerBadges"];
            let isOfficialArtist = false;
            if (badges != undefined) {
                for (let j = 0; j < badges.length; j++) {
                    if (badges[j]["metadataBadgeRenderer"]["icon"] == "OFFICIAL_ARTIST_BADGE") {
                        isOfficialArtist = true;
                        break;
                    }
                }
            }

            let idValue = vid['videoId'];
            console.log(`id: ${idValue}`);
            let imageValue = vid['thumbnail']['thumbnails'][0]['url'];
            console.log(`image: ${imageValue}`);
            let titleValue = vid['title']['runs'][0]['text'];
            console.log(`title: ${titleValue}`);
            let urlValue = vid['navigationEndpoint']['commandMetadata']['webCommandMetadata']['url'] || "";
            console.log(`url: ${urlValue}`);
            let artistValue = vid['ownerText']['runs'][0]['text'];
            console.log(`artist: ${artistValue}`);
            let durationValue = vid['lengthText']['simpleText'] || "Missing";
            console.log(`duration: ${durationValue}`);
            let descriptionValue = vid["detailedMetadataSnippets"][0]["snippetText"]["runs"][0]["text"] || "";
            console.log(`description: ${descriptionValue}`);
            let officialValue = isOfficialArtist || false;
            console.log(`official: ${officialValue}`);

            rv.push({
                id: idValue,
                image: imageValue,
                title: titleValue,
                url: urlValue,
                artist: artistValue,
                duration: durationValue,
                description: descriptionValue,
                official: officialValue
            });
        }
        catch(err) {
            console.log(`error while parsing video json: ${err}`);
        }
    };

    console.log("Returning", rv);

    return [rv, refinements];
}