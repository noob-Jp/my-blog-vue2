<template>
  <div class="comment">
    <div><h2>发表评论</h2></div>
    <textarea class="textarea" rows="10" cols="30" placeholder="说点什么呢" v-model="textarea"></textarea>
    <button class="send" @click="addComment">发送xx</button>
    <h2 style="text-align: left;margin-top: 20px;margin-bottom: 20px">共11条评论</h2>
    <div v-for="(parentItem,parentIndex) in commentList" :key="parentItem.id">
      <div class="parent_comment">
        <img src="./images/tou.jpg" style="border-radius: 50%;margin-right: 10px" width="65px" height="65px">
        <div>
          <div class="username">{{parentItem.username}}</div>
          <div class="comment_data">{{parentItem.createTime}}</div>
          <div class="comment_content">{{parentItem.content}}</div>
        </div>
      </div>
      <div class="children_comment" v-for="(childrenItem,childrenIndex) in parentItem.children" :key="childrenItem.id">
        <img src="./images/tou.jpg" style="border-radius: 50%;margin-right: 10px" width="65px" height="65px">
        <div>
          <div class="username">{{ childrenItem.username }}</div>
          <div class="comment_data">{{childrenItem.createTime}}</div>
          <div class="comment_content">{{childrenItem.content}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'index',
  data(){
    return{
      comment:{
        type:"",
        articleId: "",
        rootId: "",
        content: "",
        toCommentUserId: "",
      },
      textarea: "",
    }
  },
  computed: {
    ...mapState({
      commentList: state => state.home.commentList
    })
  },
  methods:{
    //发表评论
    async addComment(){
      const {comment} = this;
      comment.type=0;
      comment.articleId = this.$route.query.articleId;
      comment.rootId=-1;
      comment.content = this.textarea;
      comment.toCommentUserId = -1;
      try {
        await this.$store.dispatch('addComment',comment);
        this.$message({
          type:'success',
          message:'评论成功'
        })
      }catch (e) {
        console.log(e);
        this.$message({
          type:'error',
          message:e
        })
      }
    }
  }
}
</script>

<style scoped>
.textarea{
  border: 1px solid #888888;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 95%;
  height: 100px;
  display: inline-block;
  background: #f4f6f7;
  resize: vertical;
}
.send{
  margin-left: 10px;
  margin-right: 10px;
  width: 90%;
  height: 34px;
  border-radius: 5px;
  background: #97dffd;
  color: white;
  border: 0;
}
.comment{
  background: #fff;
  text-align: center;
}
.parent_comment{
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #888888;
  padding: 10px 20px 10px 20px;
  text-align: left;
  margin: 0 10px 0 10px;
}
.comment_data{
  font-size: 12px;
  color: #888888;
}
.children_comment{
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #888888;
  padding: 10px 20px 10px 20px;
  text-align: left;
  margin: 0 10px 0 80px;
}
</style>