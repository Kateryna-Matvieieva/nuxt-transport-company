<template>
  <div>
    <h3>{{ title }}</h3>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="!isLoading && !serverError && localRoutes.length === 0">No data</div>
    <div v-else-if="!isLoading && serverError" class="alert alert-danger">
      {{ serverError }}
    </div>
    <div v-else>
      <b-table striped hover :items="formattedRoutes" :fields="tableFields">
        <template v-slot:cell(actions)="data">
          <b-dropdown>
            <ViewDetailsDropdownItem :item="data.item" @viewDetails="viewDetails" />
            <EditRouteDropdownItem :item="data.item" @editRouteTableHandler="editRouteTableHandler" />
            <DeleteRouteDropdownItem @deleteRoute="prepareForDeletion(data.item)" />
            <AssignTransportDropdownItem :item="data.item" @assignTransport="prepareForAssignment" />
            <CompleteRouteDropdownItem :item="data.item" v-if="data.item.status === 'ongoing'"
              @completeRoute="prepareForCompletion" />
          </b-dropdown>
        </template>
      </b-table>
    </div>
    <AssignTransportModal :showModal.sync="showAssignModal" :routeId="routeToAssign" @assignTransport="updateRoute"
      @cancel="cancelAssignment" />
    <DeleteRouteConfirmModal :showModal.sync="showDeleteModal" :routeToDelete="routeToDelete" @delete="deleteRoute"
      @cancel="cancelDeletion" />
    <CompleteRouteConfirmModal :showModal.sync="showCompleteModal" :routeToComplete="routeToComplete"
      @complete="updateRoute" @cancel="cancelCompletion" />
    <RouteDetailsModal :routeId="selectedRouteId" @reset="selectedRouteId = null" />
  </div>
</template>

<script>
import ViewDetailsDropdownItem from './MoreMenuOptions/ViewDetailsDropdownItem.vue';
import DeleteRouteDropdownItem from './MoreMenuOptions/DeleteRouteDropdownItem.vue';
import EditRouteDropdownItem from './MoreMenuOptions/EditRouteDropdownItem.vue';
import CompleteRouteDropdownItem from './MoreMenuOptions/CompleteRouteDropdownItem.vue';
import DeleteRouteConfirmModal from './Modals/DeleteRouteConfirmModal.vue';
import CompleteRouteConfirmModal from './Modals/CompleteRouteConfirmModal.vue';
import RouteDetailsModal from './Modals/RouteDetailsModal.vue';
import AssignTransportDropdownItem from './MoreMenuOptions/AssignTransportDropdownItem.vue';
import AssignTransportModal from './Modals/AssignTransportModal.vue';

export default {
  name: 'GenericRoutesTable',
  components: {
    ViewDetailsDropdownItem,
    DeleteRouteDropdownItem,
    EditRouteDropdownItem,
    CompleteRouteDropdownItem,
    DeleteRouteConfirmModal,
    CompleteRouteConfirmModal,
    RouteDetailsModal,
    AssignTransportDropdownItem,
    AssignTransportModal,
  },
  props: {
    title: { type: String, required: true },
    routes: { type: Array, required: true },
    serverError: { type: String, default: null },
    isLoading: { type: Boolean, default: false },
  },
  data() {
    return {
      tableFields: [
        { key: 'actions', label: 'Actions' },
        { key: 'id', label: 'Id' },
        { key: 'start_city', label: 'Start City' },
        { key: 'end_city', label: 'End City' },
        { key: 'distance', label: 'Distance' },
        { key: 'departure_date', label: 'Departure Date' },
        { key: 'completion_date', label: 'Completion Date' },
        { key: 'transport_type', label: 'Transport Type' },
        { key: 'expected_revenue', label: 'Expected Revenue' },
        { key: 'plate_number', label: 'Plate Number' },
      ],
      routeToDelete: null,
      routeToComplete: null,
      selectedRouteId: null,
      showDeleteModal: false,
      showCompleteModal: false,
      routeToAssign: null,
      showAssignModal: false,
      localRoutes: [],
    };
  },
  watch: {
    routes(newRoutes) {
      this.localRoutes = [...newRoutes];
    },
  },
  computed: {
    formattedRoutes() {
      return this.localRoutes.map(route => {
        const formattedDistance = `${route.distance} km`;
        const formattedRevenue = `$${route.expected_revenue}`;
        return {
          ...route,
          departure_date: new Date(route.departure_date).toLocaleDateString(),
          completion_date: new Date(route.completion_date).toLocaleDateString(),
          distance: formattedDistance,
          expected_revenue: formattedRevenue,
        };
      });
    },
  },
  methods: {
    editRouteTableHandler(route) {
      this.$emit('openEditRouteDashboardHandler', route);
    },
    prepareForDeletion(item) {
      this.routeToDelete = item;
      this.routeToComplete = null;
      this.showDeleteModal = true;
    },
    deleteRoute(route) {
      this.localRoutes = this.localRoutes.filter(r => r.id !== route.id);
      this.showDeleteModal = false;
    },
    cancelDeletion() {
      this.showDeleteModal = false;
    },
    viewDetails(routeId) {
      this.selectedRouteId = routeId;
    },
    prepareForCompletion(item) {
      this.routeToComplete = item;
      this.routeToDelete = null;
      this.showCompleteModal = true;
    },
    updateRoute(route) {
      this.localRoutes = this.localRoutes.map(r => (r.id === route.id ? route : r));
      this.showCompleteModal = false;
      this.$emit('updateRoute', route);
    },
    cancelCompletion() {
      this.showCompleteModal = false;
    },
    prepareForAssignment(routeId) {
      this.routeToAssign = routeId;
      this.showAssignModal = true;
    },
    cancelAssignment() {
      this.showAssignModal = false;
    },
  },
  created() {
    this.localRoutes = [...this.routes];
  },
};
</script>
