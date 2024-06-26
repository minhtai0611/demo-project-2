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
                name
                thumbnail
                mp4 {
                    _480
                    max
                }
                webm {
                    _480
                    max
                }
            }
            package_groups {
                description
                display_type
                is_recurring_subscription
                name
                save_text
                selection_text
                title
                subs {
                    can_get_free_license
                    is_free_license
                    option_description
                    option_text
                    packageid
                    percent_savings
                    percent_savings_text
                    price_in_cents_with_discount
                }
            }
            price_overview {
                currency
                discount_percent
                final
                final_formatted
                initial
                initial_formatted
            }
            platforms {
                windows
                linux
                mac
            }
            categories {
                description
                id
            }
            recommendations {
                total
            }
            drm_notice
            ext_user_account_notice
            legal_notice
            reviews
            detailed_description
            about_the_game
            content_descriptors {
                notes
            }
            linux_requirements {
                minimum
                recommended
            }
            mac_requirements {
                minimum
                recommended
            }
            pc_requirements {
                minimum
                recommended
            }
            ratings {
                esrb {
                    descriptors
                    interactive_elements
                    rating
                }
                oflc {
                    descriptors
                    interactive_elements
                    rating
                }
                nzoflc {
                    descriptors
                    interactive_elements
                    rating
                }
                pegi {
                    descriptors
                    interactive_elements
                    rating
                }
            }
            price_overview {
                currency
            }
            achievements {
                highlighted {
                    name
                    path
                }
                total
            }
            genres {
                description
                id
            }
            website
            metacritic {
                score
                url
            }
            demos {
                appid
                description
            }
        }
    }
`;

export async function FetchGameData(appid) {
    try {
        const response = await fetch("http://localhost:3000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: gameDataQuery, variables: { appid } })
        });
        if (!response.ok) {
            throw new Error("Fail to fetch game data");
        }
        const json = await response.json();
        const data = await json?.data?.fetchGameData;
        if (!data) {
            throw new Error("Game not found");
        }
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
        const data = await json?.data?.fetchGameApp;
        return data;
    }
    catch (err) {
        console.log(err.message);
    }
}