<template>
  <b-modal v-model="showEditCompletedRouteModal">
    <template #modal-title>
      Edit Completed Route
    </template>
    <p><strong>Route Id:</strong> {{ route.id }}</p>
    <b-form @submit.stop.prevent="updateRoute">
      <b-form-group label="Expected revenue in $*" :state="!route.expected_revenue ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Expected revenue')">
        <b-form-input v-model="route.expected_revenue" type="number" required />
      </b-form-group>
      <b-form-group label="Distance in km*" :state="!route.distance ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Distance')">
        <b-form-input v-model="route.distance" type="number" required />
      </b-form-group>
      <!-- Show error message if it exists -->
      <div v-if="serverError" class="alert alert-danger">
        {{ serverError }}
      </div>
    </b-form>
    <template #modal-footer>
      <b-button @click="cancel" variant="secondary">Cancel</b-button>
      <b-button type="submit" variant="primary" :disabled="isLoading || !formIsValid">Save changes</b-button>
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
    showEditCompletedRouteModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      serverError: null,
      isLoading: false,
      requiredFieldErrorMessage: fieldName => `${fieldName} is required`,
    };
  },
  computed: {
    formIsValid() {
      return !!this.route.expected_revenue && !!this.route.distance;
    },
  },
  methods: {
    cancel() {
      this.$emit('hide');
    },
    async updateRoute() {
      this.isLoading = true;
      try {
        const response = await this.$axios.$put(`/api/v1/routes/completed/${this.route.id}`, this.route, {
          headers: {
            'x-api-key': this.$config.apiKey,
          },
        });

        this.$emit('hide');
        this.$emit('updateRoute', this.route);
        this.serverError = null;
      } catch (error) {
        console.error('Error updating route:', error);
        this.serverError = error.message || 'Unexpected error occurred';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
