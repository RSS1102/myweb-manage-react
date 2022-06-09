/// <reference types="vite/client" />

import axios from 'axios'
//对于AxiosResponse<any, any> 
//https://github.com/axios/axios/issues/1510
declare module 'axios' {
    export interface AxiosResponse<T = any, D = any> extends Promise<T> {
        data: T;
        status: number;
        code: number;
        // statusText: string;
        // headers: AxiosResponseHeaders;
        // config: AxiosRequestConfig<D>;
        // request?: any;

    }
}
