<template>
  <button class="btn btn-primary" @click="resetFilter">
    Сбросить фильтр
  </button>
</template>
<script>
import {actionTypes} from '@/store/modules/admin'

export default {
  name: 'AdminPanelFilterReset',
  methods: {
    resetFilter: function() {
      this.$store.dispatch(actionTypes.resetFilter)
    }
  }
}
</script>
