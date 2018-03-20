var id = tools.getParam('id')//地址id

$.ajax({
    type:'get',
    url:url+'/api/api-bin/wjcm/entry/datalist/queryUserOneAddress.action',
    data:{
        addressid:id
    },
    success: function (data) {
        $('.site_city').val(data.result.UserOneAddress.provincialurbanarea)
        $('.Indetail').val(data.result.UserOneAddress.address)
        $('.siteName').val(data.result.UserOneAddress.consignee)
        $('.site_number').val(data.result.UserOneAddress.mobile)
    },
    error: function(){
        mui.toast('请稍后再试')
    }
})
$('.sitesave').on('click', function () {
    var site_city = $('.site_city').val();
    var Indetail = $('.Indetail').val();
    var siteName = $('.siteName').val();
    var number = $('.site_number').val()
    var index = $('.radioclass').is(":checked") ? 0 : 1;
    var data = {
        addressid : id,
        userid : 1,
        consignee : siteName,
        country : '中国',
        provincialurbanarea : site_city,
        address : Indetail,
        mobile : number,
        isdefault : index
    }
    $.ajax({
        type:'get',
        url:url+'/api/api-bin/wjcm/entry/datalist/editUserAddressInformation.action',
        data:data,
        success: function (data) {
            console.log(data);
            window.location.href = "querysite.html"
        }
    })
})