import http from "./http";
import { blogNavsObj } from '@/types/articleTpye'
export const saveBlogs = (data: blogNavsObj) => {
    return http({
        url: "/cBlogs/saveBlogs",
        method: "post",
        data,
    })

}