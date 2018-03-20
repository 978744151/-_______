$(function () {
    render()

})

function render(){
    $.ajax({
        url:url+"/api/api-bin/wjcm/entry/datalist/queryUserCarGoods.action",
        data: {
            userid : 1
        },
        success: function (data) {
            if(data.success == 1){
                console.log(data)
                var html = template('tpl',data)
                $('.goods-list').html(html)
                var newprice = $('.cart_all').text()
                data.price = newprice

                mui('.mui-numbox').numbox()
                $('.cart_all').text(' ')
                $(':checked').prop('checked',false)
            }
        }
    })
}
function totle(){
    var price = 0;
    $(".ck:checked").each(function (e,i) {
        var goodprice = $(this).data('price')
        var goodsnumber = $(this).parent().find('.mui-numbox-input').val()
        price += goodprice * goodsnumber
    })
    $('.cart_all').html(price.toFixed(2))
}
//用户修改数量
$('body').on('change','.mui-numbox-input', function () {
    var price = 0;
    var index = $(this).data('id')
    console.log(index)
    var number = $(this).val()
    console.log(number)
    $.ajax({
        type: 'get',
        url: url+'/api/api-bin/wjcm/entry/datalist/updateUserCarGoods.action',
        data:{
            userid : 1,
            cartid : index,
            goodsnum : number
        },
        success: function (data) {
            if(data.success == 1){
                totle()
            }
        },
        error: function(){
            mui.toast('请稍后再试')
        }
    })
})
//删除购物车功能
$('body').on('click','.btn_delete', function () {
    console.log(1)
    var index = $(this).data('id')
    console.log(index);
    $.ajax({
        type: 'get',
        url: url+'/api/api-bin/wjcm/entry/datalist/deleteUserCarGood.action',
        data:{
            userid : 1,
            cartid : index,
        },
        success: function (data) {
            if(data.success == 1){
                mui.toast('删除成功')
                render()
            }
        },
        error: function(){
            mui.toast('请稍后再试')
        }
    })
})


$('body').on('change','.ck',function(){

    var ck_length = $(".ck:checked").length;
    var checked = $(".ck").length;

    if(ck_length == checked){
        $('.foot_ck').prop("checked",true);
    }else{
        $('.foot_ck').prop("checked",false);
    }
    totle()
})



$('.foot_ck').on('change', function () {
    if($(this).prop('checked')){
        $('.ck').prop("checked",true)
    }else{
        $('.ck').prop("checked",false)
    }
    totle()
})

//结算购物车功能



