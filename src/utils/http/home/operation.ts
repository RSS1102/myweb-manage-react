import { operationType } from "@/types/operation"
import { AxiosPromise } from "axios"
import http from "../http"
export const getOperation = (): AxiosPromise<{ code: number, data: Array<operationType> }> => {
    return http({
        url: "/cblogs/getOperationLogs",
        method: "get",
    })

}