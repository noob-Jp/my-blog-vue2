<template>
<div style="margin-bottom: 20px; background: #fff;border-radius: 10px">
  <span class="round_data">
    <span class="round_mounth">4月</span>
    <span class="round_day">02</span>
  </span>
  <a class="title"><h1>{{ articleItem.title }}</h1></a>
  <p>发表于 {{articleItem.createTime}} • {{articleItem.viewCount}} 次围观 •</p>

  <div class="category">{{ articleItem.categoryName }}</div>
  <p style="margin-top: 30px">{{articleItem.summary}}</p>
  <img :src="articleItem.thumbnail" width="90%"/>
  <button class="read_btn" @click="toArticleDetail(articleItem.id)">阅读全文</button>
</div>
</template>

<script>

export default {
  name: 'index',
  created() {
  },
  mounted() {
    // console.log(this.articleItem)
  },
  props:['articleItem'],
  data(){
    return{

    }
  },
  methods:{
    toArticleDetail(id){
      this.$router.push(`/articleDetail?articleId=${id}` )
    }
  },

}
</script>

<style scoped>
.round_data {
  padding-top: 8px;
  color: white;
  position: absolute;
  top: -25px;
  left: -35px;
  width: 60px;
  height: 60px;
  background: #97dffd;
  border-radius: 50%;
}
.round_data span {
  display: block;
}

.round_data .round_day {
  font-size: 20px;
}
.category {
  cursor: pointer;
  padding: 6px 10px 6px 30px;
  position: absolute;
  left: -15px;
  font-size: 14px;
  color: white;
  display: inline;
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
  border-right-color: #48456D;
  border-right-style: solid;
  border-bottom: 1em solid transparent;
}

.content_left_info img {
  max-height: 300px;
  margin: 20px;
}

.read_btn {
  display: block;
  margin: 0 auto;
  background: #97dffd;
  transition: all 0.3s ease-in-out;
  color: white;
  border: 0;
  border-radius: 5px;
}
.read_btn:hover {
  background: #444;
  cursor: pointer;
}
</style>