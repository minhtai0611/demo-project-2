const gameDataQuery = `
    query ($appid: String!) {
        fetchGameData (appid: $appid) {
            type
            name
            steam_appid
            required_age
            is_free
            controller_support
            short_description
            supported_languages
            header_image
            capsule_image
            capsule_imagev5
            website
            release_date {
                date
            }
            developers
            publishers
            screenshots {
                id
                path_full
            }
            movies {
                id
                thumbnail
                mp4 {
                    _480
                    max
                }
            }
        }
    }
`;

const gameDataVariables = {
    appid: "2195250"
}

export async function FetchGameData() {
    try {
        const response = await fetch("http://localhost:3000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: gameDataQuery, variables: gameDataVariables })
        });
        if (!response.ok) {
            throw new Error("Fail to fetch game data");
        }
        const json = await response.json();
        const data = await json.data.fetchGameData;
        return data;
    }
    catch (err) {
        console.log(err.message);
    }
}

const gameAppQuery = `
    {
        fetchGameApp {
            appid
            name
        }
    }
`;

export async function FetchGameApp() {
    try {
        const response = await fetch("http://localhost:3000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: gameAppQuery })
        });
        if (!response.ok) {
            throw new Error("Fail to fetch game app");
        }
        const json = await response.json();
        const data = await json.data.fetchGameApp;
        return data;
    }
    catch (err) {
        console.log(err.message);
    }
}