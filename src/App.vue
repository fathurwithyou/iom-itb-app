<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `IOM-ITB | ${content}` : `Home`
    }}</template>
  </metainfo>
  <router-view />
  <PendingPaymentBanner />
</template>

<script>
import PendingPaymentBanner from "@/components/PendingPaymentBanner.vue";

export default {
  name: "App",
  components: { PendingPaymentBanner },
};
</script>

<style>
@import "./css/style.css";
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");

html,
body {
  scroll-behavior: smooth;
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  background-color: #eef1f5;
}
</style>
