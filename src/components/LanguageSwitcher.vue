<template>
  <ul class="lang-switch__wrapper">
    <li
      class="lang-switch__item"
      v-for="(lang, i) in languages"
      :key="`lang${i}`"
      :data-lang="lang"
      @click="switchLanguage"
    >
      {{ lang }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      languages: ['ru', 'en', 'kz']
    }
  },
  methods: {
    switchLanguage: function(e) {
      this.$root.$i18n.locale = e.target.dataset.lang
    }
  }
}
</script>

<style scoped>
.lang-switch__wrapper {
  display: flex;
  list-style: none;
  border-collapse: collapse;
}

.lang-switch__item {
  padding: 10px 15px;
  border: 1px solid #c1c1c1;
  background: #fff;
  text-transform: uppercase;
}

.lang-switch__item:hover {
  background: #ddd;
  cursor: pointer;
}
</style>
