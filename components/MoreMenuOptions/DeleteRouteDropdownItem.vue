<template>
    <b-dropdown-item @click="deleteRoute">Delete route</b-dropdown-item>
  </template>
  
  <script>
  export default {
    name: 'DeleteRouteDropdownItem',
    methods: {
      deleteRoute() {
        this.$emit('deleteRoute');
      }
    }
  };
  </script>
  