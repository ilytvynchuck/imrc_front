<template>
    <div>
        <base-section>
            <div class="d-flex justify-content-center mb-3" v-if="isBusy">
                <b-spinner label="Loading..."></b-spinner>
            </div>

            <b-card-group deck v-if="!isBusy">
                <b-card header="Forms">
                    <template #header>
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="mb-0">Forms</h6>
                            <add-button mainRoute="/admin/forms/create"></add-button>
                        </div>

                    </template>

                    <b-list-group>
                        <b-list-group-item v-for="(form, index) in forms" :key="index"
                                           class="d-flex justify-content-between align-items-center">
                            <router-link :to="`/admin/forms/${form.id}`">{{
                                    form.label
                                }}
                            </router-link>

                            <div class="d-flex justify-content-between align-items-center">
                                <a :href="`/form/${form.slug}`" class="mr-3" target="_blank"><b-icon icon="box-arrow-up-right" font-scale="1"></b-icon></a>
                                <edit-button mainRoute="/admin/forms"
                                             :id="form.id"></edit-button>
                                <delete-button mainRoute="forms"
                                               :id="form.id"></delete-button>
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
import {getFormsRequest}                     from "@/api/forms";

export default {
    name:       'FormIndex',
    components: {
        BaseSection,
        'edit-button':   EditButton,
        'delete-button': DeleteButton,
        'add-button':    AddButton,
    },
    data() {
        return {
            isBusy: false,
            forms:  [],
        }
    },
    methods: {
        async _loadData() {
            this.isBusy = true;

            let response = await getFormsRequest();
            this.forms   = response['data']['data'];

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
