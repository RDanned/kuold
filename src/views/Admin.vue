<template>
  <div class="container-fluid mt-2">
    <div class="row">
      <div class="col-2"><admin-menu /></div>
      <div class="col-10">
        <router-view name="default" />
        <list-item-detail />
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/admin.css'
import AdminMenu from '@/components/AdminMenu'
import ListItemDetail from '@/components/ListItemDetail'

export default {
  name: 'Admin',
  components: {AdminMenu, ListItemDetail}
}
</script>
