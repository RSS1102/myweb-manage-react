import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import http from "./http";
import { blogNavType, backNavType, addBlogNavType, delBlogNavType, editBlogNavType, } from "@/types/classifyType";
// 查找blogNav
export const getBlogsNav = (): AxiosPromise<Array<blogNavType>> => {
    return http({
        url: "/blogsNav/getBlogsNav",
        method: "get",
    })
}

// 增加blogNav
export const addBlogsNav = (data: addBlogNavType): AxiosPromise<backNavType> => {
    return http({
        url: "/blogsNav/addBlogsNav",
        method: "post",
        data
    })
}
// 删除blogNav
export const delBlogsNav = (data: delBlogNavType): AxiosPromise<backNavType> => {
    return http({
        url: "/blogsNav/delBlogsNav",
        method: "post",
        data
    })
}
// 修改blogNav
export const editBlogsNav = (data: editBlogNavType): AxiosPromise<backNavType> => {
    return http({
        url: "/blogsNav/editBlogsNav",
        method: "post",
        data
    })
}