<template>
    <div>
        <base-section>
            <div class="d-flex justify-content-center mb-3" v-if="isBusy">
                <b-spinner label="Loading..."></b-spinner>
            </div>

            <b-card-group deck v-if="!isBusy">
                <b-card header="Questions">
                    <template #header>
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="mb-0">Questions</h6>
                            <add-button mainRoute="/admin/questions/create"></add-button>
                        </div>

                    </template>

                    <b-list-group>
                        <b-list-group-item v-for="(question, index) in questions" :key="index"
                                           class="d-flex justify-content-between align-items-center">
                            <router-link :to="`/admin/questions/${question.id}`">{{
                                    question.label
                                }}
                            </router-link>

                            <div class="d-flex justify-content-between align-items-center">
                                <edit-button mainRoute="/admin/questions"
                                             :id="question.id"></edit-button>
                                <delete-button mainRoute="questions"
                                               :id="question.id"></delete-button>
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
import {getQuestionsRequest}                 from "@/api/questions";

export default {
    name:       'questionsIndex',
    components: {
        BaseSection,
        'edit-button':   EditButton,
        'delete-button': DeleteButton,
        'add-button':    AddButton,
    },
    data() {
        return {
            isBusy:    false,
            questions: [],
        }
    },
    methods: {
        async _loadData() {
            this.isBusy = true;

            let response   = await getQuestionsRequest();
            this.questions = response['data']['data'];

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
