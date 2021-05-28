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
                            <h6 class="mb-0">Clients</h6>
                            <add-button mainRoute="/admin/clients/create"></add-button>
                        </div>

                    </template>

                    <b-list-group>
                        <b-list-group-item v-for="(client, index) in clients" :key="index"
                                           class="d-flex justify-content-between align-items-center">
                            <router-link :to="`/admin/clients/${client.id}`">{{ client.name }}
                            </router-link>

                            <div class="d-flex justify-content-between align-items-center">
                                <edit-button mainRoute="/admin/clients"
                                             :id="client.id"></edit-button>
                                <delete-button mainRoute="clients"
                                               :id="client.id"></delete-button>
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
import {getClientsRequest}                   from "@/api/clients";

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
            isBusy:  false,
            clients: [],
        }
    },
    methods: {
        async _loadData() {
            this.isBusy = true;

            let response = await getClientsRequest();
            this.clients = response['data']['data'];

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
