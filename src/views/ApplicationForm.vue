<template>
	<div class="bg-light">
		<div id="schedule" class="container mb-5">
			<h4 class="mt-4" style="color: rgb(65, 66, 145);">КАЗАХСТАНСКО-АМЕРИКАНСКИЙ СВОБОДНЫЙ УНИВЕРСИТЕТ</h4>
			<p class="h6 text-body" style="width: 75%;">
				Городской вуз международного партнерства / Государственная
				лицензия АБ 0137478 Международная аккредитация ACBSP (США) / Институциональная и специализированная аккредитация
				НКАОКО (Казахстан)
			</p>

			<div class="row row-centered  mt-3">
				<div class="col-md-12 mx-auto rounded bg-white mt-1 border"
					style="color: white; background-color: rgba(65, 66, 145, 0.94) !important; background-image: linear-gradient(rgba(65, 66, 145, 0.94), rgba(65, 66, 145, 0.94)), url(&quot;img/logo_bg_lg.png&quot;); background-position-y: 15px;">
					<div class="row row-centered  mt-1">
						<div class="form-group col-md-3 col-12">
							<h6>Номера приёмной коммисии</h6>
							<p class="mb-0"><i aria-hidden="true" class="fas fa-phone-alt mr-2"></i>8(7232)500-300<br> <i
									aria-hidden="true" class="fas fa-phone-alt mr-2"></i>8(7232)50-50-30<br> <i aria-hidden="true"
									class="fas fa-phone-alt mr-2"></i>+7-707-440-00-01<br></p>
						</div>
						<div class="form-group col-md-5 col-12"></div>
						<div class="form-group col-md-4 col-12 d-none d-sm-block"><img :src="require('@/assets/kafu-logo.png')" class="float-right"
								style="height: 100px; right: 0px;"></div>
					</div>
				</div>
			</div>

			<div class="row row-centered ">
				<div class="col-md-12 mx-auto rounded bg-white mt-4 border ">
					<h3 class="mt-3">Персональные данные</h3>
					<hr>
					<div class="form-row row-centered  mt-2">
						<div class="form-group col-md-12 col-12"><label for="Surname">Фамилия по документам<i
									style="color: red;">*</i></label> <input type="text" id="Surname" placeholder="Фамилия"
								class="form-control"></div>
						<div class="form-group col-md-12 col-12"><label for="Name">Имя<i style="color: red;">*</i></label> <input
								type="text" id="Name" placeholder="Имя" class="form-control"></div>
						<div class="form-group col-md-12 col-12"><label for="Patronymic">Отчество</label> <input type="text"
								id="Patronymic" placeholder="Юрьевич" class="form-control"></div>
					</div>
				</div>
				<div class="col-md-12 mx-auto rounded bg-white mt-4 border">
					<div class="form-row row-centered  mt-2">
						<div class="form-group col-md-12 col-12"><label for="PlaceStudy">Место обучения<i
									style="color: red;">*</i></label> <select id="PlaceStudy" class="form-control">
								<option v-for="study_place in study_places" :key="study_place.id">{{ study_place.name }}</option>
								<option>Другое</option>
							</select></div>
						<div class="form-group col-md-12 col-12"><label for="FormTraining">Форма оплаты<i
									style="color: red;">*</i></label> <select id="FormTraining" class="form-control">
								<option>Выберите из списка.</option>
								<option v-for="payment_method in payment_methods" :key="payment_method.id">{{ payment_method.name }}</option>
							</select></div>
					</div>
				</div>
				<div class="col-md-12 mx-auto rounded bg-white mt-4 border float-none">
					<div class="form-row row-centered  mt-2 float-none">
						<div class="form-group col-md-12 col-12"><label for="Place_reg">Место прописки<i
									style="color: red;">*</i></label> <input type="text" id="Place_reg"
								placeholder="Казахстан, Восточно-Казахстанская обл., Усть-Каменогорск" class="form-control"></div>
					</div>
				</div>
				<hr>
				<div class="col-md-12 mx-auto rounded bg-white mt-4 border float-none">
					<div class="form-row row-centered  mt-2 float-none">
						<div class="form-group col-md-12 col-12"><label for="Email">Email<i
									style="color: rgb(255, 0, 0);">*</i></label> <input type="text" id="Email" placeholder="Email"
								class="form-control"></div>
						<div class="form-group col-md-12 col-12"><label for="MobilePhone">Контактный телефон<i
									style="color: red;">*</i></label> <input type="text" id="MobilePhone" placeholder="77055438349"
								class="form-control"></div>
					</div>
				</div>
				<div class="col-md-12 mx-auto rounded bg-white mt-4 bg-white">
					<div class="form-group col-md-12 col-12"><br> <label>Социальное положение</label> <button type="button"
							class="btn btn-secondary" style="width: 100%;">Выбрать</button></div>
				</div> <button class="btn btn-success mt-3 justify-content-center mx-auto">Отправить.</button>
			</div>


		</div>
	</div>
</template>
<script>
import formApi from '@/api/form'

export default {
	name: 'ApplicationForm',
	data: function(){
		return {
			payment_methods: [],
			social_statuses: [],
			study_places: [],
		}
	},
	created: async function(){
		let data = await formApi.getFormData()
		data = data.data
		this.payment_methods = data.payment_methods
		this.social_statuses = data.social_statuses
		this.study_places = data.study_places
		
		console.log(data)
	}
}
</script>


<style scoped>
	h4 {
		color: rgb(65, 66, 145);
	}
</style>