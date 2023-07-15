<template>
    <b-modal id="edit-other-route-modal">
      <template #modal-title>
        Edit Other Route
      </template>
      <b-form>
        <b-form-group label="Expected revenue">
          <b-form-input v-model="routeCopy.expected_revenue" type="number" required />
        </b-form-group>
  
        <b-form-group label="Distance">
          <b-form-input v-model="routeCopy.distance" type="number" required />
        </b-form-group>
      </b-form>
  
      <template #modal-footer="{ ok, cancel }">
        <b-button @click="cancel" variant="secondary">Cancel</b-button>
        <b-button @click="updateRoute" variant="primary">Save changes</b-button>
      </template>
    </b-modal>
  </template>
  
  <script>
  export default {
    props: {
        route: {
    type: Object,
    required: true,
  },
    },
    data() {
      return {
        routeCopy: {},
      };
    },
    created() {
  this.$root.$on('bv::show::modal', (modalId, modalOptions) => {
    if (modalId === 'edit-completed-route-modal' || modalId === 'edit-other-route-modal') {
      this.routeCopy = {...modalOptions.route};
    }
  });
},
    watch: {
      route: {
        handler(newValue) {
          this.routeCopy = { ...newValue }; // Copy the route prop to avoid mutating it directly
        },
        immediate: true,
      },
    },
    methods: {
      async updateRoute() {
        try {
          // Send a request to the server to update the route
          const response = await this.$axios.$put(`/api/v1/routes/${this.routeCopy.id}`, this.routeCopy, {
            headers: {
              'x-api-key': process.env.API_KEY,
            },
          });
  
          // Emit the 'routeEdited' event to inform the parent that the route has been edited
          this.$emit('routeEdited', this.routeCopy);
        } catch (error) {
          console.error('Error updating route:', error);
        }
      },
    },
  };
  </script>
  