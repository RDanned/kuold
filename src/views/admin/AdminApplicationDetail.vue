<template>
  <div class="admin-application row" v-if="application">
    <div class="admin-application__data col-12">
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
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/application'

export default {
  name: 'AdminApplicationDetail',
  computed: {
    ...mapState({
      application: state => state.application.data
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getApplication, {
      id: this.$route.params.id
    })
  }
}
</script>
