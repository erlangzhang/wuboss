import ContentSiderNav from '../contents/ContentSiderNav.vue';
import PageMaterialList from './mainMenu/PageMaterialList.vue';
import PageMaterialEdit from './mainMenu/PageMaterialEdit.vue';
import PageMainMenuList from './mainMenu/PageMainMenuList.vue';
import PageMainMenuEdit from './mainMenu/PageMainMenuEdit.vue';
import PageReleaseList from './mainMenu/PageReleaseList.vue';
import PageReleaseEdit from  './mainMenu/PageReleaseEdit.vue';
import PagePendingList from './media/PagePendingList.vue';
import PagePendingEdit from './media/PagePendingEdit.vue';
import PageMediaList from './media/PageMediaList.vue';
import PageMediaIssued from './media/PageMediaIssued.vue';
import PageTopicList from './media/PageTopicList.vue';
import PageTopicEdit from './media/PageTopicEdit.vue';
import PageTopicPreview from './media/PageTopicPreview.vue';
import PageReleaseManageList from './home/PageReleaseManageList.vue';
import PageReleaseManageEdit from './home/PageReleaseManageEdit.vue';
import PageHomeManageList from './home/PageHomeManageList.vue';
import PageHomeManageEdit from './home/PageHomeManageEdit.vue';
import PageReleaseLogList from './home/PageReleaseLogList.vue';
import PageReleaseLogEdit from './home/PageReleaseLogEdit.vue';
import PageReleasePreview from './home/PageReleasePreview.vue';

export const vodRoutes = [
    {
        path: '/main_menu/material',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageMaterialList
        },
    }, {
        path: '/main_menu/material-edit',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageMaterialEdit
        },
    }, {
        path: '/main_menu/index',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageMainMenuList
        },
    }, {
        path: '/main_menu/index-edit',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageMainMenuEdit
        },
    }, {
        path: '/main_menu/release',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageReleaseList
        },
    }, {
        path: '/main_menu/release-edit',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageReleaseEdit
        },
    }, {
        path: '/media/pending',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PagePendingList
        },
    }, {
        path: '/media/pending-edit',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PagePendingEdit
        },
    }, {
        path: '/media/index',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageMediaList
        },
    }, {
        path: '/media/issued',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageMediaIssued
        },
    }, {
        path: '/media/topic',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageTopicList
        },
    }, {
        path: '/media/topic-edit',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageTopicEdit
        },
    }, {
        path: '/media/topic-preview',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageTopicPreview
        },
    }, {
        path: '/vod_home/release_manage',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageReleaseManageList
        },
    }, {
        path: '/vod_home/release_manage-edit',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageReleaseManageEdit
        },
    }, {
        path: '/vod_home/home_manage',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageHomeManageList
        },
    }, {
        path: '/vod_home/home_manage-edit',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageHomeManageEdit
        },
    }, {
        path: '/vod_home/release_log',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageReleaseLogList
        },
    }, {
        path: '/vod_home/release_log-edit',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageReleaseLogEdit
        },
    }, {
        path: '/vod_home/release_preview',
        components: {
            'side-nav': ContentSiderNav,
            'layout-main': PageReleasePreview
        },
    }
];