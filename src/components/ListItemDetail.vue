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

            <h3>
              #{{ application.applicant.id }}:
              {{ `${application.applicant.full_name}` }}
            </h3>
            <table class="table table-bordered">
              <p>{{ $tc('full_name') }}</p>
              <tr>
                <td>
                  <b>Пол</b>
                </td>
                <td>
                  {{ application.applicant.gender }}
                </td>
              </tr>
              <tr>
                <td>
                  <b>ИИН</b>
                </td>
                <td>
                  {{ application.applicant.iin }}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Контактный телефон</b>
                </td>
                <td>
                  {{ application.applicant.phone }}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Email </b>
                </td>
                <td>
                  {{ application.applicant.email }}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Адрес прописки: </b>
                </td>
                <td>
                  <ul>
                    <li>Страна: {{ application.applicant.country }}</li>
                    <li>Регион: {{ application.applicant.region }}</li>
                    <li>Город: {{ application.applicant.city }}</li>
                    <li>Улица: {{ application.applicant.street }}</li>
                    <li>Дом: {{ application.applicant.house }}</li>
                    <li>Квартира: {{ application.applicant.flat }}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><b>Место обучения:</b></td>
                <td>
                  {{ application.applicant.study_place.name_ru }}
                </td>
              </tr>
              <tr>
                <td><b>Социальное положение:</b></td>
                <td v-if="application.applicant.social_status">
                  {{ application.applicant.social_status.name_ru }}
                </td>
                <td v-else>
                  Не указано
                </td>
              </tr>
              <tr>
                <td><b>Форма оплаты:</b></td>
                <td>{{ application.applicant.payment_method.name_ru }}</td>
              </tr>
            </table>
          </div>

          <div class="modal-footer">
            <button
              class="btn btn-primary modal-default-button"
              @click="closeDetail"
            >
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
  name: 'ListItemDetail',
  computed: {
    ...mapState({
      application: state => state.modal.applicationDetail
    })
  },
  methods: {
    closeDetail: function() {
      this.$store.dispatch(modalActions.resetApplicationDetail)
    }
  }
}
</script>
