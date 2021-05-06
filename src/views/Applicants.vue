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
        />
      </tbody>
    </table>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/admin'
import ListItem from '@/components/ListItem'

export default {
  name: 'Applicants',
  components: {ListItem},
  computed: {
    ...mapState({
      data: state => state.admin.data
    })
  },
  mounted() {
    console.log('init feed')
    this.$store.dispatch(actionTypes.getData, {apiUrl: 'applicants'})
  }
}
</script>
