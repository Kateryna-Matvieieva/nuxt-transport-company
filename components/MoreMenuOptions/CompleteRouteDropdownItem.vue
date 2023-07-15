<template>
  <b-dropdown-item @click="completeRoute">Complete Route</b-dropdown-item>
</template>

<script>
export default {
  name: 'CompleteRouteDropdownItem',
  props: {
    item: { type: Object, required: true },
  },
  methods: {
    completeRoute() {
      if (this.item.status === 'ongoing') {
        this.$emit('completeRoute', this.item);
      }
    }
  },
};
</script>
