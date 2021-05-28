import api from './request';

/**
 * Get clients
 */
export const getFormRequestBySlug = (slug) => {
    return api
        .request("form/" + slug)
        .get();
};

export const getFormsRequest = () => {
    return api
        .request('forms')
        .get();
};

export const storeForm = (id, data, shouldSanitize = false) => typeof id === "undefined" ? api
    .request('forms')
    .withBody(data)
    .post() : api
    .request('forms/' + id)
    .withBody(data, shouldSanitize)
    .put();

export const getFormRequest = (id) => {
    return api
        .request('forms/' + id + '/edit')
        .get();
};

export const submitForm = (data) => api
    .request('questions-answers')
    .withBody(data)
    .post();

