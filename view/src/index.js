import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'iview/dist/styles/iview.css';
import IView from 'iview';
import 'element-ui/lib/theme-default/index.css';

import {
    Layout
} from './components';
import {
    PageLogin
} from './login';
import {
    HotelSiderNav,
    PageHotelList,
    PageHotelGategory,
    PageHotelGategoryEdit,
    PageRolesList,
    PageAdminList,
    PageRoleEdit,
    PageOptLogList,
    PageAdminEdit,
    PageHotelEdit
} from './hotels';
import {
    ContentSiderNav,
    PageContentList,
    PageProjectDetail,
    PagePublicPicsStore,
    PageItemsStore,
    PageItemsTreeStore,
    PageNewItem,
    PageNewItemTree,
    PagePublishItem,

    PageCAddMerchant,
    PageCAllMerchant,
    PageCUnchecked,
    PageCPassed,
    PageCRejected,
    PageCPublishManagement,
    PageCPublishLogs,
    PageCHotelPublishStatus,
    PageCMerchantData,
    PageCOnlineData,
    PageCAllMerchantDetail,
    PageCPublishSet,
    PageCUncheckedDetail,
    PageCPassedDetail,
    PageCRejectedDetail,
    PageCPublishLogDetail,
    PageCHotelPublishDetail,
    PageCPassedTip,
} from './contents';
import {
    vodRoutes,
} from './vod';
import { PageNoPermission } from './noPermission'
import {
    appStore
} from './stores'
import vuexStore from './vuexStore';
import common from './common';

Vue.use(ElementUI);
Vue.use(IView);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

function authImp(to, from, edit, create, next) {
    let bo = false;
    if (to.path.indexOf('?id=') !== -1) {
        bo = common.auth(edit);
    } else {
        bo = common.auth(create);
    }

    if (bo) {
        next();
    } else {
        if (to.path.indexOf('/content') === -1)
            next({ path: '/nopermission' });
        else
            next({ path: '/content/nopermission' });
    }
}

function authList(to, from, list, next) {
    const bo = common.auth(list);
    if (bo) {
        next();
    } else {
        if (to.path.indexOf('/content') === -1)
            next({ path: '/nopermission' });
        else
            next({ path: '/content/nopermission' });
    }
}

