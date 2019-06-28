$(function () {
    

			var tok = localStorage.getItem("tok")
    //请求购物车列表
    $.get('http://47.104.244.134:8080/cartlist.do', { token:tok })
        .done(data => {
            console.log(data.count)
            let html = '';
            data.forEach(p1 => {
                console.log(data)
                console.log(p1.id)
                let gid =p1.id
                console.log(gid)
                let p = p1.goods
                console.log(p.id)
                console.log(p1.id)
               

                html += `
                <li style="height:150px;width:1140px;display: flex;align-items: center;justify-content: space-around;border-bottom:3px solid #ccc;">
        
                        <input style="width: 86px;height:13px;" type="checkbox" name="" id="" class="ck">
                        <img style="width:100px;height:100px" src="${p.picurl}" alt="">
                        <p style="width: 100px;text-align: center">${p.name}</p>
        
                        <p class="qq" style="width: 100px;text-align: center">${p.price}</p>
                        <div>
                        <input style="width:30px;height:30px;" data-id="${gid}" id="${p.id}"
                            type="button" value='-' class="sub">
                        <input style="width:70px;height:30px;" type="text"
                            value="${p1.count}" class="pnum">
                        <input style="width:30px;height:30px;" data-id="${gid}" id="${p.id}"
                            type="button" value='+' class="add">
                            </div>
                            <span class="sp" style="width:30px;height:30px;">
        
                            ${(p1.count) * (p.price)}
                        </span>
        
                        <input style="width:30px;height:30px;" data-id="${gid}" id="${p.id}"
                            type="button" value='删除' class="dd">
                    </li>
                
                `
            });

            let list = document.querySelector('.list')
            list.innerHTML = html


            //删除按钮的点击事件 添加的商品可能有多个，有多个列表先遍历一下下, 在连接接口刷新数据 取得用户 id 商品ID 
            let url = new URL(location.href)

            let dbtn = document.querySelectorAll('.dd')
            console.log(dbtn)
            for (let i = 0; i < dbtn.length; i++) {
                console.log(1234)
                dbtn[i].onclick = function () {
                    let id = parseInt(this.getAttribute('data-id'))
                    let gid =parseInt(this.getAttribute('id'))
                    console.log(gid)
                    console.log(id)
                    $.get('http://47.104.244.134:8080/cartupdate.do', { id:id,gid:gid,num: 0, token:tok}).done(data => {
                        console.log(id)
                        console.log(data)
                        this.parentNode.remove()
//                      data = data.filter(v => v.pid != pid)
//                      data.splice(i,1)
                        count()
                    })

                }
            }


            //加减按钮的操作

            let sub = document.querySelectorAll('.sub')
            let add = document.querySelectorAll('.add')
            for (let i = 0; i < sub.length; i++) {
                sub[i].onclick = function () {
                    let pnumIpt = this.parentNode.querySelector('.pnum')
                    a = 1
                    console.log(a)
                    if (pnumIpt.value == 1) {
                        return;
                    }
                    pnumIpt.value = parseInt(pnumIpt.value) - 1;
                   

                    data[i].pnum = pnumIpt.value
                    let pnum = pnumIpt.value
                    let id = parseInt(this.getAttribute('data-id'))
                    let gid =parseInt(this.getAttribute('id'))
                    console.log(gid)
                    console.log(id)
                    $.get('http://47.104.244.134:8080/cartupdate.do', { id:id,gid:gid,num: -1, token:tok}).done(data => {
                        console.log(id)
                        console.log(data)
                        
//                      data = data.filter(v => v.pid != pid)
//                      data.splice(i,1)
                        count()
                    })
                }
            }
            //'+'按钮操作
            for (let i = 0; i < add.length; i++) {
                add[i].onclick = function () {
                    let pnumIpt = this.parentNode.querySelector('.pnum')
                    // if (pnumIpt == 1) {
                    //     return;
                    // }
                    pnumIpt.value = parseInt(pnumIpt.value) + 1;
                    console.log(pnumIpt.value)
                    // 更新购物车商品  接口参数：
                    //   uid  用户id
                    //   pid  商品id
                    //   pnum  要添加的商品数量 
                    a = 1
                    console.log(a)

                    data[i].pnum = pnumIpt.value
                    let pnum = pnumIpt.value
                    let id = parseInt(this.getAttribute('data-id'))
                    let gid =parseInt(this.getAttribute('id'))
                    console.log(gid)
                    console.log(id)
                    $.get('http://47.104.244.134:8080/cartupdate.do', { id:id,gid:gid,num: 1, token:tok}).done(data => {
                        console.log(id)
                        console.log(data)
                        
//                      data = data.filter(v => v.pid != pid)
//                      data.splice(i,1)
                        count()
                    })
                    console.log(pnum)

                    count()
//                  location.href = 'cart.html'
                }
            }






            //单选按钮的控制，总价的计算

           	let cks = document.querySelectorAll('.ck')
            for (let i = 0; i < cks.length; i++) {
                cks[i].onclick = function () {
                    console.log(this.checked)

                    let arr = [...cks];
                    let flag = arr.every(v => {
                        return v.checked == true;
                    })
                    if (flag == true) {
                        allSel.checked = true
                    } else {
                        allSel.checked = false

                    }

                    count()







                }
            }












        })

    let allSel = document.querySelector('#all-select')
    // console.log(cks)

    allSel.onclick = function () {
        let cks = document.querySelectorAll('.ck')

        console.log(this.checked)

        console.log(cks)
        for (let i = 0; i < cks.length; i++) {
            if (this.checked) {
                cks[i].checked = true;
            } else {
                cks[i].checked = false;
            }

        }
        count()




    }

    function count() {
        let countNum = 0;
        let countPirce = 0;

        let cks = document.querySelectorAll('.ck')
        console.log(cks)
        for (let i = 0; i < cks.length; i++) {
            let ck = cks[i]
            console.log(ck)
            console.log(ck.checked)
            if (ck.checked) {
                //ck 对应的这一行  商品
                // console.log(i)
                // console.log(data[i])
                let p = data[i]

                //单价和  数量 都从页面取
                // 
                let btnn = document.querySelector('.btnn')
                console.log(btnn)
                console.log(222)
                btnn.onclick = function () {
                    location.href = 'https://mall.sogou.com/goods/order/134053868899139584'

                }
                countNum += parseInt(p.pnum)
                console.log(parseInt(p.pnum))
                countPirce += parseInt(p.pnum) * parseFloat(p.pprice);
                console.log(countPirce)
            }
        }

        console.log(countNum, countPirce)
        let countNumSpan = document.querySelector('.count-num')
        let countPriceSpan = document.querySelector('.count-price')
        countNumSpan.innerHTML = countNum;
        console.log(countNumSpan)
        countPriceSpan.innerHTML = countPirce
        console.log(countNumSpan.innerHTML)

    }



})

