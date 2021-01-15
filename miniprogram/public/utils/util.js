var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getNowPage = () => {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
};
export const setNavStyle = () => {
    const config = {
        pixelRate: 0.5,
        platform: 'ios',
        capsuleHeight: 44,
        statusBarHeight: 20,
        titleHeight: 136,
        systemHeight: 0,
        isAllScreen: false,
        isHighHead: false,
        phoneSystem: undefined
    };
    let res = wx.getSystemInfoSync();
    config.phoneSystem = res.platform.toLowerCase();
    config.pixelRate = res.windowWidth / 750;
    config.platform = res.platform;
    config.statusBarHeight = res.statusBarHeight;
    if (res.platform.toLowerCase() == 'android') {
        config.capsuleHeight += 4;
    }
    config.titleHeight = (config.capsuleHeight + config.statusBarHeight) / config.pixelRate;
    if (res.statusBarHeight >= 44) {
        config.isHighHead = true;
    }
    if (res.windowHeight > 750)
        config.isAllScreen = true;
    config.systemHeight = res.windowHeight;
    console.log(config);
    return config;
};
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export function mockData(type, item, title, pageIndex, pageSize) {
    if (type === 'data') {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield delay(1000);
            resolve({
                data: item,
                status: 1
            });
        }));
    }
    else {
        const dataList = [];
        for (let i = 0; i < pageSize; i++) {
            dataList.push(Object.assign({}, item, { id: i + 1 + (pageIndex - 1) * pageSize, [title]: `${i + 1 + (pageIndex - 1) * pageSize}条数据` }));
        }
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield delay(1000);
            resolve({
                data: {
                    list: dataList,
                    pageCount: 2
                },
                status: 1
            });
        }));
    }
}
