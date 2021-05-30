<template>
  <div class="admin-filter__item">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      :id="`application_status_${filterName}`"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ selectedFilter }}
    </button>
    <ul
      class="dropdown-menu"
      :aria-labelledby="`application_status_${filterName}`"
    >
      <li
        v-for="(item, index) in filterValues"
        :key="index"
        :data-filter-id="item.id"
        @click="selectFilter"
      >
        <a class="dropdown-item" href="#">
          {{ item.name_ru }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/admin'

export default {
  name: 'AdminPanelFilterItem',
  props: {
    filterName: {
      type: String,
      required: true
    },
    filterValues: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      selectedFilter: function(state) {
        let selected = 'Не выбрано'

        if (!state.admin.filter) return 'Не выбрано'

        state.admin.filter.map(filter => {
          if (filter.by == this.filterName)
            this.filterValues.map(value => {
              if (value.id == filter.value) {
                selected = value.name_ru
              }
            })
        })

        return selected
      }
    })
  },
  mounted() {
    /*console.log(this.filterName)
    console.log(this.filterValues)*/
  },
  methods: {
    selectFilter: function(e) {
      let filter = e.currentTarget.dataset.filterId
      this.$store.dispatch(actionTypes.appendFilter, {
        filter: {by: this.filterName, value: filter}
      })
    }
  }
}
</script>
