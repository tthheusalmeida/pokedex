<template>
  <div class="table">
    <h2
      class="d-flex justify-center"
    >
      {{ title }}
    </h2>

    <div>
      <v-data-table
        dense
        fixed-header
        hide-default-header
        hide-default-footer
        :headers="headers"
        :items="desserts"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        class="elevation-1"
        @page-count="pageCount = $event"
      >
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="totalVisible"
        color="blue lighten-1"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  data() {
    return {
      page: 1,
      pageCount: 0,
    };
  },
  props: {
    title: {
      type: String,
      require: true,
    },
    headers: {
      type: Array,
      default: () => ([]),
    },
    desserts: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    itemsPerPage() {
      return this.isMobile ? 3 : 4;
    },
    totalVisible() {
      return this.isMobile ? 3 : 7;
    },
  },
};
</script>

<style lang="scss">
  .table {
    color: var(--card-white);
  }

</style>
