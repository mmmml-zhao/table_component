const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        text: {
            type: String,
            value: '暂无数据'
        },
        subText: {
            type: String,
            value: ''
        }
    },
    data: {},
    methods: {
        onLoad(options) {
            console.log(options);
        },
        onShow() {
            console.log('onShow');
        },
        onReady() {
            console.log('onReady');
        },
    },
    lifetimes: {
        attached: function () { },
        moved: function () { },
        detached: function () { },
    },
    pageLifetimes: {
        show: function () { },
        hide: function () { },
        resize: function () { },
    },
});
