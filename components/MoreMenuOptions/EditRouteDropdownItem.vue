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
      const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        const date = new Date(Number(year), Number(month) - 1, Number(day));

        return date;
      }

      this.$emit('editRouteTableHandler', {
        ...this.item,
        departure_date: formatDate(this.item.departure_date),
        completion_date: formatDate(this.item.completion_date),
        expected_revenue: parseFloat(this.item.expected_revenue.replace(/\D/g, '')),
        distance: parseFloat(this.item.distance.replace(/\D/g, '')),
      });
    },
  },
};
</script>
