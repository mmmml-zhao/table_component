const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {},
    data: {},
    computed: {},
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
        onShareAppMessage() {
            return app.globalData.transmit;
        }
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
