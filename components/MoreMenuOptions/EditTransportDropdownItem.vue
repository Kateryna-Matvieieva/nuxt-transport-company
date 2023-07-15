<template>
  <b-dropdown-item @click="editTransportOptionHandler">Edit transport</b-dropdown-item>
</template>

<script>
export default {
  name: 'EditTransportDropdownItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editTransportOptionHandler() {
      this.$emit('editTransport', this.item);
    },
  },
};
</script>
