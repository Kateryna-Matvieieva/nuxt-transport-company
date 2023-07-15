<template>
  <b-dropdown-item @click="editRouteOptionHandler">Edit route</b-dropdown-item>
</template>

<script>
export default {
  name: 'EditRouteDropdownItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editRouteOptionHandler() {
      this.$emit('editRouteTableHandler', {
        ...this.item,
        expected_revenue: parseFloat(this.item.expected_revenue.replace(/\D/g, '')),
        distance: parseFloat(this.item.distance.replace(/\D/g, '')),
      });
    },
  },
};
</script>
