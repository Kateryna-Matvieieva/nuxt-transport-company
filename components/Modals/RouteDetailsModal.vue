<template>
    <b-modal
      id="route-details-modal"
      v-model="showModal"
      title="Route Details"
      @hide="resetModal"
      ok-only
      ok-title="OK"
    >
      <div v-if="routeDetails">
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
        <p><strong>Plate Number:</strong> {{ routeDetails["Transport.plate_number"] }}</p>
        <p><strong>Transport Status:</strong> {{ routeDetails["Transport.status"] }}</p>
        <p><strong>Transport Model:</strong> {{ routeDetails["Transport.model"] }}</p>
        <p><strong>Purchase Date:</strong> {{ new Date(routeDetails["Transport.purchase_date"]).toLocaleDateString() }}</p>
        <p><strong>Mileage:</strong> {{ routeDetails["Transport.mileage"] }}</p>
        <p><strong>Transport Type:</strong> {{ routeDetails["Transport.transport_type"] }}</p>
      </div>
    </b-modal>
  </template>
  
  <script>

export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showModal: false,
      routeDetails: null,
    };
  },
  watch: {
    data(newData) {
      this.routeDetails = newData;
      if (newData) {
        this.showModal = true;
      }
    },
  },
  methods: {
    resetModal() {
      this.showModal = false;
      this.routeDetails = null;
    },
  },
};
</script>
  