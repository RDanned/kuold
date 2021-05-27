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
    <td>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          :id="`application_status_${application.id}`"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ applicationStatus }}
        </button>
        <ul
          class="dropdown-menu"
          :aria-labelledby="`application_status_${application.id}`"
        >
          <li
            v-for="(status, index) in applicationStatuses"
            :key="index"
            @click="changeApplicationStatus"
            :data-status="index"
          >
            <a class="dropdown-item" href="#">
              {{ status }}
            </a>
          </li>
        </ul>
      </div>
    </td>
    <td>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          :id="`settlement_status_${application.id}`"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ settlementStatus }}
        </button>
        <ul
          class="dropdown-menu"
          :aria-labelledby="`settlement_status_${application.id}`"
        >
          <li
            v-for="(status, index) in settlementStatuses"
            :key="index"
            @click="changeSettlementStatus"
            :data-status="index"
          >
            <a class="dropdown-item" href="#">
              {{ status }}
            </a>
          </li>
        </ul>
      </div>
    </td>
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
import {actionTypes} from '@/store/modules/admin'

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
      showModal: false,
      applicationStatuses: ['На рассмотрении', 'Одобрено', 'Отказано'],
      settlementStatuses: ['Не вселен', 'Вселён', 'Выселен']
    }
  },
  computed: {
    applicationStatus: function() {
      console.log('computed')
      console.log(this.application.status)
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
        default:
          output = 'error'
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
        case 2:
          output = 'Выселен'
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
    },
    changeApplicationStatus: function(e) {
      if (e.currentTarget.dataset.status != this.application.status)
        this.$store.dispatch(actionTypes.setApplicationStatus, {
          applicationId: this.application.id,
          status: Number(e.currentTarget.dataset.status)
        })
    },
    changeSettlementStatus: function(e) {
      if (e.currentTarget.dataset.status != this.application.settlement.status)
        this.$store.dispatch(actionTypes.setSettlementStatus, {
          applicationId: this.application.id,
          status: Number(e.currentTarget.dataset.status)
        })
    }
  }
}
</script>
