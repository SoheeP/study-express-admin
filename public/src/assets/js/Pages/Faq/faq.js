let faqUploadForm = s0.elm('#faqUploadForm');
let faqUploadTitle = s0.elm('#faqUploadTitle');
let faqUploadContent = s0.elm('#faqUploadContent');
let faqUploadBtn = s0.elm("#faqUploadBtn");


if(s0.exist('#faqUploadForm')){
  faqUploadForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log('submit');
    let uploadConfig = {
      url:'/faq/upload',
      method: 'post',
      data: {
        faqUploadTitle: faqUploadTitle.value,
        faqUploadContent: faqUploadContent.value
      }
    }; 
    
    axios(uploadConfig).then(function(response){
      let { data } = response;
      if(data.result === 1){
        alert('등록되었습니다.');
        window.location.href = "/faq/list";
      } else {
        alert('오류가 발생했습니다.');
      } 
      console.log(data);
    })
  
  })
}
