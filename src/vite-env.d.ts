/// <reference types="vite/client" />

import axios from 'axios'

declare module 'axios' {
    export interface AxiosResponse<T = any, D = any> extends Promise<T> {
        data: T;
        status: number;
        statusText: string;
        headers: AxiosResponseHeaders;
        config: AxiosRequestConfig<D>;
        request?: any;

    }
}