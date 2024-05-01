export const resolverGameData = {
    fetchGameApp: async function () {
        const response = await fetch("https://api.steampowered.com/ISteamApps/GetAppList/v2/");
        const json = await response.json();
        const { applist } = json;
        const { apps } = applist;
        return apps;
    },
    fetchGameData: async function ({ appid }) {
        const response = await fetch(`http://store.steampowered.com/api/appdetails/?appids=${appid}`);
        const json = await response.json();
        const { data } = json[appid];
        data.movies.forEach(movie => {
            if (Object.prototype.hasOwnProperty.call(movie.webm, "480")) {
                Object.defineProperty(movie.webm, "_480", Object.getOwnPropertyDescriptor(movie.webm, "480"));
                delete movie.webm["480"];
            }

            if (Object.prototype.hasOwnProperty.call(movie.mp4, "480")) {
                Object.defineProperty(movie.mp4, "_480", Object.getOwnPropertyDescriptor(movie.mp4, "480"));
                delete movie.mp4["480"];
            }
        });
        return data;
    }
}