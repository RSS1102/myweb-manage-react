import http from "./http";

export const Article = (data: object) => {
    return http({
        url: "/article",
        method: "post",
        data
    })

}