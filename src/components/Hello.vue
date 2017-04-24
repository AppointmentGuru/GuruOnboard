<template>
  <div class='hello'>
    <security-questions v-model='questions' ></security-questions>
    <el-row >
      <el-col :md='12' >
        <h5>Questions</h5>
        <pre>{{questions}}</pre>
      </el-col>
      <el-col :md='12' >
        <h5>Answers</h5>
        <pre>{{answers}}</pre>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SecurityQuestions from './SecurityQuestions'

export default {
  name: 'hello',
  components: { SecurityQuestions },
  mounted () {
    this.prepareQuestions()
  },
  watch: {
    questions () {
      this.prepareQuestions()
    }
  },
  computed: {
    answers () {
      let answers = []
      for (let question of this.questions) {
        answers.push({ id: question.question_id, answer: question.answer })
      }
      return answers
    }
  },
  methods: {
    prepareQuestions () {
      for (let question of this.questions) {
        if (!('answer' in Object.keys(question))) {
          this.$set(question, 'answer', null)
        }
      }
    }
  },
  data () {
    return {
      questions: [{
        'question_id': 1,
        'question_text': 'this is some text',
        'control_type': 'choices',
        'is_sudden_death': false,
        'options': [
          {
            'select': 'test test1',
            'value': 'select option1'
          },
          {
            'select': 'test test2',
            'value': 'select option2'
          },
          {
            'select': 'test test3',
            'value': 'select option3'
          }
        ]
      },
      {
        'question_id': 2,
        'question_text': 'this is some text 2',
        'control_type': 'bool',
        'is_sudden_death': false,
        'options': [
          {
            'select': 'foo',
            'value': 'select foo'
          },
          {
            'select': 'bar',
            'value': 'select bar'
          },
          {
            'select': 'baz',
            'value': 'select baz'
          }
        ]
      }
      ]
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
