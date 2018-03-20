$('.sitesave').on('click', function () {
    var site_city = $('.site_city').val();
    var Indetail = $('.Indetail').val();
    var siteName = $('.siteName').val();
    var number = $('.site_number').val()
    var index = $('.radioclass').is(":checked") ? 0 : 1;
        var data = {
        userid : 1,
        consignee : siteName,
        country : '中国',
        provincialurbanarea : site_city,
        address : Indetail,
        mobile : number,
        isdefault : index
    }
    console.log(data)
    $.ajax({
        type:'get',
        url:url+'/api/api-bin/wjcm/entry/datalist/addUserAddressInformation.action',
        data:data,
        success: function (data) {
            console.log(data)
            if(data.success == 1){
                window.location.href = 'querysite.html'
            }
        },
        error: function(){
            mui.toast('请稍后再试')
        }
    })

})



