<template>
    <a class="btn btn-sm btn-warning m-1"
       :href="mainRoute+'/'+id+'/edit'">
        <b-icon icon="pencil"></b-icon>
    </a>
</template>
<script>
export default {
    name:  "EditButton",
    props: {
        mainRoute: String,
        id:        Number,
    }
}
</script>

<style scoped>
.btn-warning {
    color: white;
}
</style>
