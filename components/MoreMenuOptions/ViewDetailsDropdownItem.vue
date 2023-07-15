<template>
  <b-dropdown-item @click="viewDetails">View details</b-dropdown-item>
</template>

<script>
export default {
  name: 'ViewDetailsDropdownItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewDetails() {
      this.$emit('viewDetails', this.item.id);
    },
  },
};
</script>
