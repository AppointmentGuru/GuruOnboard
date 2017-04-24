<template>
<div>
  <div v-for='(question, index) in questions' >
     <el-select v-model="question.answer" placeholder="Select">
        <el-option
          v-for="item in question.options" :keys='item.question_id'
          :label="item.select"
          :value="item.value">
        </el-option>
      </el-select>
  </div>
</div>
</template>
<script>
export default {
  name: 'SecurityQuestions',
  props: {
    value: { type: Array, required: true }
  },
  data () {
    return {
      questions: this.value
    }
  }
}
</script>
