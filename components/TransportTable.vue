<template>
  <b-table striped hover :items="transports"></b-table>
</template>

<script>
export default {
  data() {
    return {
      transports: [],
    };
  },
  async mounted() {
    const transportApiUrl = '/api/v1/transports';

    try {
      const response = await this.$axios.$get(transportApiUrl, {
        headers: {
          'x-api-key': process.env.API_KEY,
        },
      });

      this.transports = response.data;
    } catch (error) {
      console.error('Error retrieving transports:', error);
    }
  },
};
</script>
