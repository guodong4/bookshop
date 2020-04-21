export default async function(data){
    var result =  await $.ajax({
        url:host+data.url,
        data:data.data,
        type:data.type||"post",
    })
    return result;
}