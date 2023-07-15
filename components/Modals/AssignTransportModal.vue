<template>
  <b-modal v-model="showModal" title="Assign Transport" @hide="cancel" centered>
    <div v-if="fetching">Loading...</div>
    <div v-else-if="availableTransports.length > 0">
      <b-form-radio-group v-model="selectedTransportId" :options="transportOptions" name="transport-options"
        stacked></b-form-radio-group>
    </div>
    <div v-else>No available transport for these dates: {{ routeDates }}</div>

    <b-alert v-if="fetchError" show variant="danger">
      {{ fetchError }}
    </b-alert>

    <template #modal-footer>
      <b-button variant="secondary" @click="cancel">Cancel</b-button>
      <b-button variant="primary" @click="confirmAssignment" :disabled="fetching">Assign</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'AssignTransportModal',
  props: {
    routeId: { type: Number, default: null },
    showModal: { type: Boolean, required: true },
  },
  data() {
    return {
      availableTransports: [],
      selectedTransportId: null,
      fetchError: null,
      fetching: false,
      routeDates: null,
    };
  },
  computed: {
    transportOptions() {
      return this.availableTransports.map(t => ({
        text: `Id(${t.id}) - ${t.plate_number} ${t.model} (${t.transport_type})`,
        value: t.id
      }));
    }
  },
  watch: {
    routeId(newRouteId) {
      if (newRouteId) {
        this.fetchAvailableTransports(newRouteId);
      }
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    async fetchAvailableTransports(routeId) {
      this.fetching = true;
      try {
        const response = await this.$axios.$get(`/api/v1/routes/${routeId}/availableTransports`, {
          headers: {
            'x-api-key': this.$config.apiKey,
          },
        });

        this.availableTransports = response.data.availableTransports;
        if (response.data.route) {
          this.routeDates = `${new Date(response.data.route.departure_date).toLocaleDateString()} - ${new Date(response.data.route.completion_date).toLocaleDateString()}`;
          this.selectedTransportId = response.data.route.transport_id;
        }

        this.fetchError = null;
      } catch (error) {
        console.error('Failed to fetch available transports:', error);
        this.fetchError = error.message;
      } finally {
        this.fetching = false;
      }
    },
    async confirmAssignment() {
      if (this.selectedTransportId) {
        this.fetching = true;
        try {
          const response = await this.$axios.$patch(`/api/v1/routes/${this.routeId}/assignTransport/${this.selectedTransportId}`, {}, {
            headers: {
              'x-api-key': this.$config.apiKey,
            },
          });
          this.$emit('assignTransport', response.data);
          this.cancel();
        } catch (error) {
          console.error('Failed to assign transport:', error);
          this.fetchError = error.message;
        } finally {
          this.fetching = false;
        }
      }
    },
  },
};
</script>
