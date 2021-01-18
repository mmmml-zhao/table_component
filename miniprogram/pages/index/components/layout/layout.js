const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        title: {
            type: String,
            value: ""
        },
        desc: {
            type: String,
            value: ""
        },
    },
    data: {},
    methods: {},
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
