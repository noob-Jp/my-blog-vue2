<template>
<div class="InfoLink">
  <img src="./images/img01.jpg" style="max-width: 90%;text-align: center;"/>
  <h3>赵</h3>
  <div class="linkItem">
    <ul>
      <li><i class="el-icon-message"></i></li>
      <li><span class="iconfont">&#xe882;</span></li>
      <li><span class="iconfont">&#xe66c;</span></li>
      <li><span class="iconfont">&#xe638;</span></li>
      <li><span class="iconfont">&#xe885;</span></li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'InfoLink'
}
</script>

<style lang="scss" scoped>
.InfoLink{
  text-align: center;
}
.linkItem{
  ul{
    margin: auto;
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  ul li{
    width: 45px;
    height: 45px;
    background: #d8ceea;
    border-radius: 50%;
    line-height: 45px;
  }
  ul li:hover{
    background: #ac94da;
    transition: 0.5s;
  }
}
</style>