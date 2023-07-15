<template>
  <b-modal v-model="showModal" centered title="Confirm Completion">
    <p>Are you sure you want to complete the following route?</p>
    <p><strong>{{ message }}</strong></p>
    <b-alert v-if="completionError" show variant="danger">
      {{ completionError }}
    </b-alert>
    <template #modal-footer>
      <b-button variant="secondary" @click="cancel">Cancel</b-button>
      <b-button variant="primary" @click="updateRoute" :disabled="isFutureRoute || completing">Complete</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'CompleteRouteConfirmModal',
  props: {
    routeToComplete: { type: Object, default: null },
    showModal: { type: Boolean, required: true },
  },
  data() {
    return {
      completionError: null,
      completing: false,
    };
  },
  computed: {
    isFutureRoute() {
      const now = new Date();
      const departureDate = new Date(this.routeToComplete?.departure_date.split('/').reverse().join('-'));
      const completionDate = new Date(this.routeToComplete?.completion_date.split('/').reverse().join('-'));

      return now < departureDate || now < completionDate;
    },
    message() {
      if (!this.routeToComplete) return '';
      return `Id(${this.routeToComplete.id}) ${this.routeToComplete.status} route ${this.routeToComplete.start_city}-${this.routeToComplete.end_city} ${this.routeToComplete.departure_date} - ${this.routeToComplete.completion_date}`;
    },
  },
  watch: {
    isFutureRoute(newVal) {
      if (newVal) {
        this.completionError = 'The dates of the route are still in the future. Sorry, you cannot complete future routes.';
      } else {
        this.completionError = null;
      }
    },
  },
  methods: {
    async updateRoute() {
      if (this.isFutureRoute) {
        this.completionError = 'The dates of the route are still in the future. Sorry, you cannot complete future routes.';
        return;
      }

      this.completing = true;
      try {
        await this.$axios.$patch(`${this.$config.apiUrl}/api/v1/routes/${this.routeToComplete.id}/complete`, {
          headers: {
            'x-api-key': this.$config.apiKey,
          },
        });
        this.$emit('complete', { ...this.routeToComplete, status: 'completed' });
        this.completionError = null;
      } catch (error) {
        console.error('Error completing route:', error);
        this.completionError = 'Failed to complete route. Please try again.';
      } finally {
        this.completing = false;
      }
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>
