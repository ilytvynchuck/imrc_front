import {axios} from './axios';
import {store} from '@/store';
import router  from '@/router';

/**
 * Initialize response interceptors
 *
 * @param vm
 */
export const initializeResponseInterceptors = vm => {
    axios.interceptors.response.use(
        interceptors.onSuccess.bind(vm),
        interceptors.onError.bind(vm)
    );
};

/**
 * Response interceptors
 */
const interceptors = {
    onSuccess(response) {
        const messages = [];

        if (response.data.success) {
            messages.push(response.data.message);
            setTimeout(function () {
                store.dispatch('setSuccessMessages', messages);
            }, 200);
        }
        return response;
    },

    onError: function (error) {
        if (!error.response) {
            router.push({name: "offline"});
            return;
        }

        if (error.response.status === 422) {
            const messages = [];

            if (error.response.data.errors) {
                for (let key in error.response.data.errors) {
                    messages.push(error.response.data.errors[key]);
                }
            } else {
                messages.push(error.response.data.message)
            }
            store.dispatch('setErrorMessages', messages);
        }

        return Promise.reject(error);
    },
};