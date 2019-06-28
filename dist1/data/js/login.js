var loginusername = document.getElementById("login-username");
var loginpassword = document.getElementById("login-password");
var zhuce = document.getElementsByClassName("zhuce-a")[0];

zhuce.onclick = function() {
	$.post("http://47.104.244.134:8080/userlogin.do", {
		name: loginusername.value,
		password: loginpassword.value
	}).done(res => {
		console.log(res.data.token);

		if(res.code == 0) {
			alert("登录成功")
		 	localStorage.setItem("tok",res.data.token);
			
			location.href = "index.html";
		} else {
			alert("用户名或密码错误");
		}

	})
}



