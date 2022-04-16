<template>
<div>
  <div class="category">热门文章</div>
  <div class="hotArticle" v-for="(item,index) in hotArticleList">
    <div @click="toArticleDetail(item.id)" class="hotArticleItem"><h4>{{ item.title }}</h4> —— {{ item.viewCount }} 次围观</div>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'index',
  methods:{
    toArticleDetail(id){
      this.$router.push(`/articleDetail?articleId=${id}`);
    }
  },
  computed:{
    ...mapState({
      hotArticleList:state=>state.home.hotArticleList,
    })
  }
}
</script>

<style lang="scss" scoped>
.category {
  cursor: pointer;
  padding: 6px 10px 6px 30px;
  position: relative;
  left: -26px;
  font-size: 14px;
  color: white;
  display: inline-block;
  background: #97dffd;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%);
  border-radius: 4px;
}
.category:after {
  position: absolute;
  content: "";
  top: 100%;
  left: 0;
  border-right-width: 1em;
  width: 0;
  height: 0;
  border-right-color: black;
  border-right-style: solid;
  border-bottom: 1em solid transparent;
}
.hotArticleItem{
  cursor: pointer;
}
.hotArticleItem h4:hover{
  color: red;
  transition: 1s;
}
</style>