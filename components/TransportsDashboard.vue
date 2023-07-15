<template>
  <div>
    <br />
    <b-button variant="danger" @click="openCreateTransportModal">Create New Transport</b-button>
    <br />
    <br />
    <generic-transports-table title="Transports Dashboard" :transports="transports"
      :serverError="transportsServerError" :isLoading="isTransportsLoading"
      @openEditTransportDashboardHandler="openEditTransport" />
    <br />
    <edit-create-transport-modal :transport="transport" :showEditCreateTransportModal="showEditCreateTransportModal"
      @updateTransport="updateAndRefreshTransportList" @hide="closeEditCreateTransportModal" />
  </div>
</template>

<script>
import GenericTransportsTable from '~/components/GenericTransportsTable.vue';
import EditCreateTransportModal from '~/components/Modals/EditCreateTransportModal.vue';

export default {
  components: {
    GenericTransportsTable,
    EditCreateTransportModal,
  },
  data() {
    return {
      transports: [],
      transport: {},
      transportsServerError: null,
      isTransportsLoading: true,
      showEditCreateTransportModal: false,
    };
  },
  async mounted() {
    this.fetchTransports();
  },
  methods: {
    async fetchTransports() {
      const transportApiUrl = `${this.$config.apiUrl}/api/v1/transports`;

      try {
        const response = await this.$axios.$get(transportApiUrl, {
          headers: {
            'x-api-key': this.$config.apiKey,
          },
        });

        this.transports = response.data;
      } catch (error) {
        console.error('Error retrieving transports:', error);
        this.transportsServerError = error.message;
      } finally {
        this.isTransportsLoading = false;
      }
    },
    openEditTransport(transport) {
      this.transport = transport;
      this.showEditCreateTransportModal = true;
    },
    closeEditCreateTransportModal() {
      this.showEditCreateTransportModal = false;
    },
    openCreateTransportModal() {
      this.transport = this.getEmptyTransport();
      this.showEditCreateTransportModal = true;
    },
    getEmptyTransport() {
      // Modify this to match the fields of your Transport object
      return {
        name: '',
        type: '',
        capacity: 0,
        // ...
      };
    },
    async updateAndRefreshTransportList(updatedTransport) {
      this.closeEditCreateTransportModal();
      await this.fetchTransports();
    },
  },
};
</script>
