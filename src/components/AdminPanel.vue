<template>
  <div class="admin-panel">
    <admin-panel-search />
    <div class="admin-filter">
      <admin-panel-filter-item
        v-for="(item, index) in formData"
        :key="index"
        :filter-name="index"
        :filter-values="item"
      />
      <admin-panel-filter-reset />
      <button class="btn btn-primary" @click="print">print</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import formApi from '@/api/form'
import adminApi from '@/api/admin'
import AdminPanelSearch from '@/components/AdminPanelSearch'
import AdminPanelFilterItem from '@/components/AdminPanelFilterItem'
import AdminPanelFilterReset from '@/components/AdminPanelFilterReset'

export default {
  name: 'AdminPanel',
  components: {AdminPanelSearch, AdminPanelFilterItem, AdminPanelFilterReset},
  data: function() {
    return {
      formData: {}
    }
  },
  mounted() {
    formApi.getFormData().then(response => {
      let study_place = response.data.study_places.map(item => item)
      let payment_method = response.data.payment_methods.map(item => item)

      this.formData = {
        study_place,
        payment_method,
        application_status: adminApi.getApplicationStatuses(),
        settlement_status: adminApi.getSettlementStatuses()
      }
    })
  },
  methods: {
    print: function() {
      axios.get('get_report/', {responseType: 'blob'}).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'реестр студентов(всех).docx')
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>

<style scoped>
.admin-panel {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
