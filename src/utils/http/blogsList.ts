import http from "@/utils/http/http";
import { blogsListReqType, blogsListType, blogsdataType, articleShowType } from "@/types/manage";
import { AxiosPromise } from "axios";
//获取文章列表
export const getBlogs = (data: blogsListReqType): AxiosPromise<blogsdataType<blogsListType>> => {
    return http({
        url: "/cBlogs/getBlogs",
        method: "post",
        data
    })
}
//是否显示文章选项
export const changeArticleShow = (data: articleShowType): AxiosPromise<blogsListType> => {
    return http({
        url: "/cblogs/changeArticleShow",
        method: "post",
        data
    })
}