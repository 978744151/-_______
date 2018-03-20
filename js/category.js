$(document).ready(function () {
    render(0)
})
function render(id){
    $.ajax({
        type:'get',
        url:url+'/api/api-bin/wjcm/entry/datalist/queryCategory.action?shopcode=10000000',
        success: function (data) {
            if(data.success == 1){
                data.id = id
                console.log(data)
                var html = template('tpl',data);
                $('.cate_content').html(html);
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005,
                    indicators:false
                });
            }
        },
        error: function(){
            mui.toast('请稍后再试')
        }
    })
}
$(".cate_content").on('click','.cate_l',function () {
    var id = $(this).data('id');
    console.log(id)
    render(id)
    $(this).addClass('now')
})
$('.search_text').on('focus', function () {
    location.href = 'search.html'
})

