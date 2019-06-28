$.get("http://47.104.244.134:8080/goodstypelist.do",{l:1},function(data){
var str = "";
$.each(data, function(sum) {
str+=`<li data-id="${data[sum].id}" id ="${sum}"><a href="#">${data[sum].name}</a></li>`
});
$("#navnanbar").html(str);
var sb = $("#navnav_menu").html()
$("#menuitem").find("li").mouseenter(function(){
var sl = $(this).attr("data-id")
var ss = $(this).attr("id")
//console.log(sb);
if(sl == undefined){
//console.log("aa")
$("#item123").html(sb)
return
}
$.get("http://47.104.244.134:8080/goodstypelist.do",{l:2},function(dada){
var strt ="<dl><dt><div><span>"+data[ss].name+"</span><i>></i></div></dt><dd>"
$.each(dada,function(num){
if(sl == dada[num].parentid){
strt +=` <a href="#">${dada[num].name}</a>`
}
})
strt+="</dd></dl>"
$("#item123").html(strt);
})
$("#navnav_menu").show();
})
})