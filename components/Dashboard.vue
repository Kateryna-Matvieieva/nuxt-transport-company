
<template>
  <div>
    <generic-routes-table title="Completed Routes Dashboard" :routes="completedRoutes"
      :serverError="completedRoutesServerError" :isLoading="isCompletedRoutesLoading"
      @editRouteDashboardHandler="handleEditCompletedRoute" />
    <br />
    <generic-routes-table title="Ongoing Routes Dashboard" :routes="ongoingRoutes" :serverError="ongoingRoutesServerError"
      :isLoading="isOngoingRoutesLoading" @editRouteDashboardHandler="handleEditOngoingRoute" />
    <br />
    <generic-routes-table title="Pending Routes Dashboard" :routes="pendingRoutes"
      :serverError="pendingRoutesServerError" :isLoading="isPendingRoutesLoading"
      @editRouteDashboardHandler="handleEditPendingRoute" />
    <br />
    <edit-completed-route-modal :route="route" :showModal="showEditCompletedRouteModal"
      @updateRoute="updateCompletedRoutes" @hide="closeEditCompletedRouteModal" />
    <edit-other-route-modal :route="route" :showModal="showEditOtherRouteModal" @updateRoute="updateOngoingRoutes"
      @hide="closeEditOngoingRouteModal" />
    <edit-other-route-modal :route="route" :showModal="showEditOtherRouteModal" @updateRoute="updatePendingRoutes"
      @hide="closeEditPendingRouteModal" />

    <TransportTable />
  </div>
</template>


<script>
import TransportTable from '~/components/TransportTable.vue';
import GenericRoutesTable from '~/components/GenericRoutesTable.vue';
import EditCompletedRouteModal from '~/components/Modals/EditCompletedRouteModal.vue';
import EditOtherRouteModal from '~/components/Modals/EditOtherRouteModal.vue';

export default {
  components: {
    TransportTable,
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
      showEditOtherRouteModal: false,
    };
  },
  async mounted() {
    try {
      const completedRoutesResponse = await this.$axios.$get('/api/v1/routes/status/completed', {
        headers: {
          'x-api-key': process.env.API_KEY,
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
      const ongoingRoutesResponse = await this.$axios.$get('/api/v1/routes/status/ongoing', {
        headers: {
          'x-api-key': process.env.API_KEY,
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
      const pendingRoutesResponse = await this.$axios.$get('/api/v1/routes/status/pending', {
        headers: {
          'x-api-key': process.env.API_KEY,
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
    handleEditCompletedRoute(route) {
      this.route = route;
      this.showEditCompletedRouteModal = true;
    },
    handleEditOngoingRoute(route) {
      this.route = route;
      this.showEditOtherRouteModal = true;
    },
    handleEditPendingRoute(route) {
      this.route = route;
      this.showEditOtherRouteModal = true;
    },
    closeEditCompletedRouteModal() {
      this.showEditCompletedRouteModal = false;
    },
    closeEditOngoingRouteModal() {
      this.showEditOtherRouteModal = false;
    },
    closeEditPendingRouteModal() {
      this.showEditOtherRouteModal = false;
    },
    updateCompletedRoutes(route) {
      const index = this.completedRoutes.findIndex(r => r.id === route.id);


      if (index !== -1) {
        this.completedRoutes.splice(index, 1, route);
      }
    },
    updateOngoingRoutes(route) {
      const index = this.ongoingRoutes.findIndex(r => r.id === route.id);


      if (index !== -1) {
        this.ongoingRoutes.splice(index, 1, route);
      }
    },
    updatePendingRoutes(route) {
      const index = this.pendingRoutes.findIndex(r => r.id === route.id);


      if (index !== -1) {
        this.pendingRoutes.splice(index, 1, route);
      }
    },
  },
};

</script>

