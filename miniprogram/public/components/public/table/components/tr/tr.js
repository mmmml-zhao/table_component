Component({
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    properties: {
        rowKey: {
            type: String,
            value: 'id'
        },
        columns: {
            type: Array,
            value: []
        },
        item: {
            type: Object,
            value: {}
        },
        index: {
            type: Number,
        },
        select: {
            type: Boolean,
            value: false
        },
        scrollX: {
            type: Boolean,
            value: false
        },
        checked: {
            type: Boolean,
            value: false
        },
        isExpand: {
            type: Boolean,
            value: false
        },
        expandValueKey: {
            type: String,
        },
        initExpandValue: {
            type: String,
            value: '暂无信息'
        },
        expandStyle: {
            type: String,
        },
        dynamicValue: {
            type: Object,
            optionalTypes: [Array, String, Number, Boolean, null]
        },
    },
    data: {
        expandAimation: null,
        expandAimationData: null,
        expanded: false
    },
    methods: {
        handleClickListItem(e) {
            const { index } = e.currentTarget.dataset;
            this.setExpand();
            this.triggerEvent('clicklistitem', {
                value: {
                    index,
                    item: e.currentTarget.dataset.item
                }
            });
        },
        handleClickAction(e) {
            this.triggerEvent('clickaction', {
                value: e.detail.value
            });
        },
        handleOnActionEvent(e) {
            this.triggerEvent('onactionevent', {
                value: e.detail.value
            });
        },
        handleClickExpand(e) {
            this.triggerEvent('clickexpand', {
                value: e.detail.value
            });
        },
        handleClickCheck(e) {
            const { item } = e.currentTarget.dataset;
            const { index } = this.data;
            this.triggerEvent('checkkey', {
                value: {
                    item,
                    index
                }
            });
        },
        setExpand() {
            const { isExpand, expanded, expandAimation } = this.data;
            if (isExpand && expandAimation) {
                if (expanded) {
                    expandAimation.opacity(0).height(0).step();
                }
                else {
                    expandAimation.opacity(1).height('auto').step();
                }
                this.setData({
                    expandAimationData: expandAimation.export(),
                    expanded: !expanded
                });
            }
        },
        initAnimate() {
            const { isExpand } = this.data;
            if (!isExpand)
                return;
            const expandAimation = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease',
            });
            this.data.expandAimation = expandAimation;
        },
    },
    lifetimes: {
        attached: function () { },
        ready: function () {
            this.initAnimate();
        },
        moved: function () { },
        detached: function () { },
    },
    pageLifetimes: {
        show: function () { },
        hide: function () { },
        resize: function () { },
    },
});
