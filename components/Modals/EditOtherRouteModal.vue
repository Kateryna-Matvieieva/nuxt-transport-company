<template>
  <b-modal v-model="showEditCreateRouteModal">
    <template #modal-title>
      {{ route.id ? 'Edit Route' : 'Create New Route' }}
    </template>
    <b-form @submit.stop.prevent="updateRoute">
      <b-form-group label="Start city*" :state="!route.start_city ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Start city')">
        <b-form-input v-model="route.start_city" required />
      </b-form-group>
      <b-form-group label="End city*" :state="!route.end_city ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('End city')">
        <b-form-input v-model="route.end_city" required />
      </b-form-group>
      <b-form-group label="Departure date*" :state="!route.departure_date ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Departure date')">
        <b-form-datepicker v-model="route.departure_date" required></b-form-datepicker>
      </b-form-group>
      <b-form-group label="Completion date*" :state="!route.completion_date ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Completion date')">
        <b-form-datepicker v-model="route.completion_date" required></b-form-datepicker>
      </b-form-group>
      <b-form-group label="Expected revenue in $*" :state="!route.expected_revenue ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Expected revenue')">
        <b-form-input v-model="route.expected_revenue" type="number" required />
      </b-form-group>
      <b-form-group label="Distance in km*" :state="!route.distance ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Distance')">
        <b-form-input v-model="route.distance" type="number" required />
      </b-form-group>
      <b-form-group label="Transport type*" :state="!route.transport_type ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Transport type')">
        <b-form-select v-model="route.transport_type" :options="['cargo', 'passenger']" required
          :disabled="route.status === 'ongoing'"></b-form-select>
        <span v-if="route.status === 'ongoing'">(Cannot be changed for ongoing route)</span>
      </b-form-group>
      <b-form-group label="Status*" :state="!route.status ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Status')">
        <b-form-select v-model="route.status" :options="['ongoing', 'pending']" required
          :disabled="!route.plate_number"></b-form-select>
        <span v-if="!route.plate_number">(No assigned transport or transport type was
          changed or new route)</span>
      </b-form-group>

      <!-- Show error message if it exists -->
      <div v-if="serverError" class="alert alert-danger">
        {{ serverError }}
      </div>
    </b-form>
    <template #modal-footer>
      <b-button @click="cancel" variant="secondary">Cancel</b-button>
      <b-button @click="updateRoute" variant="primary" :disabled="isLoading || !formIsValid">Save
        changes</b-button>
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
    showEditCreateRouteModal: {
      type: Boolean,
      required: true,
    },
    creating: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      serverError: null,
      isLoading: false,
    };
  },
  computed: {
    localRoute: function () {
      return { ...this.route };
    },
    formIsValid() {
      return (
        !!this.localRoute.start_city &&
        !!this.localRoute.end_city &&
        !!this.localRoute.departure_date &&
        !!this.localRoute.completion_date &&
        !!this.localRoute.expected_revenue &&
        !!this.localRoute.distance &&
        !!this.localRoute.transport_type &&
        !!this.localRoute.status
      );
    },
  },
  methods: {
    cancel() {
      this.$emit('hide');
    },
    async updateRoute() {
      this.isLoading = true;
      try {
        if (this.localRoute.departure_date) {
          let depDate = new Date(this.localRoute.departure_date);
          this.localRoute.departure_date = depDate.toString();
        }

        if (this.localRoute.completion_date) {
          let compDate = new Date(this.localRoute.completion_date);
          this.localRoute.completion_date = compDate.toString();
        }

        const url = this.creating ? '/api/v1/routes' : `/api/v1/routes/${this.localRoute.id}`;
        const method = this.creating ? 'post' : 'put';
        const response = await this.$axios[method](url, this.localRoute, {
          headers: {
            'x-api-key': this.$config.apiKey,
          },
        });

        this.$emit('hide');
        this.$emit('updateRoute', { ...response.data, ...this.localRoute });
        this.serverError = null;
      } catch (error) {
        console.error('Error updating route:', error);
        this.serverError = error.message || 'Unexpected error occurred';
        this.localRoute = { ...this.route };
      } finally {
        this.isLoading = false;
      }
    },
    requiredFieldErrorMessage(fieldName) {
      return `${fieldName} is required`;
    },
  },
};

</script>
