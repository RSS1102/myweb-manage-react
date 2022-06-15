export interface ArticleFormType {
    blogTitle: string,
    blogNavs: { value: number, label: string },
    blogContent: string,
}
export interface blogNavsObj {
    blogNav: string;
    blogTitle: string;
    blogNavId: number;
    blogContent: string;
    // 在后端增加的字段
    // visitedNum: number;
    // articleShow: boolean;
}