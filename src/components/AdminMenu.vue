<template>
  <div
    class="nav flex-column nav-pills"
    id="v-pills-tab"
    role="tablist"
    aria-orientation="vertical"
  >
    <router-link
      class="nav-link"
      id="v-pills-home-tab"
      data-toggle="pill"
      :to="{name: 'applicants'}"
      role="tab"
      aria-controls="v-pills-home"
      aria-selected="true"
      active-class="active"
      exact
    >
      Список заявителей
    </router-link>
    <router-link
      class="nav-link"
      id="v-pills-home-tab"
      data-toggle="pill"
      :to="{name: 'settlement'}"
      role="tab"
      aria-controls="v-pills-home"
      aria-selected="true"
      active-class="active"
      exact
    >
      Список расселения
    </router-link>
    <router-link
      class="nav-link"
      id="v-pills-home-tab"
      data-toggle="pill"
      :to="{name: 'evicted'}"
      role="tab"
      aria-controls="v-pills-home"
      aria-selected="true"
      active-class="active"
      exact
    >
      Список выселенных
    </router-link>
    <router-link
      class="nav-link"
      id="v-pills-home-tab"
      data-toggle="pill"
      :to="{name: 'basket'}"
      role="tab"
      aria-controls="v-pills-home"
      aria-selected="true"
      active-class="active"
      exact
    >
      Корзина
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'AdminMenu'
}
</script>
