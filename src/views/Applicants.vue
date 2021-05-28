<template>
  <div>
    <admin-panel />
    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <td>#</td>
          <td>ФИО</td>
          <td>Пол</td>
          <td>Место обучения</td>
          <td>Статус заявки</td>
          <td>Статус вселения</td>
          <td>Действия</td>
        </tr>
      </thead>
      <tbody>
        <list-item
          v-for="application in data"
          :key="application.id"
          :application="application"
          @open="openModal"
        />
      </tbody>
    </table>
    <list-item-detail
      v-if="showModal"
      @close="closeModal"
      :application="modalApplication"
    >
    </list-item-detail>
  </div>
</template>
<script>
import '@/assets/libs/bootstrap/js/bootstrap'
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/admin'
import ListItem from '@/components/ListItem'
import ListItemDetail from '@/components/ListItemDetail'
import AdminPanel from '@/components/AdminPanel'

export default {
  name: 'Applicants',
  components: {ListItem, ListItemDetail, AdminPanel},
  data() {
    return {
      showModal: false,
      modalApplication: {}
    }
  },
  computed: {
    ...mapState({
      data: state => {
        let searchString = state.admin.searchString

        if (searchString) {
          return state.admin.data.filter(application => {
            let fullName =
              application.applicant.last_name +
              application.applicant.first_name +
              application.applicant.middle_name

            let regex = new RegExp(`(${searchString})`, 'gi')

            if (fullName.search(regex) != -1) return true

            return false
          })
        }

        return state.admin.data
      }
    })
  },
  mounted() {
    console.log('init feed')
    this.$store.dispatch(actionTypes.getData, {apiUrl: 'applicants'})
  },
  methods: {
    openModal: function(id) {
      this.modalApplication = this.data.filter(app => {
        return app.id == id
      })[0]
      this.showModal = true
    },
    closeModal: function() {
      this.showModal = false
    }
  }
}
</script>
