<style scoped >
.a-button {
    padding: 11px 19px;
    font-size: 16px;
    border-radius: 4px;
    color: #fff;
    background-color: #13ce66;
    border-color: #13ce66;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #bfcbd9;
    color: #1f2d3d;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;
}
.a-button a,
.a-button a:hover {
  text-decoration: none;
  color: #fff;
  font-size:larger;
}
</style>
<template>
<el-card>
  <center>
  <h3>You're good to go!</h3>
  <p>
    <i
      style='font-size:64px;color:green;'
      class='el-icon-circle-check
'> </i>
  </p>
  <p>
    <p>Now you can start adding appointments in the web app</p>
    <div v-if='loading' >
      <i  class='el-icon-loading'> </i> Opening AppointmentGuru
    </div>
    <div v-else class='a-button' >
      <a
        @click='loading=true'
        href='http://portal.appointmentguru.co/'
       >Visit Web App</a>
    </div>
  </p>
  </center>
</el-card>
</template>
<script type="text/javascript">
export default {
  name: 'Donezo',
  data () {
    return { loading: false }
  }
}
</script>
