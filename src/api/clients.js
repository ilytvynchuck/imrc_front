import api from './request';

/**
 * Get clients
 */
export const getClientsRequest = () => {
    return api
        .request('clients')
        .get();
};

export const storeClient = (id, data, shouldSanitize = false) => typeof id === "undefined" ? api
    .request('clients')
    .withBody(data)
    .post() : api
    .request('clients/' + id)
    .withBody(data, shouldSanitize)
    .put();

export const getClientRequest = (id) => {
    return api
        .request('clients/' + id + '/edit')
        .get();
};