$(document).ready(function () {
})
mui('.mui-numbox').numbox()
$('.pro_header h4').on('click', function () {
    $(this).addClass('now').siblings().removeClass('now')
})

var key = tools.getParam('key')
console.log(key)
//渲染
$.ajax({
    type:'get',
    url:url+'/api/api-bin/wjcm/entry/datalist/queryOneGoods.action?shopcode=10000000&barcode='+key,
    success: function (data) {
        console.log(data)
        var pro_img = data.result.goods.commoditypresentation
        pro_img = pro_img.split(';')
        data.pro_img = pro_img
        if(data.success == 1){
            var html = template('tpl',data);
            $('.add_content').html(html);

            //layer弹框事件
            $('body').on('click','.layer_open,.pro_button',function () {
                layer.open({
                    type: 1
                    ,content:
                    "<div class='layer'>" +
                    '<p>颜色</p>' +
                    '<div class="pro_color"><span class="now">蓝色</span><span>黑色</span><span>黄色</span></span></div>' +
                    '<p>尺寸</p>' +
                    '<p class="pro_color"><span class="now">16g</span><span>35g</span><span>64g</span></p>' +
                    '<p>数量</p>' +
                    '<div class="mui-numbox" data-numbox-step="1" data-numbox-min="0" data-numbox-max="100">' +
                    '<button class="mui-btn mui-numbox-btn-minus" type="button">-</button>' +
                    '<input class="mui-numbox-input" type="number" class="pro_number"/>' +
                    '<button class="mui-btn mui-numbox-btn-plus" type="button">+</button>' +
                    '</div>'+
                    '<p>库存 15 件</p>' +
                    '</div>' +
                    '<button class="car_button">加入购物车</button>'
                    ,anim: 'up'
                    ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 400px; padding:10px 0; border:none;'
                    ,success: function(e){
                        mui('.mui-numbox').numbox()
                        $('.layer').on('click','span', function () {
                            $(this).addClass('now').siblings().removeClass('now')
                        })
                        $('.pro_color').on('click','p', function () {
                            $(this).addClass('now').siblings().removeClass('now')
                        })
                    }
                });
            })

            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            var commoditypic = data.result.goods.commoditypic;
            var com_arr= commoditypic.split('com')[1]
            console.log(com_arr)
            var marketprice = data.result.goods.memberprice
            console.log(marketprice);
            var goodsprice = data.result.goods.buyprice
            console.log(goodsprice);
//加入购物车事件
            $('body').on('click','.car_button',function () {
                var size = $('.pro_color').find('span.now').text()
                console.log(size)
                var number = mui('.mui-numbox').numbox().getValue()
                console.log(number)
                var commodityname = $('.pro_name').text()
                console.log(commodityname);
                var data = {
                    userid : 1,
                    barcode : key,
                    commodityname : commodityname,
                    commoditypic :com_arr,
                    marketprice : marketprice,
                    goodsprice : goodsprice,
                    goodsnum : number,
                    speckeyname : size
                }
                $.ajax({
                    type:'post',
                    url:url+'/api/api-bin/wjcm/entry/datalist/addCarGoods.action',
                    data:data,
                    success: function (data) {
                        console.log(data)
                    },
                    error: function(){
                        mui.toast('请稍后再试')
                    }
                })
            })
        //    收藏功能
        }
    }
})

