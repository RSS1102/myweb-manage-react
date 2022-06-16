//文章请求参数
export interface blogsListReqType {
    offset: number,
    limit: number,
    blogNav?: string,
}
//文章数据包含字段
export interface blogsListType {
    key: string
    id: number,
    blogContent: string,
    blogNav: string,
    blogNavId: number,
    blogTitle: string,
    visitedNum: number,
    articleShow: boolean,
    createdAt: string,
    updatedAt: string,
    switchLoading?: boolean,

}
//文章数组
export interface blogsdataType<D> {
    count: number,
    rows: Array<D>,
}
//是否显示文章参数
export interface articleShowType {
    id: number,
    articleShow: boolean,
}