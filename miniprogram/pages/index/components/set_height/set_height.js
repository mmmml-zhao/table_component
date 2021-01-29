var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mockData } from '../../../../public/utils/util';
const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {},
    data: {
        tableColumns: [{
                title: "姓名",
                key: "name",
            }, {
                title: "年龄",
                key: "age",
            }, {
                title: "性别",
                key: "sex",
            }],
        dataList: [],
        pageNum: 1,
        pageSize: 10,
        pageCount: 1,
        getListLoading: false,
        scrollViewHeight: "600rpx"
    },
    methods: {
        options: {},
        getList() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { pageNum, pageSize, pageCount, dataList, getListLoading } = this.data;
                    if (pageNum > pageCount)
                        return;
                    if (getListLoading)
                        return;
                    this.setData({
                        getListLoading: true,
                    });
                    const res = yield mockData('list', {
                        id: 1,
                        name: '兼职人员',
                        age: 10,
                        sex: '男',
                    }, "name", pageNum, pageSize);
                    this.setData({
                        dataList: dataList.concat(res.data.list),
                        pageCount: res.data.pageCount,
                        getListLoading: false,
                        pageNum: res.data.list.length > 0 ? pageNum + 1 : pageNum,
                    });
                }
                catch (e) {
                    this.setData({
                        getListLoading: false,
                    });
                    console.log(e);
                }
            });
        },
        getTableScrollViewHeight() {
            const { pageConfig } = app.globalData;
            const node = this.createSelectorQuery().select('.set-height-table >>> .tr-th');
            node.boundingClientRect((rect) => {
                this.setData({
                    tableScrollViewHeight: `calc(100vh - ${pageConfig.titleHeight + (rect.height / pageConfig.pixelRate)}rpx)`
                });
            }).exec();
        },
        initComponent() {
            this.getList();
            this.getTableScrollViewHeight();
        },
    },
    lifetimes: {
        attached: function () { },
        ready: function () { this.initComponent(); },
        moved: function () { },
        detached: function () { },
    },
    pageLifetimes: {
        show: function () { },
        hide: function () { },
        resize: function () { },
    },
});
