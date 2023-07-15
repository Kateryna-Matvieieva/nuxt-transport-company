<template>
  <b-modal id="transport-details-modal" v-model="showModal" title="Transport Details" @hide="resetModal" ok-only
    ok-title="OK">
    <div v-if="transportDetails">
      <p><strong>Transport Id:</strong> {{ transportDetails.id }}</p>
      <p><strong>Plate Number:</strong> {{ transportDetails.plate_number }}</p>
      <p><strong>Status:</strong> {{ transportDetails.status }}</p>
      <p><strong>Model:</strong> {{ transportDetails.model }}</p>
      <p><strong>Purchase Date:</strong> {{ new Date(transportDetails.purchase_date).toLocaleDateString() }}</p>
      <p><strong>Mileage:</strong> {{ transportDetails.mileage }}</p>
      <p><strong>Transport Type:</strong> {{ transportDetails.transport_type }}</p>

      <br />
      <h5>Assigned Routes</h5>
      <div v-for="route in transportDetails.Routes" :key="route.id">
        <p><strong>Route Id:</strong> {{ route.id }}</p>
        <p><strong>Start-End City:</strong> {{ route.start_city }} - {{ route.end_city }}</p>
        <p><strong>Distance:</strong> {{ route.distance }} km</p>
        <p><strong>Departure-Completion Date:</strong> {{ new Date(route.departure_date).toLocaleDateString() }} -
          {{ new Date(route.completion_date).toLocaleDateString() }}</p>
        <p><strong>Expected Revenue:</strong> ${{ route.expected_revenue }}</p>
      </div>
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
    transportId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      showModal: false,
      transportDetails: null,
      serverError: null,
      isLoading: false,
    };
  },
  watch: {
    transportId(newTransportId) {
      if (newTransportId) {
        this.fetchTransportDetails(newTransportId);
      }
    },
  },
  methods: {
    resetModal() {
      this.showModal = false;
      this.transportDetails = null;
    },
    async fetchTransportDetails(transportId) {
      this.isLoading = true;
      this.serverError = null;

      try {
        const response = await this.$axios.$get(`${this.$config.apiUrl}/api/v1/transports/${transportId}`, {
          headers: {
            'x-api-key': this.$config.apiKey,
          },
        });

        this.transportDetails = response.data;
        this.showModal = true;
      } catch (error) {
        console.error('Error retrieving transport:', error);
        this.serverError = error.message || 'Unexpected error occurred';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
 