<template>
  <div>
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
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/admin'
import ListItem from '@/components/ListItem'
import ListItemDetail from '@/components/ListItemDetail'

export default {
  name: 'Applicants',
  components: {ListItem, ListItemDetail},
  data() {
    return {
      showModal: false,
      modalApplication: {}
    }
  },
  computed: {
    ...mapState({
      data: state => state.admin.data
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
      console.log(this.modalApplication)
      this.showModal = true
    },
    closeModal: function() {
      this.showModal = false
    }
  }
}
</script>
