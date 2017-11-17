//app.js
App({
  onLaunch: function () {
    if (wx.getExtConfig) {
      wx.getExtConfig({
        success: function (res) {
          getApp().globalData.appid = res.extConfig.appId;
          // console.log(res)
          wx.request({
            url: 'https://xcx.bjletusq.com/index.php/home/common/getid',
            method:'POST',
            data:{id:res.extConfig.appId},
            header: {"Content-Type": "application/x-www-form-urlencoded"}, 
            success:function(res4){
              //获取shopId
              getApp().globalData.shopId = res4.data;
              // 登录
              wx.login({
                success: res1 => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  wx.request({
                    url: 'https://xcx.bjletusq.com/index.php/home/common/getopenid',
                    method: 'GET',
                    data: {code: res1.code, appid: res.extConfig.appId},
                    //提交平台appID,以及获取openid
                    success: function (res6) {
                      // console.log(res6)
                      getApp().globalData.openid = res6.data.openid
                      //获取用户信息
                      wx.getUserInfo({
                        success: res2 => {
                          // console.log(res2)
                          getApp().globalData.uesrinfo = res2.userInfo;
                          //绑定用户信息
                          wx.request({
                            url: 'https://xcx.bjletusq.com/index.php/home/common/adduser',
                            method: 'POST',
                            header: { "Content-Type": "application/x-www-form-urlencoded" },
                            data: { openid: res6.data.openid, nickname: res2.userInfo.nickName, header: res2.userInfo.avatarUrl, openid: res6.data.openid, admin_user_id: getApp().globalData.shopId },
                            success: res3 => {
                              // console.log(res3)
                              getApp().globalData.userid = res3.data.id;
                              getApp().globalData.is_distribution = res3.data.is_distribution;
                              getApp().globalData.username = res3.data.name;
                              getApp().globalData.userphone = res3.data.phone;
                              getApp().globalData.sharename = res3.data.share_name;
                              getApp().globalData.sharephone = res3.data.share_phone;
                            }
                          })
                        },
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  globalData: {
  }
})