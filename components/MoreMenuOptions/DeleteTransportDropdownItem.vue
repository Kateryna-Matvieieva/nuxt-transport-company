<template>
  <b-dropdown-item @click="deleteTransport">Delete transport</b-dropdown-item>
</template>

<script>
export default {
  name: 'DeleteTransportDropdownItem',
  methods: {
    deleteTransport() {
      this.$emit('deleteTransport');
    },
  },
};
</script>
