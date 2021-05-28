<template>
    <div>
        <base-section>
            <b-card-text>Edit Workspace</b-card-text>

            <div class="d-flex justify-content-center mb-3" v-if="isBusy">
                <b-spinner label="Loading..."></b-spinner>
            </div>

            <div class="card-body" v-if="!isBusy">
                <b-form @submit="onSubmit">
                    <b-form-group
                        id="input-group-name"
                        label="Name"
                        label-for="input-name"
                    >
                        <b-form-input
                            id="input-name"
                            v-model="form.name"
                            required
                            placeholder="Name"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validation['name']['state']">
                            {{ validation['name']['message'] }}
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group
                        id="input-group-slug"
                        label="Slug"
                        label-for="input-slug"
                    >
                        <b-form-input
                            id="input-name"
                            v-model="form.slug"
                            required
                            placeholder="Slug"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validation['slug']['state']">
                            {{ validation['slug']['message'] }}
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group
                        id="input-group-client_id"
                        label="Clients"
                        label-for="input-client_id"
                    >
                        <b-form-select
                            id="input-client_id"
                            v-model="form.client_id"
                            :options="clients"
                            class="mb-3"
                            value-field="id"
                            text-field="name"
                            disabled-field="notEnabled"
                        ></b-form-select>
                        <b-form-invalid-feedback :state="validation['client_id']['state']">
                            {{ validation['client_id']['message'] }}
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-button id="companies-submit-btn" type="submit" variant="primary">Submit
                    </b-button>
                </b-form>
            </div>
        </base-section>
    </div>
</template>

<script>
import BaseSection                           from "@/components/base/Section";
import {getClientsRequest}                   from "@/api/clients";
import {getWorkspaceRequest, storeWorkspace} from "@/api/workspaces";

export default {
    name:       'ClientEdit',
    components: {
        BaseSection
    },
    props:      {
        id: String
    },
    data() {
        return {
            isBusy:     false,
            form:       [],
            clients:    [],
            validation: {
                'name':      {'state': true, 'message': ''},
                'slug':      {'state': true, 'message': ''},
                'client_id': {'state': true, 'message': ''},
            },
        }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault();

            const self  = this;
            self.isBusy = true;

            try {
                await storeWorkspace(this.id, self.form);
                this.$router.push({name: "WorkspaceIndex"});
            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    let errors = error.response.data.errors;
                    for (const [key, fieldData] of Object.entries(errors)) {
                        this.validation[key] = {
                            'state':   false,
                            'message': fieldData[0]
                        };
                    }
                }
                self.isBusy = false;
            }
        },
        async _loadData() {
            let response = await getWorkspaceRequest(this.id);
            let itemData = response['data'];

            for (const [key, fieldData] of Object.entries(itemData)) {
                this.form[key] = fieldData;
            }
        },
        async _loadClientData() {
            let response = await getClientsRequest();
            let itemData = response['data']['data'];

            for (const fieldData of itemData) {
                this.clients.push({
                    'id':   fieldData.id,
                    'name': fieldData.name
                });
            }
        },
    },
    async mounted() {
        this.isBusy = true;
        await this._loadClientData();
        await this._loadData();
        this.isBusy = false;
    },
    watch: {
        form: {
            deep: true,
            handler() {
                for (const [key, fieldData] of Object.entries(this.validation)) {
                    if (fieldData['state'] == false) {
                        this.validation[key]['state'] = true;
                    }
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
