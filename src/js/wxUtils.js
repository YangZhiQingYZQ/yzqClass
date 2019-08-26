/*
 * @Author: YZQ
 * @DeScription: 
 * @Date: 2019-08-26 00:10:55
 * @LastEditors: YZQ
 * @LastEditTime: 2019-08-26 01:02:46
 */

// 默认占位回调函数
const defaultCallback = _ => {};
/**
 * @author: YZQ
 * @deScription: 获取图片信息
 * @param {String} src 图片url 
 * @param {Function} callback 无论成功或失败都进行调用 
 * @return: 图片文件对象
 */
export const getImageInfo = function (src, callback = defaultCallback) {
    return new Promise((resolve, reject) => {
        wx.getImageInfo({
            src: src,
            success(res) {
                resolve(res);
            },
            fail(res) {
                reject(res)
            },
            complete(res) {
                callback(res);
            }
        })
    })
};
/**
 * @author: YZQ
 * @deScription: 获取用户设备信息
 * @param {Function} callback 无论成功或失败都进行调用 
 * @return: 设备信息对象
 */
export const getUserPhoneInfo = function (callback = defaultCallback) {
    return new Promise((resolve, reject) => {
        wx.getSystemInfo({
            success(res) {
                resolve(res);
            },
            fail(res) {
                reject(res);
            },
            complete(res) {
                callback();
            }
        })
    })
}
//分享朋友圈功能
export const shareCircle = function (canvasId, that, type = false) {
    let share_img = "../../../static/images/commom/share-0.png",
        share_qr = "../../../static/images/commom/Qr.png";
    return Promise.all([
        this.getImageInfo(share_img),
        this.getUserQr().then(res => {
            return this.getImageInfo(res)
        }),
        this.getUserPhoneInfo()
    ]).then(res => {
        //设置宽高比
        // 图片缩放比
        let canvas = wx.createCanvasContext(canvasId),
            canvasWidth = res[2].windowWidth * 2,
            canvasHeight = res[2].windowWidth * 2 / whProportion,
            zoomProportion = 375 / res[2].windowWidth,


            whProportion = res[0].width / res[0].height,
            QrWidth = res[1].width * 2 / 3 * whProportion,
            QrHeight = res[1].height * 2 / 3 * whProportion;

        //设置画布的宽高
        that.canvasWidth = canvasWidth + "px";
        that.canvasHeight = canvasHeight + "px";
        //画图
        canvas.drawImage(share_img, 0, 0, res[0].width, res[0].height, 0, 0, canvasWidth, canvasHeight);
        canvas.drawImage(res[1].path, 0, 0, res[1].width, res[1].height, 20 * 2 / zoomProportion, 456 * 2 * whProportion / zoomProportion, QrWidth / zoomProportion, QrHeight / zoomProportion);
        canvas.draw(true, function () {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: canvasWidth,
                height: canvasHeight,
                destWidth: canvasWidth,
                destHeight: canvasHeight,
                canvasId: canvasId,
                success(res) {
                    that.img_src = res.tempFilePath;
                    wx.setStorageSync('shareImg', res.tempFilePath);
                },
                fail(res) {
                    console.log(res)
                }
            });
        });
    })
};
/**
 * @author: YZQ
 * @deScription: 从用户拍照或者相册中获取图片
 * @param {Nunber} count 需要获取图片的数量 
 * @return: 图片路径数组
 */
export const getImg = function (count) {
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            count: count,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                resolve(res.tempFilePaths)
            },
            fail() {
                return reject(false);
            }
        })
    })
}

/**
 * @author: YZQ
 * @deScription: 将base64码的图片转为文件图片
 * @param {String} base64data 图片base64位码
 * @param {Function} cd 回调函数
 * @return: 返回转换后的图片临时路径
 */
export const base64src = function (base64data, cb) {
    const fsm = wx.getFileSystemManager(),
        FILE_BASE_NAME = 'tmp_base64src', //自定义文件名
        [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if (!format) {
        return (new Error('ERROR_BASE64SRC_PARSE'));
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
    const buffer = wx.base64ToArrayBuffer(bodyData);
    fsm.writeFile({
        filePath,
        data: buffer,
        encoding: 'binary',
        success() {
            cb(filePath);
        },
        fail() {
            return (new Error('ERROR_BASE64SRC_WRITE'));
        },
    });
};
/**
 * @author: YZQ
 * @deScription: 保存图片函数
 * @param {String} filePath 需要保存图片的路径
 * @param {Function} cd 回调函数
 * @return: 无返回
 */
export const saveImg = function (filePath, cb = defaultCallback) {
    wx.saveImageToPhotosAlbum({
        filePath: filePath,
        success(res) {
            cb();
        }
    })
}
//获取用户的分享二维码
export const getUserQr = function () {
    return this.ajax({
        url: '/chat/getShareQt',
        type: "GET"
    }, this.getAuthorization()).then(res => {
        console.log(res);
        return res.data.qtUrl;
    })
};