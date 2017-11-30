import moment from 'moment';
import {
    appStore
} from '../stores'

module.exports = {
    renderTime(unix, formatStr = 'YYYY-MM-DD HH:mm:ss') {
        return moment(unix * 1000).format(formatStr);
    },
    renderArray(arry, prop) {
        const tmp = arry.map(item => {
            if (prop) {
                return item[prop];
            }
            return item;
        })
        return tmp.toString();
    },
    auth(permission) {
        if (appStore.payload !== null) {
            // console.log("超管权限讯在", appStore.payload.Type);
            if (appStore.payload.Type === 9999) {
                // 超级管理员
                return true;
            }
            const tmp = appStore.payload.AllowActions || [];
            for (const item of tmp) {
                if (item.Name === permission) {
                    return true;
                }
            }
        }

        return false;
    },
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}
