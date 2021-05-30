<template>
  <tr>
    <td>{{ application.applicant.id }}</td>
    <td>
      {{
        `${application.applicant.last_name} ${application.applicant.first_name} ${application.applicant.middle_name}`
      }}
    </td>
    <td>{{ $t('form.gender.' + application.applicant.gender) }}</td>
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
      <button
        v-if="!application.deleted"
        class="trash-btn btn btn-warning mt-0 float-left"
        @click="deleteApplication"
      >
        <font-awesome-icon icon="trash" />
      </button>
      <button
        v-else
        class="trash-btn btn btn-warning mt-0 float-left"
        @click="restoreApplication"
      >
        <font-awesome-icon icon="trash-restore" />
      </button>
    </td>
  </tr>
</template>
<script>
import {actionTypes as adminActions} from '@/store/modules/admin'
import {actionTypes as modalActions} from '@/store/modules/modal'

export default {
  name: 'ListItem',
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
      this.$store.dispatch(modalActions.setApplicationDetail, {
        application: this.application
      })
    },
    changeApplicationStatus: function(e) {
      if (e.currentTarget.dataset.status != this.application.status)
        this.$store.dispatch(adminActions.setApplicationStatus, {
          applicationId: this.application.id,
          status: Number(e.currentTarget.dataset.status)
        })
    },
    changeSettlementStatus: function(e) {
      let newStatus = e.currentTarget.dataset.status
      if (newStatus != this.application.settlement.status) {
        this.$store.dispatch(adminActions.setSettlementStatus, {
          applicationId: this.application.id,
          status: Number(e.currentTarget.dataset.status)
        })
      } else if (newStatus == 2) {
        this.$store.dispatch(modalActions.setEvictApplication, {
          application: this.application
        })
      }
    },
    deleteApplication: function() {
      this.$store.dispatch(adminActions.softDeleteApplication, {
        applicationId: this.application.id
      })
    },
    restoreApplication: function() {
      this.$store.dispatch(adminActions.restoreApplication, {
        applicationId: this.application.id
      })
    }
  }
}
</script>
