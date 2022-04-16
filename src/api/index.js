import request from '@/api/request';

//登录
export const reqLogin=(data)=>request({url:`/login`,data,method:'post'});

//注销
export const reqLogout=()=>request({url:`/logout`,method:'post'});

//文章列表
export const reqGetArticleList=(query)=>request({url:`/article/articleList`,method:'get',params:query})

//文章具体
export const reqGetArticleDetail=(id)=>request({url:`/article/${id}`,method:'get',})

//热门文章
export const reqGetHotArticle=()=>request(({url:`/article/hotArticleList`,method:'get'}))

//获取评论  /comment/commentList/  Long articleId,Integer pageNum,Integer pageSize ?articleId=${articleId}&pageNum=${pageNum}&pageSize=${pageSize}
export const reqGetCommentList=(articleId,pageNum,pageSize)=>request({url:`/comment/commentList`,method:'get',params:{articleId,pageNum,pageSize}})

//添加评论
export const reqAddComment=(data)=>request({url:`/comment`,data,method:'post'})

//获取分类    /category/getCategoryList
export const reqGetCategoryList=()=>request({url:`/category/getCategoryList`,method:'get'})

//更新文章浏览量
export const reqUpdataViewCount=(id)=>request({url:`/article/updataViewCount/${id}`,method:'put'})

//获取用户信息
export const reqGetUserInfo=()=>request({url:`/user/userInfo`,method:"get"})

//更新用户信息
export const reqUpdateUserInfo=(data)=>request({url:`/user/userInfo`,data,method:"put"})

//发表文章
export const reqAddArticle=(data)=>request({url:`/article/addArticle`,data,method:'post'})