var almancaCumlelerTwoStage = [
    "wie heibt du?",
    "ich heibe batuhan",
    "wie ist dein name?",
    "mein name ist batuhan",
    "wer bist du?",
    "ich bin batuhan",
    "wie alt bist du?",
    "ich bin zwanzig jahre alt",
    "welcher tag ist heute?",
    "heute ist samstag",
    "woher kommst du?",
    "ich komme aus der türkei",
    "wo wohnst du?",
    "ich wohne in istanbul",
    "wo lebst du?",
    "ich lebe in der türkei"
];

var answers = [];
var dogru2 = 0;
var yanlis = 0;

const compareQuestionAnswerTwoStage = () =>{
    let bos=false;
    answers = [];
    document.querySelectorAll('#twoStageCard input').forEach((a)=>{
        if(a.value === ""){
            a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-danger';
            if(a.parentElement.previousElementSibling.firstElementChild.textContent.indexOf("*") === -1){
                a.parentElement.previousElementSibling.firstElementChild.textContent = "* "+a.parentElement.previousElementSibling.firstElementChild.textContent;
            }
           
            bos = true;
        }else{           
            a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-primary';
            if(a.parentElement.previousElementSibling.firstElementChild.textContent.indexOf("*") !== -1){
                a.parentElement.previousElementSibling.firstElementChild.textContent = a.parentElement.previousElementSibling.firstElementChild.textContent.substring(2);
            }
            answers.push(a.value.toLowerCase());
        }
    })
    if(bos === false){    
        answers.forEach((r)=>{
            if(almancaCumlelerTwoStage.indexOf(r)!==-1)
            {            
                if(r === almancaCumlelerTwoStage[answers.indexOf(r)]){                      
                    dogru2++;
                    dogru++;                   
                    document.querySelectorAll('#twoStageCard input').forEach((a)=>{        
                        if(a.value.toLowerCase() === r){
                            tumDogrular.push(a.parentElement.previousElementSibling.firstElementChild.textContent+"-"+r);
                            a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-success'  
                        }
                    })      
                }else{
                    yanlis++;   
                    yanlis1++;    
  
                    document.querySelectorAll('#twoStageCard input').forEach((a)=>{
                        if(a.value.toLowerCase() === r){
                            a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-danger'                           
                        }
                    })                                
                }    
            }else{
                yanlis++;     
                yanlis1++; 
               
                document.querySelectorAll('#twoStageCard input').forEach((a)=>{
                    if(a.value.toLowerCase() === r){                       
                        a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-danger'    
                    }                                          
                })     
            }        
        })   

        document.querySelectorAll('#twoStageCard span').forEach((a)=>{
            if(a.classList.contains('text-danger')){
                tumYanlislar.push(a.textContent+"-"+a.parentElement.nextElementSibling.firstElementChild.value);
            }         
        })
        
        showResultsTwoStage();
    }
} 

const showResultsTwoStage = () =>{
    document.getElementById('indexYanlis').remove();
    document.getElementById('durum').style.fontWeight='600';
    document.getElementById('nextStage').style.display = 'none'; 
    document.getElementById('tryAgain').style.display = 'none';
    document.getElementById('eye').style.display='block'; 
    document.getElementById('durum').style.color = 'green';
    document.getElementById('durum').textContent=`Genel Doğru Sayısı ${dogru}`;
    document.getElementById('durum').insertAdjacentHTML("afterend", `<p id='twoStageDogru' style='color:green; font-weight:600;'>Doğru sayısı: ${dogru2}</p>`);    
    document.getElementById('twoStageDogru').insertAdjacentHTML("afterend", `<p id='indexYanlisBilgisi' style='color:red; font-weight:600;'>Genel Yanlış sayısı: ${yanlis1}</p>`);
    document.getElementById('indexYanlisBilgisi').insertAdjacentHTML("afterend", `<p style='color:red; font-weight:600;'>Yanlış sayısı: ${yanlis}</p>`);    

    $("#modalSonuc").modal("show");
}

document.getElementById('twoStageOk').addEventListener('click',compareQuestionAnswerTwoStage)