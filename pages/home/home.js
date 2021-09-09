// pages/home/home.js
Page({
  data: {
    leftname: ['仙女最爱','新品尝鲜','欢乐零食','孰能生巧','终极带餐'],
    foodname:[],
    totalCost:150,
    orderNumber:0,
    activeIndex:4,
    scrollTop:100,
    toView:'a0',
    cartList:[],
    currentType:0,
    currentIndex:0,
    sumMoney:0,
    showCart:false,
    toastHidden:true,

    bannerUrl:[
      '../../imgs/lunxun4.gif',
      '../../imgs/lunxun2.gif',
      '../../imgs/lunxun3.gif',
      '../../imgs/lunxun1.gif'
      ],
    indicatordots:true,
    autoplay:true,
    interval:4000,
    duration:1000,

    listData:[
      {
        name:'仙女最爱',
        foods:[
          {
            name:'清蒸鳜鱼',
            image_url:'../../imgs/qingzhengguiyu.jpg',
            price:1
          },
          {
            name:'蒜苔炒肉',
            image_url:'../../imgs/suantaichaorou.jpg',
            price:1
          },
        ]
      },
      {
        name:'新品尝鲜',
        foods:[
          {
            name:'黄瓜炒火腿',
            image_url:'../../imgs/huangguahuotui.jpg',
            price:1
          },
          {
            name: '京酱肉丝',
            image_url: '../../imgs/jingjiangrousi.jpg',
            price: 1
          }
        ]
      },
      {
        name:'欢乐零食',
        foods:[
          {
            name: '罪恶奶茶',
            image_url: '../../imgs/naicha.jpg',
            price: 1
          },
          {
            name: '劲爆辣条',
            image_url: '../../imgs/latiao.jpg',
            price: 1
          },
          {
            name: '原味鸭脖',
            image_url: '../../imgs/yabo.jpg',
            price: 1
          }
        ]
      },
       {
        name: '孰能生巧',
        foods: [
          {
            name: '白菜牛肉',
            image_url: '../../imgs/baicainiurou.jpg',
            price: 1
          },
          {
            name: '白菜羊肉',
            image_url: '../../imgs/baicaiyangrou.jpg',
            price: 1
          },
          {
            name: '豆芽粉丝',
            image_url: '../../imgs/douyafensi.jpg',
            price: 1
          }
        ]
      },
      {
        name: '终极带餐',
        foods: [
          {
            name: '超级无敌狂热激情么么哒',
            image_url: '../../imgs/baicainiurou.jpg',
            price: 1
          }
        ]
      }
    ] 
  },

  submitClick:function(){
    if(this.data.sumMoney!=0){
      wx.setStorageSync('cartList', this.data.cartList);
      wx.setStorageSync('sumMoney', this.data.sumMoney);
      wx.setStorageSync('orderNumber', this.data.orderNumber);     
      wx.navigateTo({
        url: '../list/list'
      }) 
    }
    if(this.data.sumMoney == 0){
      

    }

  },

//选择左侧列表菜单函数
  selectMenu: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index,
      toView: 'a' + index,
    })
  },
  scroll:function(e){
    var dis=e.detail.scrollTop
    if(dis>0 && dis<300){
      this.setData({ activeIndex: 0 })
    }
    if(dis>300 && dis<600){
      this.setData({ activeIndex: 1 })
    }
    if(dis>600 && dis<900){
      this.setData({ activeIndex: 2 })
    }
    if (dis > 900 && dis < 1050) {
      this.setData({ activeIndex: 3 })
    }
    if (dis > 1200 && dis < 1350) {
      this.setData({ activeIndex: 4 })
    }
    if (dis > 1350 && dis < 1800) {
      this.setData({ activeIndex: 5 })
    }

  },
  addToCart: function (e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentType: type,
      currentIndex: index,
    });
    var a = this.data
    var addItem = {
      "name": a.listData[a.currentType].foods[a.currentIndex].name,
      "price": a.listData[a.currentType].foods[a.currentIndex].price,
      "number": 1,
      "sum": a.listData[a.currentType].foods[a.currentIndex].price,
    }
    var sumMoney = a.sumMoney + a.listData[a.currentType].foods[a.currentIndex].price;
    var cartList = this.data.cartList;
    cartList.push(addItem);
    this.setData({
      cartList: cartList,
      showModalStatus: false,
      sumMoney: sumMoney,
      orderNumber: a.orderNumber + 1
    });
    console.log(this.data.cartList)
    this.setData({
      toastHidden:false
    });
    
    var _this = this;
    setTimeout(function () {
      _this.setData({
        toastHidden: true
      });
    }, 1000);
  },

  showCart:function(){
    console.log(this.data.showCart)
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }
  },

  clearCart:function(){
    this.setData({
      cartList:[],
      showCart:false,
      sumMoney:0,
      orderNumber:0,
    })
  },

  addNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;
    cartList[index].number++;
    var sum = this.data.sumMoney + cartList[index].price;
    cartList[index].sum += cartList[index].price;

    this.setData({
      cartList: cartList,
      sumMoney: sum,
      orderNumber: this.data.orderNumber + 1
    });
  },

  decNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;

    var sum = this.data.sumMoney - cartList[index].price;
    cartList[index].sum -= cartList[index].price;
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
    this.setData({
      cartList: cartList,
      sumMoney: sum,
      showCart: cartList.length == 0 ? false : true,
      orderNumber: this.data.orderNumber - 1
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '小仙女的专属伙夫'
    })
    //从数据库中获取数据
    var that = this;
    var sysinfo = wx.getSystemInfoSync().windowHeight;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})