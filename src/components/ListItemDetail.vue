<template>
  <transition name="modal">
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
                <td>{{ application.applicant.social_status.name_ru }}</td>
              </tr>
              <tr>
                <td><b>Форма оплаты:</b></td>
                <td>{{ application.applicant.payment_method.name_ru }}</td>
              </tr>
            </table>
          </div>

          <div class="modal-footer">
            <!-- <slot name="footer">
              default footer
            </slot> -->
            <button
              class="btn btn-primary modal-default-button"
              @click="$emit('close')"
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
import {uuid} from 'vue-uuid' // Import uuid

export default {
  name: 'Modal',
  props: {
    application: {
      type: Object
    }
  },
  data() {
    return {
      uuid: uuid.v1()
    }
  }
}
</script>
<style scoped>
/* .modal-mask {
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

.modal-wrapper {
  max-height: 100%;
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
} */
</style>
