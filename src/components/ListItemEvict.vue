<template>
  <transition name="modal" v-if="application">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> </slot>
            <p>Информация о заявителе:</p>
          </div>

          <div class="modal-body">
            <slot name="body"> </slot>
          </div>

          <div class="modal-footer">
            <button class="btn btn-primary modal-default-button" @click="close">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import '@/assets/css/modal.css'
import {mapState} from 'vuex'
import {actionTypes as modalActions} from '@/store/modules/modal'

export default {
  name: 'ListItemEvict',
  computed: {
    ...mapState({
      application: state => state.modal.evictApplication
    })
  },
  methods: {
    close: function() {
      this.$store.dispatch(modalActions.resetEvictApplication)
    }
  }
}
</script>
