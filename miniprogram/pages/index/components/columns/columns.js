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
                title: "key",
                key: "key",
            }, {
                title: "介绍",
                key: "desc",
            }, {
                title: "类型",
                key: "type",
            }, {
                title: "必填",
                key: "require",
            }],
        dataList: [],
        getListLoading: false
    },
    methods: {
        options: {},
        getList() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    this.setData({
                        getListLoading: true
                    });
                    const res = yield mockData('data', [{
                            key: 'title',
                            desc: '字段名中文含义',
                            type: 'string',
                            require: true
                        }, {
                            key: 'key',
                            desc: '字段名',
                            type: 'string',
                            require: true
                        }, {
                            key: 'width',
                            desc: '单元格宽度',
                            type: 'string',
                            require: false
                        }, {
                            key: 'type',
                            desc: '判断字段是否是自定义组件',
                            type: 'action',
                            require: false
                        }, {
                            key: 'render',
                            desc: 'td内内容由函数返回 (value: any, item: any, index: number, data?: 当前页面的this.data) => any,// 设置内容',
                            type: 'function',
                            require: false
                        }]);
                    this.setData({
                        dataList: res.data,
                        getListLoading: false
                    });
                }
                catch (e) {
                    this.setData({
                        getListLoading: false
                    });
                    console.log(e);
                }
            });
        },
        initComponent() {
            this.getList();
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
