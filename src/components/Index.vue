<template>
  <div>
    <Search />
  </div>
</template>

<script>
  import Home from "@/pages/home";
  import Search from "../pages/search";
    export default {
        name: "Index",
        components: {Search},
        comments: {
            Home
        }
    }
</script>

<style scoped>

</style>
