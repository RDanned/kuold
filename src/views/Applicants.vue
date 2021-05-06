<template>
  <div>
    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <td>#</td>
          <td>ФИО</td>
          <td>Пол</td>
          <td>Место обучения</td>
          <td>Статус заявки</td>
          <td>Статус вселения</td>
          <td>Действия</td>
        </tr>
      </thead>
      <tbody>
        <list-item
          v-for="application in data"
          :key="application.id"
          :application="application"
          @open="openModal"
        />
      </tbody>
    </table>
    <modal v-if="showModal" @close="closeModal">
      <template v-slot:header>
        #{{ modalApplication.applicant.id }}:
        {{ `${modalApplication.applicant.full_name}` }}
      </template>
      <template v-slot:body>
        <table class="table table-bordered">
          <tr>
            <td>
              <b>Пол</b>
            </td>
            <td>
              {{ modalApplication.applicant.gender }}
            </td>
          </tr>
          <tr>
            <td>
              <b>ИИН</b>
            </td>
            <td>
              {{ modalApplication.applicant.iin }}
            </td>
          </tr>
          <tr>
            <td>
              <b>Контактный телефон</b>
            </td>
            <td>
              {{ modalApplication.applicant.phone }}
            </td>
          </tr>
          <tr>
            <td>
              <b>Email </b>
            </td>
            <td>
              {{ modalApplication.applicant.email }}
            </td>
          </tr>
          <tr>
            <td>
              <b>Адрес прописки: </b>
            </td>
            <td>
              <ul>
                <li>Страна: {{ modalApplication.applicant.country }}</li>
                <li>Регион: {{ modalApplication.applicant.region }}</li>
                <li>Город: {{ modalApplication.applicant.city }}</li>
                <li>Улица: {{ modalApplication.applicant.street }}</li>
                <li>Дом: {{ modalApplication.applicant.house }}</li>
                <li>Квартира: {{ modalApplication.applicant.flat }}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td><b>Место обучения:</b></td>
            <td>
              {{ modalApplication.applicant.study_place.name_ru }}
            </td>
          </tr>
          <tr>
            <td><b>Социальное положение:</b></td>
            <td>{{ modalApplication.applicant.social_status.name_ru }}</td>
          </tr>
          <tr>
            <td><b>Форма оплаты:</b></td>
            <td>{{ modalApplication.applicant.payment_method.name_ru }}</td>
          </tr>
        </table>
      </template>
    </modal>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/admin'
import ListItem from '@/components/ListItem'
import Modal from '@/components/Modal'

export default {
  name: 'Applicants',
  components: {ListItem, Modal},
  data() {
    return {
      showModal: false,
      modalApplication: {}
    }
  },
  computed: {
    ...mapState({
      data: state => state.admin.data
    })
  },
  mounted() {
    console.log('init feed')
    this.$store.dispatch(actionTypes.getData, {apiUrl: 'applicants'})
  },
  methods: {
    openModal: function(id) {
      this.modalApplication = this.data.filter(app => {
        console.log(app)
        return app.id == id
      })[0]
      console.log(this.modalApplication)
      this.showModal = true
    },
    closeModal: function() {
      this.showModal = false
    }
  }
}
</script>
