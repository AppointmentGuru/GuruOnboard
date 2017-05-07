<style>
.action-button { float:right; }
</style>
<template>
<el-card id='whoami' key='whoami' >

  <div slot="header" class="clearfix">
    <strong class='card-header' >Let's get started</strong>

    <el-button
      v-if='nextStep === "auth-register"'
      @click='performRegistration'
      :loading='requestIsLoading(registerRequest)'
      type="primary" class='action-button' >Create account
    </el-button>
    <el-button
      v-else-if='showSetPassword'
      @click='setPassword'
      :loading='requestIsLoading(setPasswordRequest)'
      type="primary" class='action-button' >Set password
    </el-button>
    <el-button
      v-else-if='nextStep === "otp-auth"'
      @click='validateOTP'
      :loading='requestIsLoading(validateOtpRequest)'
      type="primary" class='action-button' >Submit OTP
    </el-button>
    <el-button
      v-else-if='nextStep === "token-auth"'
      @click='login'
      :loading='requestIsLoading(loginRequest)'
      type="primary" class='action-button' >Login
    </el-button>
    <span v-else >
    <el-button
      @click='getId'
      :loading='requestIsLoading(identifyRequest)'
      type="primary" class='action-button' >Next</el-button>
    <!-- <el-button @click='autoLogin' type='text' style="float: right; margin-right:10px;" >
      auto login</el-button> -->
    </span>
  </div>

  <el-form >
    <span
      v-show='requestIsLoading(identifyRequest)'
      class='pull-right' style='margin-top:5px;' >
    <i class="el-icon-loading" ></i>
    </span>
    <el-form-item label='What is your phone number?' >
      <el-input
        @change='checkPhoneLength'
        v-model='user.phoneNumber' ></el-input>
      <field-error-messages
        :request='registerRequest'
        field='phone_number' ></field-error-messages>
      <field-error-messages
        :request='loginRequest'
        field='phone_number' ></field-error-messages>
      <field-error-messages
        :request='identifyRequest'
        field='phone_number' ></field-error-messages>
      <field-error-messages
        :request='validateOtpRequest'
        field='phone_number' ></field-error-messages>
    </el-form-item>
  </el-form>

  <transition name='fade' >
  <el-form
    v-if='nextStep === "auth-register"'
    v-loading='requestIsLoading(registerRequest)' >
    <h3>{{createAccountHeader}}</h3>
    <el-form-item label='Full name' >
      <el-input v-model='user.fullName' ></el-input>
      <field-error-messages
        :request='registerRequest'
        field='first_name' ></field-error-messages>
      <field-error-messages
        :request='registerRequest'
        field='last_name' ></field-error-messages>
    </el-form-item>
    <el-form-item label='E-mail' >
      <el-input v-model='user.email' ></el-input>
      <field-error-messages
        :request='registerRequest'
        field='email' ></field-error-messages>
    </el-form-item>
    <el-form-item label='Pick a password' >
      <el-input v-model='user.password' type='password' ></el-input>
      <field-error-messages
        :request='registerRequest'
        field='password1' ></field-error-messages>
      <field-error-messages
        :request='registerRequest'
        field='password2' ></field-error-messages>
    </el-form-item>
  </el-form>
  </transition>

  <transition name='fade' >
  <el-form v-show='nextStep === "auth-otp" || showOTP === true' >
    <h3>{{otpHeader}}</h3>
    <span
      v-show='requestIsLoading(validateOtpRequest)'
      class='pull-right' style='margin-top:5px;' >
    <i class="el-icon-loading" ></i>
    </span>
    <el-form-item label='Please enter your OTP' >
      <el-input @change='checkOTPLength' v-model='user.otp' ></el-input>
      <field-error-messages
        :request='validateOtpRequest'
        field='otp' ></field-error-messages>
    </el-form-item>
  </el-form>
  </transition>

  <transition name='fade' >
  <el-form v-if='nextStep === "token-auth"' >
    <h3>{{loginHeader}}</h3>
    <el-form-item label='Please enter your password' >
      <el-input v-model='user.password' type='password' ></el-input>
      <el-button
        @click='showOTP = true'
        type='text' size='small' >Forgot password</el-button>
    </el-form-item>
  </el-form>
  </transition>

  <transition name='fade' >
  <el-form v-if='showSetPassword' >
    <h3>{{createPasswordHeader}}</h3>
    <el-form-item
      label='Password'
      v-loading='requestIsLoading(setPasswordRequest)' >
      <el-input v-model='user.password' type='password' ></el-input>
      <field-error-messages
        :request='setPasswordRequest'
        field='password' ></field-error-messages>
    </el-form-item>
  </el-form>
  </transition>
</el-card>
</template>
<script type="text/javascript">
const ID_REQUEST = 'auth-identify-request'
const LOGIN_REQUEST = 'auth-login-request'
const OTP_AUTH_REQUEST = 'auth-validate-otp'
const SET_PASSWORD_REQUEST = 'auth-set-password'
const REGISTER_REQUEST = 'auth-register'

