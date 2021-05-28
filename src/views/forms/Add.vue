<template>
    <div>
        <base-section>
            <b-card-text>Add New Form</b-card-text>

            <div class="card-body">
                <b-form @submit="onSubmit">
                    <b-form-group
                        id="input-group-label"
                        label="Label"
                        label-for="input-label"
                    >
                        <b-form-input
                            id="input-label"
                            v-model="form.label"
                            required
                            placeholder="Label"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validation['label']['state']">
                            {{ validation['label']['message'] }}
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
                        label="Workspaces"
                        label-for="input-client_id"
                    >
                        <b-form-select
                            id="input-client_id"
                            v-model="form.workspace_id"
                            :options="workspaces"
                            class="mb-3"
                            value-field="id"
                            text-field="name"
                            disabled-field="notEnabled"
                        ></b-form-select>
                        <b-form-invalid-feedback :state="validation['workspace_id']['state']">
                            {{ validation['workspace_id']['message'] }}
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
import BaseSection            from "@/components/base/Section";
import {getWorkspacesRequest} from "@/api/workspaces";
import {storeForm}            from "@/api/forms";

export default {
    name:       'FormAdd',
    components: {
        BaseSection
    },
    data() {
        return {
            isBusy:     false,
            form:       [],
            workspaces: [],
            validation: {
                'label':        {'state': true, 'message': ''},
                'slug':         {'state': true, 'message': ''},
                'workspace_id': {'state': true, 'message': ''},
            },
        }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault();

            const self  = this;
            self.isBusy = true;

            try {
                await storeForm(undefined, self.form);
                this.$router.push({name: "FormIndex"});
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
        async _loadWorkspaceData() {
            let response = await getWorkspacesRequest();
            let itemData = response['data']['data'];

            for (const fieldData of itemData) {
                this.workspaces.push({
                    'id':   fieldData.id,
                    'name': fieldData.name
                });
            }
        },
    },
    async mounted() {
        await this._loadWorkspaceData();
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
