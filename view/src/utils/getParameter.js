/**
 * 
 */
/*
 * 1.name：需要获取的url中?传参的参数名,string格式；
 * 2.返回的值统一为字符串格式，若需要int，则需要自己手动转换，parseInt();
 * 读取url中的参数
 * name为空返回包含所有数据的data 类型obj
 * name为string 返回 对应的数据*/
export default function getParameter (name) {
  let hash = (window.location || location).href;
  let searchNum = hash.indexOf('?');
  let search = '';
  let dataObj = {};
  if(searchNum != -1){
    searchNum = searchNum + 1;
    search = hash.substring(searchNum) || '';
    let arr = search.split('&');
    let length = arr.length;
    for(let i = 0; i < length; i++){
      let num = arr[i].indexOf('=');
      let data_name;
      let data_value;
      if(num != -1){
        data_name = arr[i].substring(0,num);
        //get中传递的是obj 直接转换 其他原样给
        try{
          data_value = JSON.parse(decodeURIComponent(arr[i].substring(num + 1)));
        }
        catch (err){
          data_value = decodeURIComponent(arr[i].substring(num + 1));
        }
        if(!dataObj[data_name]){
          dataObj[data_name] = data_value;
        }else{
          let arr = [];
          arr.push(dataObj[data_name]);
          arr.push(data_value);
          dataObj[data_name] = arr;
        }
      }
    }
  }
  if(name){
    return dataObj[name] === undefined ? '' : dataObj[name];
  }else{
    return dataObj;
  }
}
