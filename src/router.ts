import { Routes }  from '@enum/Routes.ts';
import Settings from '@view/Settings.vue';
import ProjectManager from '@view/ProjectManager.vue';
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const createPath = (route: Routes) => `/${route}`

const routes: RouteRecordRaw[] = [
  {
    path: createPath(Routes.MAIN),
    component: Settings,
  },
  {
    path: createPath(Routes.PROJECT_MANAGER),
    component: ProjectManager,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;