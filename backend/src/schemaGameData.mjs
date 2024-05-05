import { buildSchema } from "graphql";
export const schemaGameData = buildSchema(`
    type App {
        appid: String!
        name: String!
    }

    type RequirePC {
        minimum: String
        recommended: String
    }

    type RequireMac {
        minimum: String
        recommended: String
    }

    type RequireLinux {
        minimum: String
        recommended: String
    }

    type Demos {
        appid: Int
        description: String
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
        _480: String!
        max: String!
    }

    type Mp4 {
        _480: String!
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
        ids: [Int!]
        notes: [String!]
    }

    type Esrb {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Pegi {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Usk {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Oflc {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Nzoflc {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Cero {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Kgrb {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Dejus {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Cadpa {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Fpb {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Csrr {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Crl {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type SteamGermany {
        rating_generated: String
        rating: String
        required_age: String
        banned: String
        use_age_gate: String
        descriptors: String
        interactive_elements: String
        display_online_notice: String
    }

    type Ratings {
        esrb: Esrb
        pegi: Pegi
        usk: Usk
        oflc: Oflc
        nzoflc: Nzoflc
        cero: Cero
        kgrb: Kgrb
        dejus: Dejus
        cadpa: Cadpa
        fpb: Fpb
        csrr: Csrr
        crl: Crl
        steam_germany: SteamGermany
    }

    type Data {
        type: String!
        name: String!
        steam_appid: Int!
        required_age: Int!
        is_free: Boolean!
        controller_support: String
        dlc: [Int!]
        detailed_description: String!
        about_the_game: String!
        short_description: String!
        supported_languages: String!
        reviews: String
        header_image: String!
        capsule_image: String!
        capsule_imagev5: String!
        website: String
        pc_requirements: RequirePC!
        mac_requirements: RequireMac!
        linux_requirements: RequireLinux!
        legal_notice: String
        drm_notice: String
        ext_user_account_notice: String
        developers: [String!]!
        publishers: [String!]!
        demos: [Demos!]
        price_overview: OverviewPrice!
        packages: [Int!]!
        package_groups: [PackageGroup!]!
        platforms: Platform!
        metacritic: Metacritic
        categories: [Category!]!
        genres: [Genres!]!
        screenshots: [Screenshots!]!
        movies: [Movies!]!
        recommendations: Recommends!
        achievements: Achivements!
        release_date: ReleaseDate!
        support_info: SupportInfo!
        background: String!
        background_raw: String!
        content_descriptors: ContentDescriptor!
        ratings: Ratings!
    }
    
    type Query {
        fetchGameApp: [App!]!
        fetchGameData(appid: String!): Data!
    }
`)