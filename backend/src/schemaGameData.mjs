import { buildSchema } from "graphql";
export const schemaGameData = buildSchema(`
    type App {
        appid: String!
        name: String!
    }

    type RequirePC {
        minimum: String!
        recommended: String!
    }

    type RequireMac {
        minimum: String!
        recommended: String!
    }

    type RequireLinux {
        minimum: String!
        recommended: String!
    }

    type OverviewPrice {
        currency: String!
        initial: Int!
        final: Int!
        discount_percent: Int!
        initial_formatted: String!
        final_formatted: String!
    }

    type Subs {
        packageid: Int!
        percent_savings_text: String!
        percent_savings: Int!
        option_text: String!
        option_description: String!
        can_get_free_license: String!
        is_free_license: Boolean!
        price_in_cents_with_discount: Int!
    }
    type PackageGroup {
        name: String!
        title: String!
        description: String!
        selection_text: String!
        save_text: String!
        display_type: Int!
        is_recurring_subscription: String!
        subs: [Subs!]!
    }

    type Platform {
        windows: Boolean!
        mac: Boolean!
        linux: Boolean!
    }

    type Metacritic {
        score: Int!
        url: String!
    }

    type Category {
        id: Int!
        description: String!
    }

    type Genres {
        id: String!
        description: String!
    }

    type Screenshots {
        id: Int!
        path_thumbnail: String!
        path_full: String!
    }

    type Webm {
        "480": String!
        max: String!
    }

    type Mp4 {
        "480": String!
        max: String!
    }

    type Movies {
        id: Int!
        name: String!
        thumbnail: String!
        webm: Webm!
        mp4: Mp4!
        highlight: Boolean!
    }

    type Recommends {
        total: Int!
    }

    type Highlighted {
        name: String!
        path: String!
    }

    type Achivements {
        total: Int!
        highlighted: [Highlighted!]!
    }

    type ReleaseDate {
        coming_soon: Boolean!
        date: String!
    }

    type SupportInfo {
        url: String!
        email: String!
    }

    type ContentDescriptor {
        ids: [Int!]!
        notes: [String!]!
    }
    type Esrb {
        rating: String!
        use_age_gate: String!
        required_age: String!
        descriptors: String!
        interactive_elements: String!
    }

    type Pegi {
        rating: String!
        descriptors: String!
    }

    type Usk {
        rating: String!
        descriptors: String!
    }

    type Oflc {
        rating: String!
        descriptors: String!
    }

    type Nzoflc {
        rating: String!
        descriptors: String!
    }

    type Kgrb {
        rating: String!
        descriptors: String!
    }

    type Dejus {
        rating: String!
        descriptors: String!
    }

    type Fpb {
        rating: String!
        descriptors: String!
    }

    type Csrr {
        rating: String!
        descriptors: String!
    }

    type Crl {
        rating: String!
    }

    type SteamGermany {
        rating_generated: String!
        rating: String!
        required_age: String!
        banned: String!
        use_age_gate: String!
        descriptors: String!
    }

    type Ratings {
        esrb: Esrb!
        pegi: Pegi!
        usk: Usk!
        oflc: Oflc!
        nzoflc: Nzoflc!
        kgrb: Kgrb!
        dejus: Dejus!
        fpb: Fpb!
        csrr: Csrr!
        crl: Crl!
        steam_germany: SteamGermany!
    }

    type Data {
        type: String!
        name: String!
        steam_appid: Int!
        required_age: Int!
        is_free: Boolean!
        controller_support: String!
        dlc: [Int!]!
        detailed_description: String!
        about_the_game: String!
        short_description: String!
        supported_languages: String!
        header_image: String!
        capsule_image: String!
        capsule_imagev5: String!
        website: String!
        pc_requirements: RequirePC!
        mac_requirements: RequireMax!
        linux_requirements: RequireLinux!
        legal_notice: String!
        drm_notice: String!
        ext_user_account_notice: String!
        developers: [String!]!
        publishers: [String!]!
        price_overview: OverviewPrice!
        packages: [Int!]!
        package_groups: [PackageGroup!]!
        platforms: Platform!
        metacritic: Metacritic!
        categories: [Category!]!
        genres: [Genres!]!
        screenshots: [Screenshots!]!
        movies: [Movies!]!
        recommendations: Recommends!
        achievements: Achivements!
        release_date: ReleaseDate!
        support_info: SupportInfo!
        background: : String!
        background_raw: : String!
        content_descriptors: ContentDescriptor!
        ratings: Ratings!
    }
    
    type Query {
        fetchGameApp: [App!]!
        fetchGameData(appid: String!): Data!
    }
`)