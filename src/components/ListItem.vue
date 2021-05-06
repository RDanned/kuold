<template>
  <tr>
    <td>{{ application.applicant.id }}</td>
    <td>
      {{
        `${application.applicant.last_name} ${application.applicant.first_name} ${application.applicant.middle_name}`
      }}
    </td>
    <td>{{ application.applicant.gender }}</td>
    <td>{{ application.applicant.study_place.name_ru }}</td>
    <td>{{ applicationStatus }}</td>
    <td>{{ settlementStatus }}</td>
    <td>
      <button
        type="button"
        class="btn btn-warning mt-0 float-left"
        @click="openModal"
      >
        Ещё...
      </button>
      удалить
    </td>
  </tr>
</template>
<script>
//import {Fragment} from 'vue-fragment'
//import Modal from '@/components/Modal'

export default {
  name: 'ListItem',
  //components: {Modal},
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    applicationStatus: function() {
      let output = ''
      switch (this.application.status) {
        case 0:
          output = 'На рассмотрении'
          break
        case 1:
          output = 'Одобрено'
          break
        case 2:
          output = 'Отказано'
          break
      }

      return output
    },
    settlementStatus: function() {
      let output = ''
      switch (this.application.settlement.status) {
        case 0:
          output = 'Не всёлен'
          break
        case 1:
          output = 'Всёлен'
          break
      }

      return output
    }
  },
  methods: {
    openModal: function() {
      this.$emit('open', this.application.id)
      //this.showModal = true
    },
    closeModal: function() {
      this.$emit('close', 'test')
      //this.showModal = false
    }
  }
}
</script>
