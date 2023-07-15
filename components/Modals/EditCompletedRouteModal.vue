<template>
  <b-modal v-model="showModal">
    <template #modal-title>
      Edit Completed Route
    </template>
    <b-form>
      <b-form-group label="Expected revenue in $">
        <b-form-input v-model="route.expected_revenue"  type="number" required />
      </b-form-group>
      <b-form-group label="Distance in km">
        <b-form-input v-model="route.distance" type="number" required />
      </b-form-group>
    </b-form>
    <!-- Show error message if it exists -->
    <div v-if="serverError" class="alert alert-danger">
      {{ serverError }}
    </div>
    <template #modal-footer="{ ok, cancel }">
      <b-button @click="cancel" variant="secondary">Cancel</b-button>
      <b-button @click="updateRoute" variant="primary" :disabled="isLoading">Save changes</b-button>
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
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      serverError: null,
      isLoading: false,
    };
  },
  methods: {
    cancel() {
      this.$emit('hide');
    },
    async updateRoute() {
      this.isLoading = true; // start loading
      try {
        const response = await this.$axios.$put(`/api/v1/routes/completed/${this.route.id}`, this.route, {
          headers: {
            'x-api-key': process.env.API_KEY,
          },
        });

        this.$emit('hide');
        this.$emit('updateRoute', this.route);
        this.serverError = null;
      } catch (error) {
        console.error('Error updating route:', error);
        this.serverError = error.message || 'Unexpected error occurred';
      } finally {
        this.isLoading = false; // end loading
      }
    },
  },
};
</script>
