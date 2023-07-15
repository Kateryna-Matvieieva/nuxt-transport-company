<template>
  <div>
    <h3>{{ title }}</h3>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="!isLoading && !serverError && routes.length === 0">No data</div>
    <div v-else-if="!isLoading && serverError" class="alert alert-danger">
      {{ serverError }}
    </div>
    <div v-else>
      <b-table striped hover :items="formattedRoutes" :fields="tableFields">
        <template v-slot:cell(actions)="data">
          <b-dropdown>
            <ViewDetailsDropdownItem @viewDetails="viewDetails(data.item)" />
            <EditRouteDropdownItem :item="data.item" @editRouteTableHandler="editRouteTableHandler" />
            <DeleteRouteDropdownItem @deleteRoute="prepareForDeletion(data.item)" />
          </b-dropdown>
        </template>
      </b-table>
    </div>
    <DeleteRouteConfirmModal :showModal="!!routeToDelete" :message="formattedRouteToDelete" @confirm="deleteRoute"
      @cancel="cancelDeletion" />
    <RouteDetailsModal id="route-details-modal" :data="selectedRouteDetails" @reset="selectedRouteDetails = {}" />
  </div>
</template>

<script>
// MoreMenuOptions
import ViewDetailsDropdownItem from './MoreMenuOptions/ViewDetailsDropdownItem.vue';
import DeleteRouteDropdownItem from './MoreMenuOptions/DeleteRouteDropdownItem.vue';
import EditRouteDropdownItem from './MoreMenuOptions/EditRouteDropdownItem.vue';
// Modals
import DeleteRouteConfirmModal from './Modals/DeleteRouteConfirmModal.vue';
import RouteDetailsModal from './Modals/RouteDetailsModal.vue';
export default {
  name: 'GenericRoutesTable',
  components: {
    // MoreMenuOptions
    ViewDetailsDropdownItem,
    DeleteRouteDropdownItem,
    EditRouteDropdownItem,
    // Modals
    DeleteRouteConfirmModal,
    RouteDetailsModal,
  },
  props: {
    title: { type: String, required: true },
    routes: { type: Array, required: true },
    serverError: { type: String, default: null },
    isLoading: { type: Boolean, default: false },
  },
  data() {
    return {
      isLoading: true,
      serverError: null,
      routes: [], // Data from the server
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
      selectedRouteDetails: {},
    };
  },
  async mounted() {
  },
  computed: {
    formattedRoutes() {
      return this.routes.map(route => {
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
    formattedRouteToDelete() {
      if (!this.routeToDelete) return '';
      return `${this.routeToDelete.status || 'Completed'} route ${this.routeToDelete.start_city}-${this.routeToDelete.end_city} ${this.routeToDelete.departure_date} - ${this.routeToDelete.completion_date}`;
    },
  },
  methods: {
    editRouteTableHandler(route) {
      this.$emit('editRouteDashboardHandler', route);
    },
    prepareForDeletion(item) {
      this.routeToDelete = item;
    },
    async deleteRoute() {
      try {
        await this.$axios.$delete(`/api/v1/routes/${this.routeToDelete.id}`, {
          headers: {
            'x-api-key': process.env.API_KEY,
          },
        });
        this.routes = this.routes.filter(route => route.id !== this.routeToDelete.id);
        this.routeToDelete = null;
      } catch (error) {
        console.error('Error deleting route:', error);
      }
    },
    cancelDeletion() {
      this.routeToDelete = null;
    },
    async viewDetails(route) {
      try {
        const response = await this.$axios.$get(`/api/v1/routes/${route.id}`, {
          headers: {
            'x-api-key': process.env.API_KEY,
          },
        });

        this.selectedRouteDetails = response.data;
        this.$bvModal.show('route-details-modal');
      } catch (error) {
        console.error('Error retrieving route details:', error);
      }
    },
  },
};
</script>
