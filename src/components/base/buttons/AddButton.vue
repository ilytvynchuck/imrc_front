<template>
    <a class="btn btn-sm btn-success m-1"
       :href="mainRoute">
        <b-icon icon="plus"></b-icon>
    </a>
</template>
<script>
export default {
    name:  "AddButton",
    props: {
        mainRoute: String,
    }
}
</script>

<style scoped>
.btn-warning {
    color: white;
}
</style>
