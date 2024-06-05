import { FetchGameData } from "../FetchGameDataComponent/FetchGameData";

const queryGameData = (appid) => ({
    queryKey: ["gameData", appid],
    queryFn: async () => await FetchGameData(appid),
})

export const LoaderDetail = (queryClient) => {
    return async ({ params }) => {
        const queryGD = queryGameData(params.appid)
        return (
            queryClient.getQueryData(queryGD.queryKey) ?? (await queryClient.fetchQuery(queryGD))
        )
    }
}