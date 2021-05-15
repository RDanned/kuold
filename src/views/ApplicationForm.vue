<template>
  <div class="bg-light">
    <div id="schedule" class="container mb-5">
      <h4 class="mt-4" style="color: rgb(65, 66, 145);">
        КАЗАХСТАНСКО-АМЕРИКАНСКИЙ СВОБОДНЫЙ УНИВЕРСИТЕТ
      </h4>
      <p class="h6 text-body" style="width: 75%;">
        Городской вуз международного партнерства / Государственная лицензия АБ
        0137478 Международная аккредитация ACBSP (США) / Институциональная и
        специализированная аккредитация НКАОКО (Казахстан)
      </p>

      <div class="row row-centered  mt-3">
        <div
          class="col-md-12 mx-auto rounded bg-white mt-1 border"
          style='color: white; background-color: rgba(65, 66, 145, 0.94) !important; background-image: linear-gradient(rgba(65, 66, 145, 0.94), rgba(65, 66, 145, 0.94)), url("img/logo_bg_lg.png"); background-position-y: 15px;'
        >
          <div class="row row-centered  mt-1">
            <div class="form-group col-md-3 col-12">
              <h6>Номера приёмной коммисии</h6>
              <p class="mb-0">
                <i aria-hidden="true" class="fas fa-phone-alt mr-2"></i
                >8(7232)500-300<br />
                <i aria-hidden="true" class="fas fa-phone-alt mr-2"></i
                >8(7232)50-50-30<br />
                <i aria-hidden="true" class="fas fa-phone-alt mr-2"></i
                >+7-707-440-00-01<br />
              </p>
            </div>
            <div class="form-group col-md-5 col-12"></div>
            <div class="form-group col-md-4 col-12 d-none d-sm-block">
              <img
                :src="require('@/assets/kafu-logo.png')"
                class="float-right"
                style="height: 100px; right: 0px;"
              />
            </div>
          </div>
        </div>
      </div>

      <form
        class="row"
        @submit.prevent="submitApplication"
        method="POST"
        enctype="multipart/form-data"
      >
        <div class="col-12 bg-white rounded mt-4 border ">
          <h3 class="mt-3">{{ $t('form.personal_data') }}</h3>
          <language-switcher />

          <hr />

          <div class="form-row row-centered  mt-2">
            <div class="form-group">
              <label for="last_name" class="form-label">
                Фамилия по документам<i style="color: red;">*</i>
              </label>
              <input
                type="text"
                id="last_name"
                placeholder="Фамилия"
                class="form-control"
                v-model="form.last_name"
              />
            </div>

            <div class="form-group">
              <label for="first_name" class="form-label">
                Имя<i style="color: red;">*</i>
              </label>
              <input
                type="text"
                id="first_name"
                placeholder="Имя"
                class="form-control"
                v-model="form.first_name"
              />
            </div>

            <div class="form-group">
              <label for="middle_name">Отчество</label>
              <input
                type="text"
                id="middle_name"
                placeholder="Юрьевич"
                class="form-control"
                v-model="form.middle_name"
              />
            </div>

            <div class="form-group">
              <label for="gender">Пол</label>
              <select
                name="gender"
                id="gender"
                class="form-control"
                v-model="form.gender"
              >
                <option value="0" selected>--Выберите из списка--</option>
                <option value="female">
                  женский
                </option>
                <option value="male">
                  мужской
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="iin">ИИН</label>
              <input
                type="text"
                id="iin"
                placeholder="1234567890"
                class="form-control"
                v-model="form.iin"
              />
            </div>
          </div>
        </div>

        <div class="col-md-12 mx-auto rounded bg-white mt-4 border">
          <div class="form-row row-centered  mt-2">
            <div class="form-group col-md-12 col-12">
              <label for="PlaceStudy"
                >Место обучения<i style="color: red;">*</i></label
              >
              <select
                id="PlaceStudy"
                class="form-control"
                v-model="form.study_place"
              >
                <option
                  v-for="study_place in study_places"
                  :key="study_place.id"
                  :value="study_place.id"
                  >{{ study_place.name_ru }}</option
                >
                <option>Другое</option>
              </select>
            </div>
            <div class="form-group col-md-12 col-12">
              <label for="FormTraining"
                >Форма оплаты<i style="color: red;">*</i></label
              >
              <select
                id="FormTraining"
                class="form-control"
                v-model="form.payment_method"
              >
                <option>Выберите из списка.</option>
                <option
                  v-for="payment_method in payment_methods"
                  :key="payment_method.id"
                  :value="payment_method.id"
                  >{{ payment_method.name_ru }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-12 mx-auto rounded bg-white mt-4 border ">
          <div class="form-row row-centered  mt-2 ">
            <div class="form-group col-md-12 col-12">
              <label for="Place_reg"
                >Место прописки<i style="color: red;">*</i></label
              >
              <!-- placeholder="Казахстан, Восточно-Казахстанская обл., Усть-Каменогорск" -->
              <input
                type="text"
                id="Place_reg"
                v-mask=""
                v-model="form.address"
                placeholder="Страта, область, город, улица, дом, квартира"
                class="form-control"
                value="Страта, область, город, улица, дом, квартира"
              />
            </div>
          </div>
        </div>
        <hr />
        <div class="col-md-12 mx-auto rounded bg-white mt-4 border ">
          <div class="form-row row-centered  mt-2 ">
            <div class="form-group col-md-12 col-12">
              <label for="Email"
                >Email<i style="color: rgb(255, 0, 0);">*</i></label
              >
              <input
                type="text"
                id="Email"
                placeholder="Email"
                class="form-control"
                v-model="form.email"
              />
            </div>

            <div class="form-group col-md-12 col-12">
              <label for="phone"
                >Контактный телефон<i style="color: red;">*</i></label
              >
              <input
                type="text"
                id="phone"
                placeholder="+7 (___) __-__-___ "
                class="form-control"
                v-mask="phoneMask"
                v-model="form.phone"
              />
            </div>
          </div>
        </div>
        <application-form-social-status
          :social-statuses="social_statuses"
          v-model="form.social_status"
        />
        <button
          class="btn btn-success mt-3 justify-content-center mx-auto"
          type="submit"
        >
          Отправить.
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import formApi from '@/api/form'
import ApplicationFormSocialStatus from '@/components/ApplicationFormSocialStatus'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default {
  name: 'ApplicationForm',
  components: {ApplicationFormSocialStatus, LanguageSwitcher},
  data: function() {
    return {
      payment_methods: [],
      social_statuses: [],
      study_places: [],
      mask: [/(\.*)/, ', ', /(\.*)/],
      myInputModel: '',
      phoneMask: '+7 (###) ##-##-###',

      form: {
        last_name: 'testlastname',
        first_name: 'testfirstname',
        middle_name: 'testmiddlename',

        iin: '1234567890',
        gender: 'male',

        study_place: 1,
        payment_method: 1,
        social_status: 1,

        address: 'Страта, область, город, улица, дом, квартира',

        email: 'test@mail.com',
        phone: '+77772675809'
      }
    }
  },
  created: async function() {
    let data = await formApi.getFormData()
    data = data.data
    this.payment_methods = data.payment_methods
    this.social_statuses = data.social_statuses
    this.study_places = data.study_places

    console.log(data)
  },
  updated: function() {
    console.log(this.form)
  },
  methods: {
    submitApplication: async function() {
      console.log('submit')
      let fullAddress = this.form.address.split(',')
      let result = formApi.send({
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        middle_name: this.form.middle_name,
        iin: this.form.iin,
        gender: this.form.gender,
        study_place: this.form.study_place,
        social_status: this.form.social_status,
        payment_method: this.form.payment_method,

        country: fullAddress[0],
        region: fullAddress[1],
        city: fullAddress[2],
        street: fullAddress[3],
        house: fullAddress[4],
        flat: fullAddress[5]
      })
      console.log(result)
    }
  }
}
</script>

<style scoped>
h4 {
  color: rgb(65, 66, 145);
}

.form-row {
  margin-bottom: 1rem;
}
</style>
