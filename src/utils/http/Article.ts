import http from "./http";

export const Article = (data: object) => {
    return http({
        url: "/cBlogs/saveBlogs",
        method: "post",
        data
    })

}