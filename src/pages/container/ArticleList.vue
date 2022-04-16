<template>
<div>
  <Article v-for="(item,index) in articleList" :articleItem="item" :key="item.id"></Article>
</div>
</template>

<script>
import Comment from '@/components/Comment/index'
import Article from '@/components/Article/index';
import { mapState } from 'vuex';
export default {
  name: 'container_left',
  created() {
    this.getArticleList()
  },
  data(){
    return{
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        categoryId: 0
      },
    }
  },
  methods:{
    async getArticleList(){
      const {queryParams}=this;
      let categoryId=this.$route.query.categoryId;
      if(categoryId){
        queryParams.categoryId=categoryId;
      }
      let result=await this.$store.dispatch('getArticleList',queryParams)
    },
    async routeChange(){
      const {queryParams}=this;
      let categoryId=this.$route.query.categoryId;
      if(categoryId){
        queryParams.categoryId=categoryId;
      }
      let result=await this.$store.dispatch('getArticleList',queryParams)
    }
  },
  components:{
    Article,
    Comment
  },
  computed:{
    ...mapState({
      articleList:state=>state.home.articleList
    })
  },
  watch:{
    '$route':'routeChange'
  }
}
</script>

<style scoped>

</style>