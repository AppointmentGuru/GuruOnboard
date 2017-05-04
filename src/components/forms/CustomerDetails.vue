<template>
<el-card id='profile-contacts'>
  <div slot="header" class="clearfix">
    <strong style="line-height: 36px;">{{title}}</strong>
    <el-button
      @click='saveProfile'
      :loading='requestIsLoading(profileRequest)'
      style="float: right;" type="primary">{{buttonText}}</el-button>
  </div>
  <el-form
    v-loading='requestIsLoading(profileRequest)' >
    <h3>{{contactDetailsHeader}}</h3>
    <el-form-item label='Your name' >
      <el-input  v-model="user.fullName" >
      </el-input>
    </el-form-item>
    <el-form-item label='Your e-mail' >
      <el-input  v-model="user.email" >
      </el-input>
    </el-form-item>
    <!-- <el-form-item label='Choose a password' >
      <el-input  v-model="user.password" type='password' >
      </el-input>
    </el-form-item> -->
  </el-form>
</el-card>
</template>
<script type="text/javascript">
import Mixins from 'vuex-requests/src/store/mixins'
import FieldErrorMessages from 'vuex-requests/src/components/FieldErrorMessages'

const PROFILE_UPDATE = 'profile-update'

export default {
  name: 'CustomerDetails',
  mixins: [Mixins],
  components: {FieldErrorMessages},
  props: {
    title: { type: String, default: 'Contact details' },
    buttonText: { type: String, default: 'Save contact details' },
    initialData: { type: Object, default: () => { return {} } },
    contactDetailsHeader: { type: String, default: 'Please confirm that your contact details are correct' }
  },
  data () {
    return {
      user: {
        first_name: null,
        last_name: null,
        email: null,
        fullName: null,
        is_practitioner: true
      }
    }
  },
  mounted () {
    this.user = this.initialData
  },
  watch: {
    initialData () {
      if (this.profileRequestStatus !== 200) { // bit of a hack
        if (!this.user.first_name) {
          this.user = this.initialData
        }
      }
    },
    profileRequestStatus () {
      if (this.profileRequestStatus === 200) {
        this.$emit('customerdetails:profilesaved', this.profile)
      }
    }
  },
  computed: {
    profileRequest () {
      return this.$requeststore
        .getters
        .getRequestById(PROFILE_UPDATE)
    },
    profileRequestStatus () {
      if (this.profileRequest === -1) { return 0 }
      return this.profileRequest.status
    }
  },
  methods: {
    saveProfile () {
      this.user.first_name = this.user.fullName.split(' ').slice(0, -1).join(' ')
      this.user.last_name = this.user.fullName.split(' ').slice(-1).join(' ')
      this.$appointmentguru
        .resource('users')
        .id(PROFILE_UPDATE)
        .save(this.user.id, this.user)
    }
  }
}
</script>
