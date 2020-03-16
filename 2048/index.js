
  document.onkeydown = function (event) {  // 方向键控制元素移动函数
    var left,right,top,bottom
    var event = event || window.event;  // 标准化事件对象
    switch (event.keyCode) {  // 获取当前按下键盘键的编码
      case 37:  // 左箭头键
        run([0,1,2,3])
        run([4,5,6,7])
        run([8,9,10,11])
        run([12,13,14,15])
        left = getGoal()
        break;
      case 39:  // 右箭头键
        run([3,2,1,0])
        run([7,6,5,4])
        run([11,10,9,8])
        run([15,14,13,12])
        right = getGoal()
        break;
      case 38:  // 上箭头键
        run([0,4,8,12])
        run([1,5,9,13])
        run([2,6,10,14])
        run([3,7,11,15])
        top = getGoal()
        break;
      case 40:  // 下箭头键
        run([12,8,4,0])
        run([13,9,5,1])
        run([14,10,6,2])
        run([15,11,7,3])
        bottom = getGoal()
        break;
    }
    getRandom();
    // if(left == right && top == bottom){
    //   alert('游戏失败')
    // }
    if(left>2048 || right>2048 || top>2048 || bottom>2048 ){
      alert('游戏成功')
    }
  }
//dom获得页面所有的img标签
var oDiv = document.getElementsByClassName('game')[0];
var aImg = oDiv.querySelectorAll('img');
var oP;
//核心代码-数据驱动
function _2048 (arr) {
  oP = document.getElementsByTagName('p')[0];
  let oText = Number(oP.innerText);
  let newGoal = 0;
  let newArr = [];
  for(var i = 0; i<arr.length; i++) {
    if(arr[i] != 0){
      for(var j = i+1; j<arr.length; j++){
        if(arr[j] != 0) {
          break;
        }
      }
      if(arr[i]!= arr[j]){
        newArr.push(arr[i]);
      }else{
        newArr.push(arr[i]+arr[j]);
        i=j;
        newGoal = Number(arr[i]+arr[j]);
        oP.innerText = oText + newGoal;
      }
    }
  }

 for(var i = 0; i<arr.length; i++){
   if(!newArr[i]){
     newArr[i] = 0
   }
 }

  return newArr
}
//按四个方向键
function run(arr){
  let newValue = _2048([
    Number(aImg[arr[0]].getAttribute('value')),
    Number(aImg[arr[1]].getAttribute('value')),
    Number(aImg[arr[2]].getAttribute('value')),
    Number(aImg[arr[3]].getAttribute('value'))
  ])

  for(var i = 0; i<arr.length; i++){
    aImg[arr[i]].setAttribute('value', newValue[i]);
    aImg[arr[i]].src = `./img/cube_${newValue[i]}.png`;
  }
}
//随机产生不同位置的数字
getRandom();
function getRandom (){
  let val= Math.floor( Math.random()*aImg.length);
  let flag = [...aImg].every(item=>{
    return item.getAttribute('value')!= 0
  })
  if(flag){return}
  if(aImg[val].getAttribute('value')!= 0){
    getRandom();
  } else{
    aImg[val].setAttribute('value', 2);
    aImg[val].src = `./img/cube_2.png`;
  }
}

//得到分数
function getGoal(){
  oP = document.getElementsByTagName('p')[0];
  return Number(oP.innerText)
}
