<template>
  <div class="admin-panel row">
    <admin-panel-search />
    <div class="admin-filter col-6">
      <admin-panel-filter-item
        v-for="(item, index) in formData"
        :key="index"
        :filter-name="index"
        :filter-values="item"
      />
      <admin-panel-filter-reset />
    </div>
    <admin-panel-print />
  </div>
</template>

<script>
import formApi from '@/api/form'
import adminApi from '@/api/admin'
import AdminPanelSearch from '@/components/AdminPanelSearch'
import AdminPanelFilterItem from '@/components/AdminPanelFilterItem'
import AdminPanelFilterReset from '@/components/AdminPanelFilterReset'
//todo: сделат отдельную страницу печати с настройкой
import AdminPanelPrint from '@/components/AdminPanelPrint'

export default {
  name: 'AdminPanel',
  components: {
    AdminPanelSearch,
    AdminPanelFilterItem,
    AdminPanelFilterReset,
    AdminPanelPrint
  },
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
  }
}
</script>

<style scoped>
.admin-panel {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
