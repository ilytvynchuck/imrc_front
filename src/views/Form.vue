<template>
    <div>
        <base-section>
            <div class="d-flex justify-content-center mb-3" v-if="isBusy">
                <b-spinner label="Loading..."></b-spinner>
            </div>
            <b-card-text>{{ formData.label }}</b-card-text>

            <div class="card-body" v-show="!isBusy">
                <b-form @submit="onSubmit" @reset="onReset"
                >
                    <b-form-group
                        :id="`input-group-${field.name}`"
                        :label="field.label"
                        label-for="input-name" v-for="(field, index) in form"
                        :key="index"
                    >
                        <b-form-input
                            :id="`input-${field.name}`"
                            v-model="field.value"
                            :name="field.name"
                            :required="field.is_require"
                            :placeholder="field.label"
                            autocomplete="off"
                        ></b-form-input>
                        <!--                        <b-form-invalid-feedback :state="validation[field.field_name]['state']">-->
                        <!--                            {{ validation[field.field_name]['message'] }}-->
                        <!--                        </b-form-invalid-feedback>-->
                    </b-form-group>

                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-form>
            </div>
        </base-section>
    </div>
</template>

<script>
import BaseSection                        from "@/components/base/Section";
import {getFormRequestBySlug, submitForm} from "@/api/forms";

export default {
    name:       'Form',
    components: {
        BaseSection
    },
    props:      {
        slug: String,
    },
    data() {
        return {
            isBusy:     false,
            formData:   {},
            form:       [],
            validation: {},
        }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault();

            const self  = this;
            self.isBusy = true;
            try {
                await submitForm(self.form);

                this.$router.go();
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
        onReset() {
        },
        async _loadData() {
            this.isBusy = true;

            let response  = await getFormRequestBySlug(this.slug);
            this.formData = response['data'];

            for (const fieldData of this.formData.questions) {
                this.form.push({
                    'name':              fieldData.field_name,
                    'value':             '',
                    'label':             fieldData.label,
                    'is_require':        fieldData.is_require == true,
                    'form_questions_id': fieldData.form_questions_id,
                    'form_id':           fieldData.id,
                });
                this.validation[fieldData.field_name] = {
                    'state':   true,
                    'message': '',
                };
            }

            this.isBusy = false;
        }
    },
    async mounted() {
        await this._loadData();
    },
    // watch: {
    //     form: {
    //         deep: true,
    //         handler() {
    //             for (const [key, fieldData] of Object.entries(this.validation)) {
    //                 if (fieldData['state'] == false) {
    //                     this.validation[key]['state'] = true;
    //                 }
    //             }
    //         }
    //     }
    // }
}
</script>

<style scoped>

</style>
