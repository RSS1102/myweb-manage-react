import http from "./http";
export const Article = (data: object) => {
    return http({
        url: "/writeArticle",
        method: "post",
        data
    })

}