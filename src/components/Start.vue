<template>

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="line-height: 36px;">{{activeTitle}}</span>
    <el-button @click='next' style="float: right;" type="success">Next</el-button>
  </div>
   <div class="text item">

    <el-form ref="form" :model="form" label-width="120px" label-position='top' >
      <!-- indicator-position='none' -->
       <el-carousel
        :autoplay='false'
        :interval='0'
        arrow='never'
        ref="carousel" >
          <el-carousel-item >
            <authenticate ></authenticate>
          </el-carousel-item>

          <el-carousel-item >
            <personal-details></personal-details>
          </el-carousel-item>

          <el-carousel-item >
            <h3>And finally, tell us a little about your business.</h3>

            <el-form-item label="What is the name of your business?">
              <el-input v-model="form.practiceName"></el-input>
            </el-form-item>

            <!-- type ahead -->
            <el-form-item label="What type of practitioner are you?">
              <el-input v-model="form.jobTitle"></el-input>
            </el-form-item>

            <!-- location picker -->
            <el-form-item label="What is your work address?">
              <el-input v-model="form.location"></el-input>
            </el-form-item>

            <el-form-item label="And what are your working hours?">
              <el-input v-model="form.hours"></el-input>
            </el-form-item>
          </el-carousel-item>

          <el-carousel-item >
            <h3>What type of appointments do people book?</h3>
          </el-carousel-item>
        </el-carousel>

      <!-- <form action="http://localhost:8000" class="paymentWidgets" data-brands="VISA MASTER AMEX"></form> -->

      <pre>{{form}}</pre>
    </el-form>
  </div>
</el-card>
</template>
<script>
import PersonalDetails from './PersonalDetails'
import Authenticate from './Authenticate'
export default {
  name: 'Start',
  components: { PersonalDetails, Authenticate },
  data () {
    return {
      currentIndex: 0,
      form: {
        phoneNumber: null
      },
      slides: [
        { title: 'Let\'s get started.' },
        { title: 'We\'ve sent you an OTP.' },
        { title: 'Tell us a little about yourself.' },
        { title: '.. and about your business.' },
        { title: 'Finally, some detail.' }
      ]
    }
  },
  watch: {
    currentIndex () {
      this.$refs.carousel.setActiveItem(this.currentIndex)
    }
  },
  computed: {
    activeTitle () {
      return this.slides[this.currentIndex].title
    }
  },
  methods: {
    next () { this.currentIndex++ }
  }
}
</script>
