<style>
#onboarder .card-header {
  color: #1F2D3D;
  font-weight: 400;
  line-height: 36px;
  font-size:30px;
}
</style>
<template>

<div id='onboarder'>
  <!-- LI: {{loggedin}}<br/>
  CD: {{customerDetails}}<br/>
  PP: {{practiceDetails}}<br/> -->
  <transition name="fade" mode="out-in" >
    <who-am-i
      id='whoami' key='whoami'
      v-if='loggedin===false'
      @whoami:loggedin='getMe'
      @whoami:registered='registered' >
    </who-am-i>

    <customer-details
      v-else-if='loggedin===true && customerDetails === false'
      key='customerdetails'
      @customerdetails:profilesaved='customerDetails=true'
      buttonText='Confirm details'
      :initial-data='profile' >
    </customer-details>

    <!-- customer details -->
    <practitioner-practice
      v-else-if='customerDetails === true && practiceDetails === false'
      @practice:saved='practiceDetails=true'
      title='Tell us a little about your practice'
      key='practitioner-practice'
      :practitioner-id='profile.id'
      :initial-data='practice || {}' >
    </practitioner-practice>

    <donezo v-else ></donezo>
  </transition>
  <!-- <pre>{{ profile }}</pre> -->
</div>
<!--
* Who are you / create account
* Verify personal details
* Business details
* donezo
-->
</template>
<script type="text/javascript">
import Mixins from 'vuex-requests/src/store/mixins'
import WhoAmI from './forms/WhoAmI'
import PractitionerPractice from './forms/PractitionerPractice'
import CustomerDetails from './forms/CustomerDetails'
import Donezo from './forms/Donezo'

const ME_REQUEST = 'me-request'

export default {
  name: 'Onboard',
  mixins: [Mixins],
  components: {WhoAmI, PractitionerPractice, CustomerDetails, Donezo},
  data () {
    return {
      imageUrl: null,
      loggedin: false,
      customerDetails: false,
      practiceDetails: false
    }
  },
  computed: {
    meRequest () {
      return this.$requeststore.getters.getRequestById(ME_REQUEST)
    },
    getUser () {
      if (this.meRequest !== -1) {
        if (this.meRequest.result &&
            this.meRequest.result.data &&
            this.meRequest.result.data.results) {
          return this.meRequest.result.data.results[0]
        }
      }
      return {profile: {}}
    },
    profile () {
      let r = this.getUser
      return {
        id: r.id,
        fullName: `${r.first_name} ${r.last_name}`,
        email: r.email,
        phoneNumber: r.phone_number,
        is_practitioner: true
      }
    },
    practice () {
      let r = this.getUser
      if (r.profile) {
        return {
          sub_domain: r.profile.sub_domain,
          practice_name: r.profile.practice_name,
          is_website_published: r.profile.is_website_published,
          is_visible_in_app: r.profile.is_visible_in_app
        }
      }
    }
  },
  methods: {
    registered () {
      this.customerDetails = true
      this.loggedin = true
      this.$appointmentguru
        .resource('practitioner.me')
        .id(ME_REQUEST).list()
    },
    getMe () {
      this.loggedin = true
      this.$appointmentguru
        .resource('practitioner.me')
        .id(ME_REQUEST).list()
    }
  }
}
</script>
