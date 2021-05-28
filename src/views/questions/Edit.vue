<template>
    <div>
        <base-section>
            <b-card-text>Edit Form</b-card-text>

            <div class="d-flex justify-content-center mb-3" v-if="isBusy">
                <b-spinner label="Loading..."></b-spinner>
            </div>

            <div class="card-body" v-if="!isBusy">
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
                        id="input-group-field_name"
                        label="Field name"
                        label-for="input-field_name"
                    >
                        <b-form-input
                            id="input-field_name"
                            v-model="form.field_name"
                            required
                            placeholder="Field name"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validation['field_name']['state']">
                            {{ validation['field_name']['message'] }}
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group
                        id="input-group-is_require"
                        label-for="input-is_require"
                    >
                        <b-form-checkbox
                            id="input-is_require"
                            v-model="form.is_require"
                            name="checkbox-1"
                            value="1"
                            unchecked-value="0"
                        >
                            Is require?
                        </b-form-checkbox>
                        <b-form-invalid-feedback :state="validation['is_require']['state']">
                            {{ validation['is_require']['message'] }}
                        </b-form-invalid-feedback>
                    </b-form-group>


                    <b-form-group
                        id="input-group-client_id"
                        label="Forms"
                        label-for="input-client_id"
                    >
                        <b-form-select
                            id="input-client_id"
                            v-model="form.form_id"
                            :options="forms"
                            class="mb-3"
                            value-field="id"
                            text-field="name"
                            disabled-field="notEnabled"
                        ></b-form-select>
                        <b-form-invalid-feedback :state="validation['form_id']['state']">
                            {{ validation['form_id']['message'] }}
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
import BaseSection                         from "@/components/base/Section";
import {getFormsRequest}                   from "@/api/forms";
import {getQuestionRequest, storeQuestion} from "@/api/questions";

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
            forms:      [],
            validation: {
                'label':      {'state': true, 'message': ''},
                'field_name': {'state': true, 'message': ''},
                'form_id':    {'state': true, 'message': ''},
                'is_require': {'state': true, 'message': ''},
            },
        }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault();

            const self  = this;
            self.isBusy = true;

            try {
                await storeQuestion(this.id, self.form);
                this.$router.push({name: "QuestionIndex"});
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
            let response = await getQuestionRequest(this.id);
            let itemData = response['data'];

            for (const [key, fieldData] of Object.entries(itemData)) {
                this.form[key] = fieldData;
            }
        },
        async _loadFormData() {
            let response = await getFormsRequest();
            let itemData = response['data']['data'];

            for (const fieldData of itemData) {
                this.forms.push({
                    'id':   fieldData.id,
                    'name': fieldData.label
                });
            }
        },
    },
    async mounted() {
        this.isBusy = true;
        await this._loadFormData();
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
