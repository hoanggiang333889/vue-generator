<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm"></Toolbar>
    <LoginForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { createHelpers } from "vuex-map-fields";
import create from "../../mixins/create";

const servicePrefix = "auths/login";

const { mapFields } = createHelpers({
  getterType: "auth/getField",
  mutationType: "auth/updateField",
});

export default {
  servicePrefix,
  mixins: [create],
  components: {
    Loading: () => import("../../components/Loading"),
    Toolbar: () => import("../../components/Toolbar"),
    LoginForm: () => import("../../components/auth/login/Form"),
  },
  data: () => ({
    item: {},
  }),
  computed: {
    ...mapFields(["error", "isLoading", "created", "violations"]),
  },
  methods: {
    ...mapActions("auth", ["create", "reset"]),
  },
};
</script>
