
import {
  reqGetArticleDetail,
  reqGetArticleList,
  reqGetHotArticle,
  reqGetCommentList,
  reqAddComment,
  reqGetCategoryList,
  reqUpdataViewCount,
} from '@/api'

//state:仓库存储数据的唯一手段
const state={
  articleList:[],
  articleDetail:{},
  hotArticleList:[],
  commentList:[],
  categoryList:[],
  isShow:false,
};
//mutation:修改state的唯一手段
const mutations={
  GETARTICLELIST(state,result){
    state.articleList=[...state.articleList,...result.data.rows];

  },
  GETARTICLE(state,result){
    state.articleDetail=result.data;
  },
  GETHOTARTICLE(state,result){
    state.hotArticleList=result.data;
  },
  GETCOMMENTLIST(state,result){
    state.commentList=result.data.rows;
  },
  GETCATEGORYLIST(state,result){
    state.categoryList=result.data;
  },
  NOARTICLELIST(state){
    state.isShow=true;
  },
}
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions={
  //获取文章列表
  async getArticleList({commit},queryParams){
    // console.log(queryParams,111)
    let result=await reqGetArticleList(queryParams);
    if(result.data.rows.length!==0){
      commit('GETARTICLELIST',result);
    }else {
      commit("NOARTICLELIST");
      console.log('没有数据')
    }
  },
  // 获取文章详情
  async getArticleDetail({commit},id){
    let result=await reqGetArticleDetail(id);
    commit("GETARTICLE",result);
    // console.log(result);
  },
  // 获取热门文章
  async getHotArticle({commit},hotArticleList){
    let result=await reqGetHotArticle();
    if(result.code===200){
      // console.log(result);
      commit("GETHOTARTICLE",result)
    }
  },
  // 获取评论列表
  async getCommentList({commit},{articleId,pageNum,pageSize}){
    // console.log(articleId,pageNum,pageSize);
    let result=await reqGetCommentList(articleId,pageNum,pageSize);
    // console.log(result);
    commit("GETCOMMENTLIST",result)
  },
  // 添加评论
  async addComment({commit},comment){
    let result=await reqAddComment(comment);
    // console.log(result);
    if(result.code===200){
      return result;
    }else {
      return Promise.reject(result.msg);
    }
  },
  // 获取分类列表
  async getCategoryList({commit}){
    let result=await reqGetCategoryList();
    console.log(result);
    commit("GETCATEGORYLIST",result)
  },
  //更新文章浏览量
  async updataArticleViewCount({commit},id){
    let result=await reqUpdataViewCount(id);
    if(result.code===200) {
      console.log(result);
    }else {
      return Promise.reject(result.msg);
    }
  },
}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
const getters={

}

export default {
  state,
  mutations,
  actions,
  getters
}