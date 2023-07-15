<template>
  <b-dropdown-item @click="assignTransportHandler">Assign Transport</b-dropdown-item>
</template>

<script>
export default {
  name: 'AssignTransportDropdownItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    assignTransportHandler() {
      this.$emit('assignTransport', this.item.id);
    },
  },
};
</script>