function authHotelList(to, from, next) {
    let bo = common.auth('酒店列表');
    if (!bo) {
        bo = common.auth('酒店列表所有');
    }
    if (bo) {
        next();
    } else {
        if (to.path.indexOf('/content') === -1)
            next({ path: '/nopermission' });
        else
            next({ path: '/content/nopermission' });
    }
}
let SiderBar = HotelSiderNav;
const routes = [{
    path: '/',
    components: {
        'side-nav': HotelSiderNav,
        'layout-main': PageHotelList,
    },
    beforeEnter: (to, from, next) => {
        authHotelList(to, from, next);
    }
}, {
    path: '/category',
    components: {
        'side-nav': HotelSiderNav,
        'layout-main': PageHotelGategory
    },
    beforeEnter: (to, from, next) => {
        authList(to, from, '酒店组列表', next);
    }
}, {
    path: '/category/edit',
    components: {
        'side-nav': HotelSiderNav,
        'layout-main': PageHotelGategoryEdit
    },
    beforeEnter: (to, from, next) => {
        authImp(to, from, '酒店组编辑/锁定', '酒店组新建', next);
    }
}, {
    path: '/roles',
    components: {
        'side-nav': HotelSiderNav,
        'layout-main': PageRolesList,
    },
    beforeEnter: (to, from, next) => {
        authList(to, from, '角色列表', next);
    }
}, {
    path: '/roles/edit',
    components: {
        'side-nav': HotelSiderNav,
        'layout-main': PageRoleEdit,
    },
    beforeEnter: (to, from, next) => {
        authImp(to, from, '角色编辑/锁定', '角色新建', next);
    }
}, {
    path: '/admins',
    components: {
        'side-nav': HotelSiderNav,
        'layout-main': PageAdminList,
    },
    beforeEnter: (to, from, next) => {
        authList(to, from, '管理员列表', next);
    }
}, {
    path: '/admin/edit',
    components: {
        'side-nav': HotelSiderNav,
        'layout-main': PageAdminEdit,
    },
    beforeEnter: (to, from, next) => {
        authImp(to, from, '管理员编辑/锁定', '管理员新建', next);
    }
}, {
    path: '/optlog',
    components: {
        'side-nav': HotelSiderNav,
        'layout-main': PageOptLogList,
    },
    beforeEnter: (to, from, next) => {
        authList(to, from, '操作日志列表', next);
    }
}, {
    path: '/content',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageContentList,
    },
    beforeEnter: (to, from, next) => {
        authList(to, from, '栏目发布列表', next);
    }
}, {
    path: '/content/project-detail',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageProjectDetail,
    },
}, {
    path: '/content/public-pics-store',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PagePublicPicsStore,
    },
    beforeEnter: (to, from, next) => {
        authList(to, from, '图片库列表', next);
    }
}, {
    path: '/content/items-store',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageItemsStore,
    },
    beforeEnter: (to, from, next) => {
        authList(to, from, '栏目库列表', next);
    }
}, {
    path: '/content/items-tree-store',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageItemsTreeStore,
    },
    beforeEnter: (to, from, next) => {
        authList(to, from, '栏目树库列表', next);
    }
}, {
    path: '/content/new-item',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageNewItem,
    },
    beforeEnter: (to, from, next) => {
        authImp(to, from, '栏目库编辑/锁定', '栏目库新建', next);
    }
}, {
    path: '/content/new-item-tree',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageNewItemTree,
    },
    beforeEnter: (to, from, next) => {
        authImp(to, from, '栏目树库编辑/锁定', '栏目树库新建', next);
    }
}, {
    path: '/content/publish-item',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PagePublishItem,
    },
    beforeEnter: (to, from, next) => {
        authImp(to, from, '栏目发布编辑/锁定', '栏目发布新建', next);
    }
}, {
    path: '/hotel',
    components: {
        'side-nav': HotelSiderNav,
        'layout-main': PageHotelList,
    },
    beforeEnter: (to, from, next) => {
        authHotelList(to, from, next);
    }
}, {
    path: '/hotel/edit',
    components: {
        'side-nav': HotelSiderNav,
        'layout-main': PageHotelEdit,
    },
    beforeEnter: (to, from, next) => {
        authImp(to, from, '酒店编辑/锁定', '酒店新建', next);
    }
}, {
    path: '/content/add-merchant',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCAddMerchant,
    }
}, {
    path: '/content/all-merchant',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCAllMerchant,
    }
}, {
    path: '/content/all-merchant-detail',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCAllMerchantDetail,
    }
}, {
    path: '/content/unchecked',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCUnchecked,
    }
}, {
    path: '/content/unchecked-detail',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCUncheckedDetail,
    }
}, {
    path: '/content/passed-tip',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCPassedTip,
    }
}, {
    path: '/content/passed',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCPassed,
    }
}, {
    path: '/content/passed-detail',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCPassedDetail,
    }
}, {
    path: '/content/rejected',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCRejected,
    }
}, {
    path: '/content/rejected-detail',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCRejectedDetail,
    }
}, {
    path: '/content/publish-management',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCPublishManagement,
    }
}, {
    path: '/content/publish-management-set',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCPublishSet,
    }
}, {
    path: '/content/publish-logs',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCPublishLogs,
    }
}, {
    path: '/content/publishlog-detail',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCPublishLogDetail,
    }
}, {
    path: '/content/hotel-publish-status',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCHotelPublishStatus,
    }
}, {
    path: '/content/hotelpublish-detail',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCHotelPublishDetail,
    }
}, {
    path: '/content/merchant-data',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCMerchantData,
    }
}, {
    path: '/content/online-data',
    components: {
        'side-nav': ContentSiderNav,
        'layout-main': PageCOnlineData,
    }
}, {
    path: '/nopermission',
    components: {
        // 没有权限
        'side-nav': SiderBar,
        'layout-main': PageNoPermission,
    },
    // beforeEnter: (to, from, next) => {
    //     console.log(from.path.indexOf('/content/') !== -1, from, to);
    //     if (from.path.indexOf('/content/') !== -1) {
    //         SiderBar = ContentSiderNav;
    //         console.log('-----');
    //     }
    //     next();
    // }
}, {
    path: '/content/nopermission',
    components: {
        // 没有权限
        'side-nav': ContentSiderNav,
        'layout-main': PageNoPermission,
    },
}, ...vodRoutes];

// routes.redirect({
//   '*': '/hotel'
// });

const router = new VueRouter({
    routes,
});

const store = new Vuex.Store({
    modules: {
        ...vuexStore,
    },
});

const PageLayout = appStore.isLogin() ? Layout : PageLogin;

Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();
var app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(appStore.isLogin() ? Layout : PageLogin),
});
