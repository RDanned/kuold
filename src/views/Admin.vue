<template>
  <div class="container-fluid mt-2">
    <div class="row">
      <div class="col-2"><admin-menu /></div>
      <div class="col-10">
        <router-view name="default" />
      </div>
    </div>
  </div>
</template>
<script>
import AdminMenu from '@/components/AdminMenu'

export default {
  name: 'Admin',
  components: {AdminMenu}
}
</script>
