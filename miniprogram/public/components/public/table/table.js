const getNowPage = () => {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
};
function debounce(fun, delay) {
    let timer = null;
    return function (...args) {
        let _this = this;
        let _args = args;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fun.call(_this, ..._args);
        }, delay);
    };
}
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        rowKey: {
            type: String,
            value: 'id'
        },
        tableHeight: {
            type: String,
            value: '600rpx',
        },
        scrollX: {
            type: Boolean,
            value: false
        },
        columns: {
            type: Array,
            value: []
        },
        dataList: {
            type: Array,
            value: []
        },
        getListLoading: {
            type: Boolean,
            value: false
        },
        showTipImage: {
            type: Boolean,
            value: false
        },
        tipTitle: {
            type: String,
            value: '提示'
        },
        tipSubtitle: {
            type: String,
            value: '暂无数据'
        },
        select: {
            type: Boolean,
            value: false
        },
        selectKeys: {
            type: Array,
            value: []
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
        },
        expandStyle: {
            type: String,
        },
        dynamicValue: {
            type: Object,
            optionalTypes: [Array, String, Number, Boolean, null],
            value: {}
        },
    },
    data: {
        tableScrollViewHeight: '0rpx',
        scrollTop: 0,
        scrollLeftHeader: 0,
        scrollLeftContent: 0,
        scrollTag: null,
        touchStatus: 'end',
        checkObj: {},
    },
    observers: {
        'dataList': function (dataList) {
            if (dataList && dataList.length > 0) {
                this.createShowDataList();
            }
            else {
                this.setScrollTop();
            }
        },
        'selectKeys': function (selectKeys) {
            const newCheckObj = {};
            selectKeys.forEach(item => {
                newCheckObj[item] = true;
            });
            this.setData({
                checkObj: newCheckObj
            });
        },
        'tableHeight': function () {
            this.getTableScrollViewHeight();
        }
    },
    methods: {
        createShowDataList() {
            const { columns, dataList, rowKey } = this.data;
            const needReaderColums = columns.filter(item => item.render);
            this.setData({
                showDataList: dataList.map((item, index) => {
                    let newItem = Object.assign({}, item, { row_key: `${item[rowKey]}` });
                    needReaderColums.forEach((item1) => {
                        newItem[item1.key] = item1.render(newItem[item1.key], item, index, getNowPage().data);
                    });
                    return newItem;
                })
            });
        },
        setScrollTop() {
            this.setData({
                scrollTop: 0
            });
        },
        setScrollLeft(e) {
            const { tag } = e.currentTarget.dataset;
            const { scrollLeft } = e.detail;
            const { scrollTag } = this.data;
            if (tag !== scrollTag)
                return;
            if (tag === 'header') {
                this.setData({
                    scrollLeftContent: scrollLeft
                });
            }
            else if (tag === 'content') {
                this.setData({
                    scrollLeftHeader: scrollLeft
                });
            }
        },
        clearScrollTag: debounce(function (e) {
            const { touchStatus } = this.data;
            if (touchStatus === 'start')
                return;
            this.setData({
                scrollTag: null
            });
        }, 100),
        handleScroll(e) {
            const { scrollX, touchStatus } = this.data;
            if (!scrollX)
                return;
            this.setScrollLeft(e);
            if (touchStatus === 'end') {
                this.clearScrollTag(e);
            }
        },
        handleTouchStart(e) {
            const { scrollX, scrollTag, touchStatus } = this.data;
            if (!scrollX)
                return;
            if (scrollTag || touchStatus === 'start')
                return;
            const { tag } = e.currentTarget.dataset;
            this.setData({
                touchStatus: 'start',
                scrollTag: tag,
            });
        },
        handleTouchEnd(e) {
            const { scrollX, scrollTag } = this.data;
            if (!scrollX)
                return;
            const { tag } = e.currentTarget.dataset;
            if (tag !== scrollTag)
                return;
            this.setData({
                touchStatus: 'end'
            });
        },
        handleScrolltolower() {
            const { showTipImage } = this.data;
            if (showTipImage)
                return;
            this.triggerEvent('scrolltolower');
        },
        handleScrolltoupper() {
            this.triggerEvent('scrolltoupper');
        },
        handleClickListItem(e) {
            this.triggerEvent('clicklistitem', {
                value: e.detail.value
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
            const { item } = e.detail.value;
            const { checkObj, rowKey } = this.data;
            const newCheckObj = Object.assign({}, checkObj);
            newCheckObj[item[rowKey]] = !newCheckObj[item[rowKey]];
            this.setData({
                checkObj: newCheckObj
            }, () => {
                const value = [];
                for (let i in newCheckObj) {
                    if (newCheckObj[i]) {
                        value.push(i);
                    }
                }
                this.triggerEvent('checkkey', {
                    value
                });
            });
        },
        getTableScrollViewHeight: function () {
            try {
                const { tableHeight } = this.data;
                const pageConfig = wx.getSystemInfoSync();
                const node = this.createSelectorQuery().select('.tr-th');
                node.boundingClientRect((rect) => {
                    this.setData({
                        tableScrollViewHeight: `calc(${tableHeight} - ${rect.height * pageConfig.pixelRatio}rpx)`
                    });
                }).exec();
            }
            catch (e) {
                console.log(e);
            }
        },
        tipFc() {
            const { rowKey, columns } = this.data;
            if (!rowKey) {
                console.error('table组件必须指明每一行的唯一标识的字段名，且必须为字符串，数字将会被转为字符串,for循环中的wx:key不使用该字段，用的是createShowDataList中设置的row_key字段');
            }
            if (!columns) {
                console.error('table组件必须指明columns');
            }
        }
    },
    lifetimes: {
        attached: function () {
            this.tipFc();
        },
        ready: function () {
            this.getTableScrollViewHeight();
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
