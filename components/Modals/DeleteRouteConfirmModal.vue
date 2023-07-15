<template>
  <b-modal v-model="showModal" centered title="Confirm Delete">
    <p>Are sure you want to delete the following route?</p>
    <p><strong>{{ message }}</strong></p>
    <b-alert v-if="deleteError" show variant="danger">
      {{ deleteError }}
    </b-alert>
    <template #modal-footer>
      <b-button variant="secondary" @click="cancel">Cancel</b-button>
      <b-button variant="danger" @click="deleteRoute" :disabled="deleting">Delete</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'DeleteRouteConfirmModal',
  props: {
    routeToDelete: { type: Object, default: null },
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
      if (!this.routeToDelete) return '';
      return `Id(${this.routeToDelete.id}) ${this.routeToDelete.status} route ${this.routeToDelete.start_city}-${this.routeToDelete.end_city} ${this.routeToDelete.departure_date} - ${this.routeToDelete.completion_date}`;
    },
  },
  methods: {
    async deleteRoute() {
      this.deleting = true;
      try {
        await this.$axios.$delete(`/api/v1/routes/${this.routeToDelete.id}`, {
          headers: {
            'x-api-key': process.env.API_KEY,
          },
        });
        this.$emit('delete', this.routeToDelete);
        this.deleteError = null;
      } catch (error) {
        console.error('Error deleting route:', error);
        this.deleteError = 'Failed to delete route. Please try again.';
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
