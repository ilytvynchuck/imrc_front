import api from './request';

/**
 * Get clients
 */
export const getQuestionsRequest = () => {
    return api
        .request('questions')
        .get();
};

export const storeQuestion = (id, data, shouldSanitize = false) => typeof id === "undefined" ? api
    .request('questions')
    .withBody(data)
    .post() : api
    .request('questions/' + id)
    .withBody(data, shouldSanitize)
    .put();

export const getQuestionRequest = (id) => {
    return api
        .request('questions/' + id + '/edit')
        .get();
};

