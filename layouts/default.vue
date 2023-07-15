<template>
  <div>
    <nav>
      <nuxt-link to="/" exact>Home</nuxt-link>
      <nuxt-link to="/routes">Routes</nuxt-link>
      <nuxt-link to="/transports">Transports</nuxt-link>
    </nav>
    <Nuxt />
  </div>
</template>

<style scoped>
.nuxt-link-active {
  color: blue;
}
</style>
