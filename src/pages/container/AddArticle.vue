<template>
<div>
  <Headers></Headers>
  <div class="edit">
    <el-form style="width: 600px">
      <el-form-item label="请输入文章标题:" label-width="120px" >
        <el-input v-model="articleObj.title" ></el-input>
      </el-form-item>
      <el-form-item label="请输入文章概括:" label-width="120px" >
        <el-input type="textarea" v-model="articleObj.summary" ></el-input>
      </el-form-item>
      <el-form-item label="请选择文章分类:" label-width="120px">
        <el-radio-group v-model="radio" @change="radioChange">
          <el-radio :label="category.name" v-for="(category) in categoryList" :key="category.id" ></el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <mavon-editor ref="md" @imgAdd="imgAdd" @imgDel="imgDel" v-model="value" :ishljs="true"></mavon-editor>
    <el-button @click="submit" class="submit">发表文章</el-button>
  </div>

</div>
</template>

<script>
import {reqAddArticle} from "@/api"
import { mapState } from 'vuex';
import axios  from "axios";
import Headers from '@/pages/header/index'
export default {
  data(){
    return{
      value:"",
      uploadUrl:"http://localhost:7777/upload",
      articleObj: {//发表文章所用body
          title:"",
          content:this.value,
          summary:"",
          categoryId:0,
          thumbnail:"",
          isTop:"0",
          status:"0",
          viewCount:0,
          isComment:"0"
      },
      radio:""
    }
  },
  name: "AddArticle",
  components:{
    Headers
  },
  methods:{
    async submit(){

      console.log( this.articleObj.content)
      let result = await reqAddArticle(this.articleObj);
      console.log(result)
      if(result.code===200){
        this.$message({
          type:'success',
          message:"上传成功"
        })
        this.$router.push("/articleList")
      }

    },
    async imgAdd(pos,$file){
      let formData=new FormData();
      // console.log($file, "$file");
      formData.append("img",$file);
      let result=await axios({url:this.uploadUrl,method: "post",data:formData,headers: { "Content-Type": "multipart/form-data" },})
      if(result.data.code===200){
        let imgUrl="http://"+result.data.data;
        console.log(imgUrl,result)
        this.$refs.md.$img2Url(pos,imgUrl);
        this.$message({
          type:'success',
          message:"上传成功"
        })
      }

    },
    imgDel() {},
    radioChange(e){
      // console.log("e----",...e);
      let categoryObj=this.categoryList.find(v=>v.name===e);
      // let objId;
      // for(let i=0;i<this.categoryList.length;i++){
      //   if(e==this.categoryList[i].name){
      //     objId=this.categoryList[i].id;
      //     break;
      //   }
      // }
      // console.log(objId,this.articleObj.categoryId);
      this.articleObj.categoryId=categoryObj.id;
      // console.log(this.articleObj);
      // console.log("this.articleObj.categoryId-----",this.articleObj.categoryId)
      //console.log(Object.getOwnPropertyNames(categoryObj))
    },


  },
  computed:{
    ...mapState({
      categoryList:state=>state.home.categoryList
    })
  },
  watch:{
    value(val){
      this.articleObj.content=val;
    }
  }
}
</script>

<style scoped>
.edit{
  padding-top: 30px;
  margin: auto;
  width: 60%;
  height: 600px;
}

.submit{
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>