//初始化滚动效果
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
//轮播图效果

$(function() {
    FastClick.attach(document.body);
});
var tools = {
    //获取地址栏中所有的参数
    getParamObj: function () {
        var obj = {};
        var search = location.search;
        search = search.slice(1);
        var arr = search.split("&");
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i].split("=")[0];
            var value = decodeURI(arr[i].split("=")[1]);
            obj[key] = value;
        }
        return obj;
    },
    getParam:function (key) {
        return this.getParamObj()[key];
    },
    checkLogin:function (data) {
        if(data.error == 400){
            location.href = "login.html?retUrl="+location.href;
        }
    }
}
//var url = "192.168.2.198:8080"
var url = 'http://q359221680.xicp.net';

$('body').on('click','.site_city',function () {
    var index = layer.open({
        type: 1
        ,index:2
        ,content: "<div id='target' data-toggle='distpicker' style='display:flex; justify-content: space-between'>" +
        "<div style='display: flex;'>" +
        '<select data-province="选择省" class="province"></select>' +
        '<select data-city="选择市" class="city"></select>' +
        '<select data-district="选择区" class="area"></select>' +
        "</div>" +
        "<div style='width: 50px;'>" +
        '<span class="site_true" >确定</span>' +
        "</div>" +
        '</div>'
        ,anim: 'up'
        ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 400px; padding:10px 0; border:none;'
        ,success: function(e){
            $("#target").distpicker('reset', true);
            $('#target').on('change',function () {
                cityval = $('.city').val();
                province = $('.province').val();
                area = $('.area').val();
                $('.site_city').val(cityval+' '+province+' '+area);
            })
            $('.site_true').on('click', function () {
                layer.close(index);
            })
        }
    });
})
