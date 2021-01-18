import { setNavStyle } from './public/utils/util';
App({
    onLaunch() {
    },
    globalData: {
        pageConfig: setNavStyle(),
        transmit: {
            title: '小程序table组件',
            path: '/pages/index/index',
            imageUrl: '',
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        }
    },
});
