const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        item: {
            type: Object,
            value: {}
        },
        index: {
            type: Number,
        },
        columns: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        handleClickItem(e) {
            const { type } = e.currentTarget.dataset;
            const { index, item } = this.data;
            this.triggerEvent('clickaction', {
                value: {
                    type,
                    index, item
                }
            });
            this.triggerEvent('onactionevent', {
                value: {
                    type,
                    index, item
                }
            });
        }
    },
    lifetimes: {
        attached: function () { },
        ready: function () { },
        moved: function () { },
        detached: function () { },
    },
    pageLifetimes: {
        show: function () { },
        hide: function () { },
        resize: function () { },
    },
});
