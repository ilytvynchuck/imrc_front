<template>
    <div>
        <base-section>
            <div class="d-flex justify-content-center mb-3" v-if="isBusy">
                <b-spinner label="Loading..."></b-spinner>
            </div>
            <b-card-group deck v-if="!isBusy">
                <b-card :header="client.name" v-for="(client, index) in clients" :key="index">

                    <div v-if="client.workspaces.length > 0">
                        <b-tabs content-class="mt-3">
                            <b-tab :title="workspace.name"
                                   v-for="(workspace, index) in client.workspaces"
                                   :key="index">

                                <p v-if="workspace.forms.length > 0">
                                    <b-list-group>
                                        <b-list-group-item href="#"
                                                           v-for="(form, index) in workspace.forms"
                                                           :key="index">
                                            <router-link :to="`/form/${form.slug}`">{{
                                                    form.label
                                                }}
                                            </router-link>
                                        </b-list-group-item>
                                    </b-list-group>
                                </p>
                            </b-tab>
                        </b-tabs>
                    </div>
                </b-card>
            </b-card-group>
        </base-section>
    </div>
</template>

<script>
import BaseSection         from "@/components/base/Section";
import {getClientsRequest} from "@/api/clients";

export default {
    name:       'Home',
    components: {BaseSection},
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