import Mixins from 'vuex-requests/src/store/mixins'
import FieldErrorMessages from 'vuex-requests/src/components/FieldErrorMessages'

export default {
  name: 'WhoAmI',
  mixins: [Mixins],
  components: {FieldErrorMessages},
  props: {
    initialData: { type: Object, default: () => { return {} } },
    otpHeader: { type: String, default: 'Please enter your OTP' },
    createPasswordHeader: { type: String, default: 'Please choose a password' },
    createAccountHeader: { type: String, default: 'Tell us a little about yourself' },
    loginHeader: { type: String, default: 'Please login' }
  },
  data () {
    return {
      showOTP: false,
      showSetPassword: false,
      user: {
        phoneNumber: '+27'
      }
    }
  },
  watch: {
    loginRequestStatus () {
      if (this.loginRequestStatus === 200) {
        let token = this.loginRequest.result.data.token
        this.setToken(token)
        this.$emit('whoami:loggedin')
      }
    },
    validateOtpRequestStatus () {
      if (this.validateOtpRequestStatus === 200) {
        let token = this.validateOtpRequest.result.data.token
        this.setToken(token)
        this.showSetPassword = true
      }
    },
    setPasswordRequestStatus () {
      if (this.setPasswordRequestStatus === 200) {
        this.$emit('whoami:loggedin')
      }
    },
    registerRequestStatus () {
      if (this.registerRequestStatus === 200) {
        let token = this.registerRequest.result.data.token
        this.setToken(token)
        this.$emit('whoami:registered')
      }
    }
  },
  computed: {
    identifyRequest () {
      return this.$requeststore.getters.getRequestById(ID_REQUEST)
    },
    loginRequest () {
      return this.$requeststore.getters.getRequestById(LOGIN_REQUEST)
    },
    loginRequestStatus () {
      let r = this.loginRequest
      if (r === -1) { return 0 } else { return r.status }
    },
    validateOtpRequest () {
      return this.$requeststore.getters.getRequestById(OTP_AUTH_REQUEST)
    },
    validateOtpRequestStatus () {
      let r = this.validateOtpRequest
      if (r === -1) { return 0 } else { return r.status }
    },
    setPasswordRequest () {
      return this.$requeststore.getters.getRequestById(SET_PASSWORD_REQUEST)
    },
    setPasswordRequestStatus () {
      let r = this.setPasswordRequest
      if (r === -1) { return 0 } else { return r.status }
    },
    registerRequest () {
      return this.$requeststore.getters.getRequestById(REGISTER_REQUEST)
    },
    registerRequestStatus () {
      let r = this.registerRequest
      if (r === -1) { return 0 } else { return r.status }
    },
    nextStep () {
      if (this.identifyRequest !== -1) {
        if (this.identifyRequest.result && this.identifyRequest.result.data) {
          return this.identifyRequest.result.data.type
        }
      }
      return null
    }
  },
  methods: {
    getId () {
      let options = {
        id: ID_REQUEST,
        params: {phone_number: this.user.phoneNumber}
      }
      this.$appointmentguru
        .endpoint('auth-identify', options)
          // .then((result) => { this.getIdId = result })
    },
    checkPhoneLength () {
      if (this.user.phoneNumber.length === 12) {
        this.getId()
      }
    },
    checkOTPLength () {
      if (this.user.otp.length === 4) {
        this.validateOTP()
      }
    },
    login () {
      let options = {
        id: LOGIN_REQUEST,
        data: {
          phone_number: this.user.phoneNumber,
          password: this.user.password
        }
      }
      this.$appointmentguru
        .endpoint('auth-login-phone', options)
    },
    validateOTP () {
      let options = {
        id: OTP_AUTH_REQUEST,
        data: {
          phone_number: this.user.phoneNumber,
          otp: this.user.otp
        }
      }
      this.$appointmentguru.endpoint('auth-validate-otp', options)
    },
    setToken (token) {
      let data = [
        this.$appointmentguru.name,
        'Authorization',
        `token ${token}`
      ]
      this.$requeststore.commit('BACKEND_CONFIG_SET_HEADER', data)
    },
    performRegistration () {
      let options = {
        id: REGISTER_REQUEST,
        data: {
          phone_number: this.user.phoneNumber,
          password1: this.user.password,
          password2: this.user.password,
          full_name: this.user.fullName,
          email: this.user.email,
          is_practitioner: true
        }
      }
      this.$appointmentguru
        .endpoint('auth-register', options)
    },
    setPassword () {
      let options = {
        id: SET_PASSWORD_REQUEST,
        data: {
          password: this.user.password
        }
      }
      this.$appointmentguru
        .endpoint('auth-set-password', options)
    }
  }
}
</script>
