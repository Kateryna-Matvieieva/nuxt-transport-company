<template>
  <div>
    <h3>{{ title }}</h3>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="!isLoading && !serverError && localTransports.length === 0">No data</div>
    <div v-else-if="!isLoading && serverError" class="alert alert-danger">
      {{ serverError }}
    </div>
    <div v-else>
      <b-table striped hover :items="formattedTransports" :fields="tableFields">
        <template v-slot:cell(actions)="data">
          <b-dropdown>
            <ViewDetailsDropdownItem :item="data.item" @viewDetails="viewDetails" />
            <!-- <EditTransportDropdownItem :item="data.item" @editTransportTableHandler="editTransportTableHandler" /> -->
            <DeleteTransportDropdownItem @deleteTransport="prepareForDeletion(data.item)" />
          </b-dropdown>
        </template>
      </b-table>
    </div>
    <DeleteTransportConfirmModal :showModal.sync="showDeleteModal" :transportToDelete="transportToDelete"
      @delete="deleteTransport" @cancel="cancelDeletion" />
    <TransportDetailsModal :transportId="selectedTransportId" @reset="selectedTransportId = null" />
  </div>
</template>

<script>
import ViewDetailsDropdownItem from './MoreMenuOptions/ViewDetailsDropdownItem.vue';
import DeleteTransportDropdownItem from './MoreMenuOptions/DeleteTransportDropdownItem.vue';
import EditTransportDropdownItem from './MoreMenuOptions/EditTransportDropdownItem.vue';
import DeleteTransportConfirmModal from './Modals/DeleteTransportConfirmModal.vue';
import TransportDetailsModal from './Modals/TransportDetailsModal.vue';

export default {
  name: 'GenericTransportsTable',
  components: {
    ViewDetailsDropdownItem,
    DeleteTransportDropdownItem,
    EditTransportDropdownItem,
    DeleteTransportConfirmModal,
    TransportDetailsModal,
  },
  props: {
    title: { type: String, required: true },
    transports: { type: Array, required: true },
    serverError: { type: String, default: null },
    isLoading: { type: Boolean, default: false },
  },
  data() {
    return {
      tableFields: [
        { key: 'actions', label: 'Actions' },
        { key: 'id', label: 'Id' },
        { key: 'plate_number', label: 'Plate Number' },
        { key: 'status', label: 'Status' },
        { key: 'model', label: 'Model' },
        { key: 'purchase_date', label: 'Purchase Date' },
        { key: 'mileage', label: 'Mileage' },
        { key: 'transport_type', label: 'Transport Type' },
        { key: 'total_routes', label: 'Total Routes' },
      ],
      transportToDelete: null,
      selectedTransportId: null,
      showDeleteModal: false,
      localTransports: [],
    };
  },
  watch: {
    transports(newTransports) {
      this.localTransports = [...newTransports];
    },
  },
  computed: {
    formattedTransports() {
      return this.localTransports.map(transport => {
        let purchase_date = new Date(transport.purchase_date);
        let formatted_date = `${purchase_date.getFullYear()}/${('0' + (purchase_date.getMonth() + 1)).slice(-2)}/${('0' + purchase_date.getDate()).slice(-2)}`;
        return {
          ...transport,
          purchase_date: formatted_date
        };
      });
    },
  },
  methods: {
    editTransportTableHandler(transport) {
      this.$emit('openEditTransportDashboardHandler', transport);
    },
    prepareForDeletion(item) {
      this.transportToDelete = item;
      this.showDeleteModal = true;
    },
    deleteTransport(transport) {
      this.localTransports = this.localTransports.filter(t => t.id !== transport.id);
      this.showDeleteModal = false;
    },
    cancelDeletion() {
      this.showDeleteModal = false;
    },
    viewDetails(transportId) {
      this.selectedTransportId = transportId;
    },
  },
  created() {
    this.localTransports = [...this.transports];
  },
};
</script>
