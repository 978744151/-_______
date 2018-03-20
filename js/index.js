//页面开始进行的函数
$(document).ready(function(){
    ajax(2,callback());

})


//首页轮播图
$.ajax({
    type:"get",
    url:url+'/api/api-bin/wjcm/entry/datalist/queryBannerPicture.action?shopcode=10000000',
    success: function (data) {
        console.log(data)

        if(data.success == 1){
            var html = template("tpl", data);
            $('.index_banner').html(html);
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    },
    error: function (){
        mui.coast('加载失败，稍后进行操作')
    }
})
//商品列表参数
function ajax(id,callback){
    $.ajax({
        type:'get',
        url:url+'/api/api-bin/wjcm/entry/datalist/queryAllGoods.action?shopcode=10000000',
        success:function (data) {
            if(data.success == 1){
                var html = template("tpl2", data);
                $('.goods-list').html(html);
            }
        },
        error: function () {
            mui.coast('加载失败，稍后进行操作')
        }
    })
}
function callback(){
    $('body').on('click','.goods-item', function () {
        var index = $(this).data('id');
        location.href = 'product.html?key='+index;
    })
}


