<template>
    <div>
        <core-notification/>
        <core-header/>
        <core-view/>
        <core-footer/>
    </div>
</template>

<script>

export default {
    name:       'App',
    components: {
        CoreHeader:       () => import('./components/core/Header'),
        CoreFooter:       () => import('./components/core/Footer'),
        CoreView:         () => import('./components/core/View'),
        CoreNotification: () => import('./components/core/Notification'),
    },
}
</script>
