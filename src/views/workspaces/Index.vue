<template>
    <div>
        <base-section>
            <div class="d-flex justify-content-center mb-3" v-if="isBusy">
                <b-spinner label="Loading..."></b-spinner>
            </div>

            <b-card-group deck v-if="!isBusy">
                <b-card header="Clients">
                    <template #header>
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="mb-0">Workspaces</h6>
                            <add-button mainRoute="/admin/workspaces/create"></add-button>
                        </div>

                    </template>

                    <b-list-group>
                        <b-list-group-item v-for="(workspace, index) in workspaces" :key="index"
                                           class="d-flex justify-content-between align-items-center">
                            <router-link :to="`/admin/workspaces/${workspace.id}`">{{
                                    workspace.name
                                }}
                            </router-link>

                            <div class="d-flex justify-content-between align-items-center">
                                <edit-button mainRoute="/admin/workspaces"
                                             :id="workspace.id"></edit-button>
                                <delete-button mainRoute="workspaces"
                                               :id="workspace.id"></delete-button>
                            </div>
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-card-group>
        </base-section>
    </div>
</template>

<script>
import BaseSection                           from "@/components/base/Section";
import {EditButton, DeleteButton, AddButton} from "@/components/base/buttons";
import {getWorkspacesRequest}                from "@/api/workspaces";

export default {
    name:       'Admin',
    components: {
        BaseSection,
        'edit-button':   EditButton,
        'delete-button': DeleteButton,
        'add-button':    AddButton,
    },
    data() {
        return {
            isBusy:     false,
            workspaces: [],
        }
    },
    methods: {
        async _loadData() {
            this.isBusy = true;

            let response    = await getWorkspacesRequest();
            this.workspaces = response['data']['data'];

            this.isBusy = false;
        }
    },
    async mounted() {
        await this._loadData();
    },
}
</script>

<style scoped>

</style>
