<template>
  <div class="col-md-12 mx-auto rounded bg-white mt-4 bg-white border">
    <div class="form-group col-md-12 col-12">
      <br />
      <label>{{ $t('form.social_status') }}</label>
      <p>{{ selectedSocialStatus }}</p>
      <button
        type="button"
        class="btn btn-secondary"
        style="width: 100%;"
        @click="openModal"
      >
        Выбрать
      </button>
    </div>
    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header"> </slot>
              <p>Выберите социальное положение:</p>
              <div class="mb-3">
                <label for="search_status" class="form-label">Поиск</label>
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
                  {{ socialStatus[`name_${$root.$i18n.locale}`] }}
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
        if (status.name_ru.search(regex) != -1) return true
        return false
      })
    },
    setStatus: function(e) {
      let index = e.target.value

      this.socialStatuses.map(status => {
        if (index == status.id) this.selectedSocialStatus = status.name_ru
      })
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.1s ease;
}

.modal-header {
  display: block;
}

.modal-wrapper {
  max-height: 100%;
}

.modal-body {
  max-height: 50vh;
  overflow-y: scroll;
}

.modal-container {
  color: black;
  width: 1000px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.1s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
