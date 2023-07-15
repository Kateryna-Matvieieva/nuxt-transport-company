<template>
  <div>
    <br />
    <b-button variant="danger" @click="openCreateRouteModal">Create Pending Route</b-button>
    <br />
    <br />
    <generic-routes-table title="Completed Routes Dashboard" :routes="completedRoutes"
      :serverError="completedRoutesServerError" :isLoading="isCompletedRoutesLoading"
      @openEditRouteDashboardHandler="openEditCompletedRoute" />
    <br />
    <generic-routes-table title="Ongoing Routes Dashboard" :routes="ongoingRoutes" :serverError="ongoingRoutesServerError"
      :isLoading="isOngoingRoutesLoading" @openEditRouteDashboardHandler="openEditOtherRoute"
      @updateRoute="updateAndMoveRouteToCorrectTable" />
    <br />
    <generic-routes-table title="Pending Routes Dashboard" :routes="pendingRoutes" :serverError="pendingRoutesServerError"
      :isLoading="isPendingRoutesLoading" @openEditRouteDashboardHandler="openEditOtherRoute" />
    <br />
    <edit-completed-route-modal :route="route" :showEditCompletedRouteModal="showEditCompletedRouteModal"
      @updateRoute="updateAndMoveRouteToCorrectTable" @hide="closeEditCompletedRouteModal" />
    <edit-other-route-modal :route="route" :showEditCreateRouteModal="showEditCreateRouteModal" :creating="creating"
      @updateRoute="updateAndMoveRouteToCorrectTable" @hide="closeEditCreateRouteModal" />
  </div>
</template>

<script>
import GenericRoutesTable from '~/components/GenericRoutesTable.vue';
import EditCompletedRouteModal from '~/components/Modals/EditCompletedRouteModal.vue';
import EditOtherRouteModal from '~/components/Modals/EditOtherRouteModal.vue';

export default {
  components: {
    GenericRoutesTable,
    EditCompletedRouteModal,
    EditOtherRouteModal,
  },
  data() {
    return {
      completedRoutes: [],
      ongoingRoutes: [],
      pendingRoutes: [],
      route: {},
      completedRoutesServerError: null,
      ongoingRoutesServerError: null,
      pendingRoutesServerError: null,
      isCompletedRoutesLoading: true,
      isOngoingRoutesLoading: true,
      isPendingRoutesLoading: true,
      showEditCompletedRouteModal: false,
      showEditCreateRouteModal: false,
      creating: false,
    };
  },
  async mounted() {
    try {
      const completedRoutesResponse = await this.$axios.$get(`${this.$config.apiUrl}/api/v1/routes/status/completed`, {
        headers: {
          'x-api-key': this.$config.apiKey,
        },
      });

      this.completedRoutes = completedRoutesResponse.data;
    } catch (error) {
      console.error('Error retrieving completed routes:', error);
      this.completedRoutesServerError = error.message;
    } finally {
      this.isCompletedRoutesLoading = false;
    }

    try {
      const ongoingRoutesResponse = await this.$axios.$get(`${this.$config.apiUrl}/api/v1/routes/status/ongoing`, {
        headers: {
          'x-api-key': this.$config.apiKey,
        },
      });

      this.ongoingRoutes = ongoingRoutesResponse.data;
    } catch (error) {
      console.error('Error retrieving ongoing routes:', error);
      this.ongoingRoutesServerError = error.message;
    } finally {
      this.isOngoingRoutesLoading = false;
    }

    try {
      const pendingRoutesResponse = await this.$axios.$get(`${this.$config.apiUrl}/api/v1/routes/status/pending`, {
        headers: {
          'x-api-key': this.$config.apiKey,
        },
      });

      this.pendingRoutes = pendingRoutesResponse.data;
    } catch (error) {
      console.error('Error retrieving pending routes:', error);
      this.pendingRoutesServerError = error.message;
    } finally {
      this.isPendingRoutesLoading = false;
    }
  },
  methods: {
    openEditCompletedRoute(route) {
      this.route = route;
      this.showEditCompletedRouteModal = true;
      this.showEditCreateRouteModal = false;
    },
    openEditOtherRoute(route) {
      this.route = route;
      this.showEditCreateRouteModal = true;
      this.showEditCompletedRouteModal = false;
    },
    closeEditCompletedRouteModal() {
      this.showEditCompletedRouteModal = false;
      this.showEditCreateRouteModal = false;
    },
    openCreateRouteModal() {
      this.route = this.getEmptyRoute();
      this.showEditCreateRouteModal = true;
      this.creating = true;
    },
    closeEditCreateRouteModal() {
      this.showEditCreateRouteModal = false;
      this.creating = false;
    },
    getEmptyRoute() {
      return {
        start_city: '',
        end_city: '',
        departure_date: '',
        completion_date: '',
        expected_revenue: '',
        distance: '',
        transport_type: '',
        status: 'pending',
      };
    },
    updateAndMoveRouteToCorrectTable(route) {
      this.completedRoutes = this.completedRoutes.filter(r => r.id !== route.id);
      this.ongoingRoutes = this.ongoingRoutes.filter(r => r.id !== route.id);
      this.pendingRoutes = this.pendingRoutes.filter(r => r.id !== route.id);

      switch (route.status) {
        case 'completed':
          this.completedRoutes.unshift(route);
          break;
        case 'ongoing':
          this.ongoingRoutes.unshift(route);
          break;
        case 'pending':
          this.pendingRoutes.unshift(route);
          break;
        default:
          console.error('Unknown route status:', route.status);
      }
    },
  },
};

</script>

