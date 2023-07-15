<template>
  <b-modal v-model="showEditCreateTransportModal">
    <template #modal-title>
      {{ transport.id ? 'Edit Transport' : 'Create New Transport' }}
    </template>
    <b-form @submit.stop.prevent="updateTransport">
      <b-form-group label="Plate Number*" :state="!transport.plate_number ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Plate Number')">
        <b-form-input v-model="transport.plate_number" required />
      </b-form-group>
      <b-form-group label="Status*" :state="!transport.status ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Status')">
        <b-form-select v-model="transport.status" :options="['free', 'busy']" required :disabled="!transport.id">
          <template #first>
            <b-form-select-option :value="null" disabled>-- Please select --</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Model*" :state="!transport.model ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Model')">
        <b-form-input v-model="transport.model" required />
      </b-form-group>
      <b-form-group label="Purchase Date*" :state="!transport.purchase_date ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Purchase Date')">
        <b-form-datepicker v-model="transport.purchase_date" required></b-form-datepicker>
      </b-form-group>
      <b-form-group label="Mileage in km*" :state="!transport.mileage ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Mileage')">
        <b-form-input v-model="transport.mileage" type="number" required />
      </b-form-group>
      <b-form-group label="Transport Type*" :state="!transport.transport_type ? false : null"
        :invalid-feedback="requiredFieldErrorMessage('Transport Type')">
        <b-form-select v-model="transport.transport_type" :options="['cargo', 'passenger']" required
          :disabled="transport.total_routes > 0"></b-form-select>
      </b-form-group>

      <!-- Show error message if it exists -->
      <div v-if="serverError" class="alert alert-danger">
        {{ serverError }}
      </div>
    </b-form>
    <template #modal-footer>
      <b-button @click="cancel" variant="secondary">Cancel</b-button>
      <b-button @click="updateTransport" variant="primary" :disabled="isLoading || !formIsValid">Save
        changes</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    transport: {
      type: Object,
      required: true,
    },
    showEditCreateTransportModal: {
      type: Boolean,
      required: true,
    },
    creating: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      serverError: null,
      isLoading: false,
      transport: {
        status: 'free', // Setting a default value for transport status
        plate_number: '',
        model: '',
        purchase_date: '',
        mileage: '',
        transport_type: '',
      }
    };
  },
  watch: {
    transport: {
      immediate: true,
      handler(newVal, oldVal) {
        if (!newVal.id) {
          this.transport.status = 'free';
        }
      }
    }
  },
  computed: {
    localTransport: function () {
      return { ...this.transport };
    },
    formIsValid() {
      return (
        !!this.localTransport.plate_number &&
        !!this.localTransport.status &&
        !!this.localTransport.model &&
        !!this.localTransport.purchase_date &&
        !!this.localTransport.mileage &&
        !!this.localTransport.transport_type
      );
    },
  },
  methods: {
    cancel() {
      this.$emit('hide');
    },
    async updateTransport() {
      this.isLoading = true;
      try {
        if (this.localTransport.purchase_date) {
          let purchaseDate = new Date(this.localTransport.purchase_date);
          this.localTransport.purchase_date = purchaseDate.toString();
        }

        const url = this.creating ? '/api/v1/transports' : `/api/v1/transports/${this.localTransport.id}`;
        const method = this.creating ? 'post' : 'put';
        const response = await this.$axios[method](url, this.localTransport, {
          headers: {
            'x-api-key': this.$config.apiKey,
          },
        });

        this.$emit('hide');
        this.$emit('updateTransport', { ...response.data, ...this.localTransport });
        this.serverError = null;
      } catch (error) {
        console.error('Error updating transport:', error);
        this.serverError = error.message || 'Unexpected error occurred';
        this.localTransport = { ...this.transport };
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
