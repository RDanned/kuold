<template>
  <div class="admin-panel">
    <admin-panel-search />
    <button class="btn btn-primary" @click="print">print</button>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPanelSearch from '@/components/AdminPanelSearch'

export default {
  name: 'AdminPanel',
  components: {AdminPanelSearch},
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
