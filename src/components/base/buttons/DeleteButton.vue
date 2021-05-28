<template>
    <div class="d-inline">
        <button class="btn btn-sm btn-danger m-1"
                @click="onButtonClick">
            <b-icon icon="trash-fill"></b-icon>
        </button>
        <b-overlay :show="busy" no-wrap :fixed="true" :z-index="1135">
            <template v-slot:overlay>
                <spinner-component v-if="isLoading"></spinner-component>
                <div v-else
                     ref="dialog"
                     class="text-center p-3 border border-info">
                    <p>
                        <strong id="form-confirm-label">Are you sure?</strong>
                    </p>
                    <div class="d-flex">
                        <b-button variant="outline-danger" class="mr-3" @click="onCancel">
                            No
                        </b-button>
                        <b-button variant="outline-success" @click="onOK">Yes</b-button>
                    </div>
                </div>
            </template>
        </b-overlay>
    </div>
</template>
<script>

import SpinnerComponent from "../SpinnerComponent";
import api              from "@/api/request";

export default {
    name:       "DeleteButton",
    components: {
        'spinner-component': SpinnerComponent
    },
    data() {
        return {
            busy:      false,
            isLoading: false
        }
    },
    props:   {
        mainRoute: String,
        id:        Number,
    },
    methods: {
        onButtonClick() {
            this.busy = true;
        },
        async deleteCall() {
            return api
                .request(this.mainRoute + '/' + this.id)
                .delete();
        },
        onCancel() {
            this.busy = false
        },
        deleteItem: async function () {
            this.isLoading = true;
            await this.deleteCall();
            api
                .request("clients")
                .get();
            try {
                window.location.href = '/admin';
            } catch (e) {
                alert('An error occurred\r\nPlease refresh the page');
                this.isLoading = false;
            }
        },
        onOK() {
            this.deleteItem();
        }
    }
}
</script>

<style scoped>

</style>
