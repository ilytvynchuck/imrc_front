<template>
    <div>
        <base-section>
            <b-card-group deck>
                <b-card header="Menu">
                    <b-list-group>
                        <b-list-group-item>
                            <router-link to="/admin/clients">Clients
                            </router-link>
                        </b-list-group-item>
                        <b-list-group-item>
                            <router-link to="/admin/workspaces">Workspaces
                            </router-link>
                        </b-list-group-item>
                        <b-list-group-item>
                            <router-link to="/admin/forms">Forms
                            </router-link>
                        </b-list-group-item>
                        <b-list-group-item>
                            <router-link to="/admin/questions">Questions
                            </router-link>
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-card-group>
        </base-section>
    </div>
</template>

<script>
import BaseSection from "@/components/base/Section";

export default {
    name:       'Admin',
    components: {
        BaseSection,
    },
}
</script>

<style scoped>

</style>
