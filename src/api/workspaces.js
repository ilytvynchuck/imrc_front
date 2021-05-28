import api from './request';

/**
 * Get clients
 */
export const getWorkspacesRequest = () => {
    return api
        .request('workspaces')
        .get();
};

export const storeWorkspace = (id, data, shouldSanitize = false) => typeof id === "undefined" ? api
    .request('workspaces')
    .withBody(data)
    .post() : api
    .request('workspaces/' + id)
    .withBody(data, shouldSanitize)
    .put();

export const getWorkspaceRequest = (id) => {
    return api
        .request('workspaces/' + id + '/edit')
        .get();
};

