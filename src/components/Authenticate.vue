<template>
<el-form>
  <el-form-item label="Phone number">
    <el-input v-model="form.phoneNumber"></el-input>
  </el-form-item>

  <el-form-item v-show='showOTP' label="Please provide your OTP (One Time Pin)" >
    <el-input v-model="form.otp"></el-input>
  </el-form-item>
</el-form>
</template>
<script>
export default {
  name: 'PersonalDetails',
  data () {
    return {
      showOTP: false,
      form: {
        phoneNumber: null,
        otp: null
      }
    }
  }
}
</script>
