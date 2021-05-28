import Home        from '../views/Home';
import Form        from '../views/Form';
import Admin       from '../views/Admin';
import ClientAdd   from '../views/clients/Add';
import ClientEdit  from '../views/clients/Edit';
import ClientIndex from '../views/clients/Index';

import WorkspaceAdd   from '../views/workspaces/Add';
import WorkspaceEdit  from '../views/workspaces/Edit';
import WorkspaceIndex from '../views/workspaces/Index';

import FormAdd   from '../views/forms/Add';
import FormEdit  from '../views/forms/Edit';
import FormIndex from '../views/forms/Index';

import QuestionAdd   from '../views/questions/Add';
import QuestionEdit  from '../views/questions/Edit';
import QuestionIndex from '../views/questions/Index';

export const routes = [
    {
        path:      '/',
        name:      'home',
        component: Home,
    },
    {
        path:      '/form/:slug',
        name:      'Form',
        component: Form,
        props:     true
    },
    {
        path:      '/admin',
        name:      'Admin',
        component: Admin,
    },
    //clients
    {
        path:      '/admin/clients',
        name:      'ClientIndex',
        component: ClientIndex,
    },
    {
        path:      '/admin/clients/create',
        name:      'ClientAdd',
        component: ClientAdd,
    },
    {
        path:      '/admin/clients/:id/edit',
        name:      'ClientEdit',
        component: ClientEdit,
        props:     true
    },
    //workspaces
    {
        path:      '/admin/workspaces',
        name:      'WorkspaceIndex',
        component: WorkspaceIndex,
    },
    {
        path:      '/admin/workspaces/create',
        name:      'WorkspaceAdd',
        component: WorkspaceAdd,
    },
    {
        path:      '/admin/workspaces/:id/edit',
        name:      'WorkspaceEdit',
        component: WorkspaceEdit,
        props:     true
    },
    //forms
    {
        path:      '/admin/forms',
        name:      'FormIndex',
        component: FormIndex,
    },
    {
        path:      '/admin/forms/create',
        name:      'FormAdd',
        component: FormAdd,
    },
    {
        path:      '/admin/forms/:id/edit',
        name:      'FormEdit',
        component: FormEdit,
        props:     true
    },
    //questions
    {
        path:      '/admin/questions',
        name:      'QuestionIndex',
        component: QuestionIndex,
    },
    {
        path:      '/admin/questions/create',
        name:      'QuestionAdd',
        component: QuestionAdd,
    },
    {
        path:      '/admin/questions/:id/edit',
        name:      'QuestionEdit',
        component: QuestionEdit,
        props:     true
    },


];
