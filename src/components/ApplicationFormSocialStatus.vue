<template>
  <div class="col-md-12 mx-auto rounded bg-white mt-4 bg-white border">
    <div class="form-group col-md-12 col-12 mb-3">
      <br />
      <label>{{ $t('form.social_status.label') }}</label>
      <hr />
      <p>{{ selectedSocialStatus }}</p>
      <button type="button" class="btn btn-secondary" @click="openModal">
        {{ $t('form.choose_btn') }}
      </button>
    </div>
    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header"> </slot>
              <p>{{ $t('form.social_status.title') }}:</p>
              <div class="mb-3">
                <label for="search_status" class="form-label">{{
                  $t('form.search')
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  id="search_status"
                  @input="searchStatus"
                />
              </div>
            </div>

            <div class="modal-body">
              <div
                v-for="socialStatus in statuses"
                :key="socialStatus.id"
                class="form-check"
              >
                <input
                  type="radio"
                  name="social_status"
                  :id="`social_status_${socialStatus.id}`"
                  :value="socialStatus.id"
                  @change="
                    ;[$emit('input', $event.target.value), setStatus($event)]
                  "
                  class="form-check-input"
                />
                <label
                  :for="`social_status_${socialStatus.id}`"
                  class="form-check-label"
                >
                  {{ socialStatus[name_lang] }}
                </label>
              </div>
            </div>

            <div class="modal-footer">
              <button
                class="btn btn-primary modal-default-button"
                @click.prevent="closeModal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import '@/assets/css/modal.css'

export default {
  name: 'ApplicationFormSocialStatus',
  props: {
    socialStatuses: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      showModal: false,
      statuses: this.socialStatuses,
      selectedSocialStatus: ''
    }
  },
  methods: {
    openModal: function() {
      this.showModal = true
      this.statuses = this.socialStatuses
    },
    closeModal: function() {
      this.showModal = false
    },
    searchStatus: function(e) {
      let searchString = e.target.value

      if (searchString.length == 0) {
        this.statuses = this.socialStatuses
        return
      }

      this.statuses = this.socialStatuses.filter(status => {
        let regex = new RegExp(`(${searchString})`, 'gi')
        if (status[this.name_lang].search(regex) != -1) return true
        return false
      })
    },
    setStatus: function(e) {
      let index = e.target.value

      this.socialStatuses.map(status => {
        if (index == status.id) this.selectedSocialStatus = status.name_ru
      })
    }
  },
  computed: {
    name_lang: function() {
      return `name_${this.$root.$i18n.locale}`
    }
  }
}
</script>

<style scoped>
.modal-header {
  align-items: flex-start;
  flex-direction: column;
}

.modal-body {
  max-height: 50vh;
  overflow-y: scroll;
}
</style>
