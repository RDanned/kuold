<template>
  <div>
    <admin-panel />
    <table class="table table-striped table-dark table-bordered">
      <thead>
        <tr>
          <td>
            <div
              class="sort-btn"
              data-by="id"
              data-direction="desc"
              @click="sortApplications"
            >
              <span class="sort-btn__text">#</span>
              <span class="sort-btn__icon">
                <font-awesome-icon
                  v-if="sort.direction === 'asc' && sort.by === 'id'"
                  icon="sort-amount-up"
                />
                <font-awesome-icon v-else icon="sort-amount-down-alt" />
              </span>
            </div>
          </td>

          <td>
            <div
              class="sort-btn"
              data-by="full_name"
              data-direction="desc"
              @click="sortApplications"
            >
              <span class="sort-btn__text">ФИО</span>
              <span class="sort-btn__icon">
                <font-awesome-icon
                  v-if="sort.direction === 'desc' && sort.by === 'full_name'"
                  icon="sort-alpha-down-alt"
                />
                <font-awesome-icon v-else icon="sort-alpha-down" />
              </span>
            </div>
          </td>

          <td>Пол</td>

          <td>Место обучения</td>

          <td>
            <div
              class="sort-btn"
              data-by="application_status"
              data-direction="desc"
              @click="sortApplications"
            >
              <span class="sort-btn__text"> Статус заявки</span>
              <span class="sort-btn__icon">
                <font-awesome-icon
                  v-if="
                    sort.direction === 'desc' &&
                      sort.by === 'application_status'
                  "
                  icon="sort-amount-up"
                />
                <font-awesome-icon v-else icon="sort-amount-down-alt" />
              </span>
            </div>
          </td>

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
import {
  getFilteredApplications,
  getSortedApplications,
  isInSettlement
} from '@/helpers/applicants'
import ListItem from '@/components/ListItem'
import ListItemDetail from '@/components/ListItemDetail'
import AdminPanel from '@/components/AdminPanel'

export default {
  name: 'AdminSettlement',
  components: {ListItem, ListItemDetail, AdminPanel},
  data() {
    return {
      showModal: false,
      modalApplication: {}
    }
  },
  computed: {
    ...mapState({
      sort: state => state.admin.sortApplications,
      data: state => {
        let output = []

        let searchString = state.admin.searchString

        if (state.admin.data.length)
          output = state.admin.data.filter(application => {
            if (isInSettlement(application)) return true
          })

        output = getSortedApplications({
          sort: state.admin.sortApplications,
          applications: output
        })

        output = getFilteredApplications({
          filter: state.admin.filter,
          applications: output
        })

        if (searchString) {
          output = output.filter(application => {
            let fullName =
              application.applicant.last_name +
              application.applicant.first_name +
              application.applicant.middle_name

            let regex = new RegExp(`(${searchString})`, 'gi')

            if (fullName.search(regex) != -1) return true

            return false
          })
        }

        return output
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
    },
    sortApplications: function(e) {
      let by = e.currentTarget.dataset.by
      let direction = e.currentTarget.dataset.direction

      if (direction === 'desc') {
        direction = 'asc'
        e.currentTarget.dataset.direction = 'asc'
      } else if (direction === 'asc') {
        direction = 'desc'
        e.currentTarget.dataset.direction = 'desc'
      }

      this.$store.dispatch(actionTypes.setApplicationSort, {by, direction})
    }
  }
}
</script>
