<template>
  <p class="text-danger form-error">{{ error }}</p>
</template>
<script>
export default {
  name: 'ApplicationFormError',
  props: {
    error: {
      required: true
    }
  }
}
</script>
