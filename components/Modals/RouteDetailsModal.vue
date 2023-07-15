<template>
  <b-modal id="route-details-modal" v-model="showModal" title="Route Details" @hide="resetModal" ok-only ok-title="OK">
    <div v-if="routeDetails">
      <p><strong>Route Id:</strong> {{ routeDetails.id }}</p>
      <p><strong>Start City:</strong> {{ routeDetails.start_city }}</p>
      <p><strong>End City:</strong> {{ routeDetails.end_city }}</p>
      <p><strong>Distance:</strong> {{ routeDetails.distance }}</p>
      <p><strong>Departure Date:</strong> {{ new Date(routeDetails.departure_date).toLocaleDateString() }}</p>
      <p><strong>Completion Date:</strong> {{ new Date(routeDetails.completion_date).toLocaleDateString() }}</p>
      <p><strong>Transport Type:</strong> {{ routeDetails.transport_type }}</p>
      <p><strong>Expected Revenue:</strong> {{ routeDetails.expected_revenue }}</p>
      <p><strong>Status:</strong> {{ routeDetails.status }}</p>
      <br />
      <h5>Assigned Transport Details</h5>
      <template v-if="routeDetails['Transport.id']">
        <p><strong>Transport Id:</strong> {{ routeDetails['Transport.id'] }}</p>
        <p><strong>Plate Number:</strong> {{ routeDetails['Transport.plate_number'] }}</p>
        <p><strong>Transport Status:</strong> {{ routeDetails['Transport.status'] }}</p>
        <p><strong>Transport Model:</strong> {{ routeDetails['Transport.model'] }}</p>
        <p><strong>Purchase Date:</strong> {{ new Date(routeDetails['Transport.purchase_date']).toLocaleDateString() }}
        </p>
        <p><strong>Mileage:</strong> {{ routeDetails['Transport.mileage'] }}</p>
        <p><strong>Transport Type:</strong> {{ routeDetails['Transport.transport_type'] }}</p>
      </template>
      <p v-else>No Assigned Transport</p>
    </div>
    <div v-if="serverError" class="alert alert-danger">
      {{ serverError }}
    </div>
    <b-spinner v-if="isLoading" />
  </b-modal>
</template>

<script>
export default {
  props: {
    routeId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      showModal: false,
      routeDetails: null,
      serverError: null,
      isLoading: false,
    };
  },
  watch: {
    routeId(newRouteId) {
      if (newRouteId) {
        this.fetchRouteDetails(newRouteId);
      }
    },
  },
  methods: {
    resetModal() {
      this.showModal = false;
      this.routeDetails = null;
    },
    async fetchRouteDetails(routeId) {
      this.isLoading = true;
      this.serverError = null;

      try {
        const response = await this.$axios.$get(`${this.$config.apiUrl}/api/v1/routes/${routeId}`, {
          headers: {
            'x-api-key': this.$config.apiKey,
          },
        });

        this.routeDetails = response.data;
        this.showModal = true;
      } catch (error) {
        console.error('Error retrieving route:', error);
        this.serverError = error.message || 'Unexpected error occurred';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
