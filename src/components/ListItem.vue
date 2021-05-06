<template>
  <tr>
    <td>{{ application.applicant.id }}</td>
    <td>
      {{
        `${application.applicant.last_name} ${application.applicant.first_name} ${application.applicant.middle_name}`
      }}
    </td>
    <td>{{ application.applicant.gender }}</td>
    <td>{{ application.applicant.study_place.name_ru }}</td>
    <td>{{ application.status }}</td>
    <td>{{ application.settlement.status }}</td>
    <td>
      <button type="button" class="btn btn-warning mt-0 float-left">
        ...
      </button>
      удалить
    </td>
  </tr>
</template>
<script>
export default {
  name: 'ListItem',
  props: {
    application: {
      type: Object,
      required: true
    }
  }
}
</script>
