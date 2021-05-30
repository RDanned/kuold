<template>
  <button class="btn btn-info col-2 admin-print" @click="print">
    Распечатать
  </button>
</template>
<script>
import adminApi from '@/api/admin'
import {getFilteredApplications} from '@/helpers/applicants'

export default {
  name: 'AdminPanelPrint',
  methods: {
    print: function() {
      let filter = this.$store.state.admin.filter
      let applications = this.$store.state.admin.data

      let filteredApplications = getFilteredApplications({filter, applications})

      let filteredApplicationsIds = filteredApplications.map(
        application => application.applicant.id
      )

      adminApi.getReport([...filteredApplicationsIds]).then(response => {
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
