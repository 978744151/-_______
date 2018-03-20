$(function () {
    render()
})
function render(){
    $.ajax({
        type:'get',
        url:url+'/api/api-bin/wjcm/entry/datalist/queryUserAddress.action',
        data:{
            userid : 1
        },
        success: function (data) {
            console.log(data);
            var html = template('tpl',data)
            $('.quertsite_list').html(html)
        }
    })
}
//编辑
$('body').on('click','.qs_edit', function () {
    $this = $(this)
    var addressid = $(this).data('id')
    window.location.href = "queryone.html?id="+addressid
})
//删除
$('body').on('click','.qs_del', function () {
    $this = $(this)
    var addressid = $(this).data('id')
    console.log(addressid)
    var btnArray = ['否', '是'];
    mui.confirm('确认删除地址吗？', '', btnArray, function(e) {
        if (e.index == 1) {
            $.ajax({
                type:'get',
                url:url+'/api/api-bin/wjcm/entry/datalist/delUserAddressInformation.action',
                data:{
                    addressid:addressid
                },
                success: function (data) {
                    console.log(data);
                    render()
                }
            })
            mui.toast('删除成功')
        } else {

        }
    })
})
//设为默认
$('body').on('change','.side_ck', function () {
    $this = $(this)
    var addressid = $(this).data('id')
    var index = $this.is(":checked") ? 0 : 1;
    $.ajax({
        type:'post',
        url:url+'/api/api-bin/wjcm/entry/datalist/defaultUserAddressInfo.action?',
        data:{
            addressid : addressid,
            userid : 1,
            isdefault : index,
        },
        success: function (data) {
            mui.toast('设置成功')
            render()
        },
        error: function(){
            mui.toast('请稍后再试')
        }
    })
})
