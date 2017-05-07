<template>
  <div id="appointmentguruonboarder" >
    <onboard></onboard>
  </div>
</template>

<script>
import Onboard from './components/Onboard'

export default {
  name: 'appointmentguruonboarder',
  components: { Onboard }
}
</script>

<style>
body{
  margin:0px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;;
  color: #5e6d82;
}
h1,h2,h3,h4,h5 { color: #1F2D3D; font-weight: 400; }
pre {
  color:white;
  background-color: #324057;
  padding: 10px;
}
.logo {
  height:50px; padding-top:5px;float:left;margin-right:10px;
}
.pull-right {
  float:right;;
}
.el-card {
  border-radius: 0px !important;
}
.el-card.compact .el-card__body {
  padding:10px !important;
}
.padd { padding: 10px; }
.margin { margin: 10px; }

.fade-enter-active, .fade-leave-active {
  transition: opacity .7s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
/* not working .. :^/; */
.slide-enter-active, .slide-leave-active {
  transition: height 5s
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  height:0px;
}
.error-container {
  line-height: 20px !important;
}
.error { color: red; }
</style>
