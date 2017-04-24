<template>
<el-form>
  <el-form-item label="Your full name">
    <el-input v-model="form.fullName"></el-input>
  </el-form-item>
  <el-form-item label="Your email address">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
</el-form>
</template>
<script>
export default {
  name: 'PersonalDetails',
  data () {
    return {
      form: {
        fullName: null,
        email: null
      }
    }
  }
}
</script>
