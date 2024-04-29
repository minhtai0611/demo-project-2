export const resolverGameData = {
    fetchGameData: async function () {
        const response = await fetch("http://store.steampowered.com/api/appdetails/?appids=264710");
        const json = await response.json();
        const { data } = json["264710"];
        return JSON.stringify(data);
    }
}