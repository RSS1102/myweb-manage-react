// 查询
export interface blogNavType {
    id: number,
    blogNav: string
}
// 回执
export interface backNavType {
    code: number,
    data: string
}
// 增
export interface addBlogNavType {
    blogNav: string
}
// 删
export interface delBlogNavType {
    id: number,
}
// 改
export interface editBlogNavType {
    id: number,
    blogNav: string
}