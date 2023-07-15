<template>
    <b-modal v-model="showModal" centered title="Confirm Delete">
      <p>Are sure you want to delete the following transport?</p>
      <p><strong>{{ message }}</strong></p>
      <b-alert v-if="deleteError" show variant="danger">
        {{ deleteError }}
      </b-alert>
      <template #modal-footer>
        <b-button variant="secondary" @click="cancel">Cancel</b-button>
        <b-button variant="danger" @click="deleteTransport" :disabled="deleting">Delete</b-button>
      </template>
    </b-modal>
  </template>

<script>
  export default {
    name: 'DeleteTransportConfirmModal',
    props: {
      transportToDelete: { type: Object, default: null },
      showModal: { type: Boolean, required: true },
    },
    data() {
      return {
        deleteError: null,
        deleting: false,
      };
    },
    computed: {
      message() {
        if (!this.transportToDelete) return '';
        return `Id(${this.transportToDelete.id}) ${this.transportToDelete.status} transport ${this.transportToDelete.plate_number} ${this.transportToDelete.purchase_date}`;
      },
    },
    methods: {
      async deleteTransport() {
        this.deleting = true;
        try {
          await this.$axios.$delete(`${this.$config.apiUrl}/api/v1/transports/${this.transportToDelete.id}`, {
            headers: {
              'x-api-key': this.$config.apiKey,
            },
          });
          this.$emit('delete', this.transportToDelete);
          this.deleteError = null;
        } catch (error) {
          console.error('Error deleting transport:', error);
          this.deleteError = 'Failed to delete transport. Please try again.';
        } finally {
          this.deleting = false;
        }
      },
      cancel() {
        this.$emit('cancel');
      },
    },
  };
</script>
