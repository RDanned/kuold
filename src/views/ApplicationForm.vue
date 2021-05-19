<template>
  <div class="bg-light">
    <warning />
    <div class="container form-page">
      <div class="row form-header">
        <h4 class="form-title col-10">
          {{ $t('kafu.title') }}
        </h4>
        <p class="form-description col-10">
          {{ $t('kafu.description') }}
        </p>
        <language-switcher class="col-2" />
      </div>

      <div class="row form-banner">
        <div class="col-3 form-contacts">
          <h6>{{ $t('kafu.contacts') }}</h6>
          <p class="mb-0">
            <a href="tel:87232500300">
              <i aria-hidden="true" class="fas fa-phone-alt mr-2"></i>
              8(7232)500-300
            </a>
            <br />
            <a href="tel:87232505030">
              <i aria-hidden="true" class="fas fa-phone-alt mr-2"></i>
              8(7232)50-50-30
            </a>
            <br />
            <a href="tel:77074400001">
              <i aria-hidden="true" class="fas fa-phone-alt mr-2"></i>
              +7-707-440-00-01
            </a>
            <br />
          </p>
        </div>
        <div class="col-6">
          {Чем то заполнить, например названием страницы/формы}
        </div>
        <div class="col-3">
          <img :src="require('@/assets/kafu-logo.png')" class="logo" />
        </div>
      </div>

      <form
        class="row"
        @submit.prevent="submitApplication"
        method="POST"
        enctype="multipart/form-data"
      >
        <div class="col-12 bg-white rounded mt-4 border ">
          <h3 class="mt-3">{{ $t('form.personal_data_title') }}</h3>
          <input name="lang" type="hidden" :value="$root.$i18n.locale" />
          <hr />

          <div class="form-row row-centered  mt-2">
            <div class="form-group">
              <label for="last_name" class="form-label">
                {{ $t('form.last_name') }}
              </label>
              <input
                type="text"
                id="last_name"
                :placeholder="$t('form.last_name')"
                class="form-control"
                v-model="form.last_name"
              />
            </div>

            <div class="form-group">
              <label for="first_name" class="form-label">
                {{ $t('form.first_name') }}<i style="color: red;">*</i>
              </label>
              <input
                type="text"
                id="first_name"
                :placeholder="$t('form.first_name')"
                class="form-control"
                v-model="form.first_name"
              />
            </div>

            <div class="form-group">
              <label for="middle_name">{{ $t('form.middle_name') }}</label>
              <input
                type="text"
                id="middle_name"
                :placeholder="$t('form.personal_data_title')"
                class="form-control"
                v-model="form.middle_name"
              />
            </div>

            <div class="form-group">
              <label for="gender"
                >{{ $t('form.gender.title')
                }}<i style="color: red;">*</i></label
              >
              <select
                name="gender"
                id="gender"
                class="form-control"
                v-model="form.gender"
              >
                <option value="0" selected
                  >--{{ $t('form.select_placeholder') }}--</option
                >
                <option value="female">
                  {{ $t('form.gender.male') }}
                </option>
                <option value="male">
                  {{ $t('form.gender.female') }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="iin">{{ $t('form.iin') }}</label>
              <input
                type="text"
                id="iin"
                placeholder="1234567890"
                class="form-control"
                v-model="form.iin"
                v-mask="'################'"
                :masked="true"
              />
            </div>
          </div>
        </div>

        <application-form-social-status
          :social-statuses="social_statuses"
          v-model="form.social_status"
        />

        <div class="col-md-12 mx-auto rounded bg-white mt-4 border">
          <div class="form-row row-centered  mt-2">
            <div class="form-group col-md-12 col-12">
              <label for="study_place"
                >{{ $t('form.study_place') }}<i style="color: red;">*</i></label
              >
              <select
                id="study_place"
                class="form-control"
                v-model="form.study_place"
              >
                <option disabled value="">
                  --{{ $t('form.select_placeholder') }}--
                </option>
                <option
                  v-for="study_place in study_places"
                  :key="study_place.id"
                  :value="study_place.id"
                  >{{ study_place[`name_${$root.$i18n.locale}`] }}</option
                >
                <option>{{ $t('form.other_placeholder') }}</option>
              </select>
            </div>
            <div class="form-group col-md-12 col-12">
              <label for="payment_method"
                >{{ $t('form.payment_method')
                }}<i style="color: red;">*</i></label
              >
              <select
                id="payment_method"
                class="form-control"
                v-model="form.payment_method"
              >
                <option disabled value="">
                  --{{ $t('form.select_placeholder') }}--
                </option>
                <option
                  v-for="payment_method in payment_methods"
                  :key="payment_method.id"
                  :value="payment_method.id"
                  >{{ payment_method[`name_${$root.$i18n.locale}`] }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-12 mx-auto rounded bg-white mt-4 border ">
          <h3 class="mt-3">{{ $t('form.contact_info_title') }}</h3>
          <div class="form-row row-centered  mt-2">
            <div class="form-group col-md-12 col-12">
              <label for="address"
                >{{ $t('form.address') }}<i style="color: red;">*</i></label
              >
              <input
                type="text"
                id="address"
                v-model="form.address"
                placeholder="Страта, область, город, улица, дом, квартира"
                class="form-control"
                value="Страта, область, город, улица, дом, квартира"
              />
            </div>
          </div>

          <div class="form-row row-centered  mt-2">
            <div class="form-group col-md-12 col-12">
              <label for="email">
                {{ $t('form.email') }}
                <i style="color: rgb(255, 0, 0);">*</i></label
              >
              <input
                type="email"
                id="email"
                placeholder="email"
                class="form-control"
                v-model="form.email"
              />
            </div>
          </div>

          <div class="form-row row-centered mt-2">
            <div class="form-group col-md-12 col-12">
              <label for="phone">
                {{ $t('form.phone') }}
                <i style="color: red;">*</i>
              </label>
              <input
                type="tel"
                id="phone"
                v-mask="'+7 (###) ##-##-###'"
                placeholder="+7 (___) __-__-___"
                :masked="true"
                class="form-control"
                v-model="form.phone"
              />
            </div>
          </div>
        </div>
        <button
          class="btn btn-success mt-3 justify-content-center mx-auto"
          type="submit"
        >
          {{ $t('form.submit_btn') }}
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import '@/assets/css/form.css'
import formApi from '@/api/form'
import ApplicationFormSocialStatus from '@/components/ApplicationFormSocialStatus'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Warning from '@/components/Warning'
import {mask} from 'vue-the-mask'

export default {
  name: 'ApplicationForm',
  components: {ApplicationFormSocialStatus, LanguageSwitcher, Warning},
  directives: {mask},
  data: function() {
    return {
      payment_methods: [],
      social_statuses: [],
      study_places: [],

      form: {
        last_name: 'testlastname',
        first_name: 'testfirstname',
        middle_name: 'testmiddlename',

        iin: '1234567890',
        gender: 'male',

        study_place: '',
        payment_method: '',
        social_status: '',

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
