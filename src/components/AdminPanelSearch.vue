<template>
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon">Поиск по ФИО</span>
    <input
      type="text"
      class="form-control"
      placeholder="ФИО"
      aria-label="ФИО"
      aria-describedby="basic-addon"
      @input="search"
    />
  </div>
</template>
<script>
import {actionTypes} from '@/store/modules/admin'

export default {
  name: 'AdminPanelSearch',
  methods: {
    search: function(e) {
      let searchString = e.target.value
      console.log(searchString)
      this.$store.dispatch(actionTypes.setSearchString, {searchString})
    }
  }
}
</script>
