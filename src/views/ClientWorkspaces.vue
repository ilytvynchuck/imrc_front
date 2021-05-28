<template>
    <div>
        <base-section>
            <div class="d-flex justify-content-center mb-3" v-if="isBusy">
                <b-spinner label="Loading..."></b-spinner>
            </div>
            <b-card-group deck v-if="!isBusy">
                <b-card :header="client.name" v-for="(client, index) in clients" :key="index">
                </b-card>
            </b-card-group>

            <b-card-group deck>
                <b-card header="Card with list group">
                    <b-list-group>
                        <b-list-group-item href="#">Cras justo odio</b-list-group-item>
                        <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
                        <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-card-group>
        </base-section>
    </div>
</template>

<script>
import BaseSection        from "@/components/base/Section";
import {getClientRequest} from "@/api/clients";

export default {
    name:       'ClientWorkspaces',
    components: {BaseSection},
    data() {
        return {
            isBusy: false,
            client: {},
        }
    },
    props:   {
        id: String
    },
    methods: {
        async _loadData() {
            this.isBusy = true;

            let response = await getClientRequest(this.id);
            this.client  = response['data']['data'];

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
