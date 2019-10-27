function indexInfo(){
  let arr = [];
  for(let i=0; i < 10 ; i++){
    arr.push(
      {
        name: '철수' + i,
        age: Math.floor(Math.random() * (5 + i)),
      }
    )
  }
  return arr;
}

function listPage(category){
  if(category === 'movie'){
    let list =[];
    for(var i = 0 ; i < 30 ; i++){
      let type;
      if(i % 3 ==0){
        type = 'comic'
      }else if( i % 3 == 1){
        type = 'romance'
      }else if (i %3  == 2){
        type = 'action'
      }
      list.push({
        title: `test${i}`,
        subTitle: `subtest${i}`,
        genre:type,
        //추천영화
        categorySeq : 1
      });
    }
    // console.log(list);
    return {
      list:list
    };
  }
  if(category === 'concert'){
    return {

    };
  }
  if(category === 'expo'){
    return {

    };
  }
}

exports.listPage  = listPage;
exports.indexInfo = indexInfo;
