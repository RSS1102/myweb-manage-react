import http from "./http";
import { blogNavsObj } from '@/types/articleTpye'
//保存博客
export const saveBlogs = (data: blogNavsObj) => {
    return http({
        url: "/cBlogs/saveBlogs",
        method: "post",
        data,
    })
}