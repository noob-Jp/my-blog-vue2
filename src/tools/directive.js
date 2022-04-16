import Vue from 'vue'
import store from '@/store';

Vue.directive("viewCount",{
  bind(el,binding){
    el.addEventListener('click',()=>{
      const data=binding.value;
      // console.log(data,123132123132);
    })
  },
  async inserted(el,binding){
    console.log("指令所绑定的元素插入到dom",binding.value)
    let articleId=binding.value.articleDetailId;
    try {
      await store.dispatch("updataArticleViewCount",articleId);
    }catch (e){
      console.log(e);
    }
  }
})