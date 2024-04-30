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
        return data;
    }
}