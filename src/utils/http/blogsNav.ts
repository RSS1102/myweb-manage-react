import { AxiosResponse, AxiosPromise } from "axios";
import http from "./http";
import { blogNavType } from "@/types/classifyType";
export const getBlogsNav = (): AxiosPromise<Array<blogNavType>> => {
    return http({
        url: "/blogsNav/getBlogsNav",
        method: "get",
    })
}