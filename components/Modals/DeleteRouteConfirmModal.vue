<template>
    <b-modal
      v-model="showModal"
      title="Confirm Delete"
      @hide="cancel"
      ok-title="Delete"
      cancel-title="Cancel"
      ok-variant="danger"
    >
      <p class="my-4">{{ message }}</p>
    </b-modal>
  </template>
  
  <script>
  export default {
    props: {
      showModal: {
        type: Boolean,
        default: false,
      },
      message: {
        type: String,
        default: '',
      },
    },
    methods: {
      cancel() {
        this.$emit('cancel');
      },
      confirm() {
        this.$emit('confirm');
      },
    },
  };
  </script>
  