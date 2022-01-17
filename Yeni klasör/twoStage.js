var almancaCumlelerTwoStage = [
    "wie heibt du",
    "ich heibe",
    "wie ist dein name",
    "mein name ist",
    "wer bist du",
    "ich bin",
    "wie alt bist du",
    "ich bin zwanzig jahre alt",
    "welcher tag ist heute",
    "heute ist samstag",
    "woher kommst du",
    "ich komme aus der türkei",
    "wo wohnst du",
    "ich wohne in istanbul",
    "wo lebst du",
    "ich lebe in der türkei"
];

var dogrular2 = [];
var yanlislar2 = [];
var answers = [];
var dogru2 = 0;
var yanlis = 0;

const compareQuestionAnswerTwoStage = () =>{
    let bos=false;
    answers = [];
    let b = 0;
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

            let cevap4 = "";

            if(b === 1){
                cevap4 = a.value.toLowerCase().substring(0,9)              
            }else if(b === 3){
                cevap4 = a.value.toLowerCase().substring(0,13)
            }else if(b === 5){
                cevap4 = a.value.toLowerCase().substring(0,7)
            }else{
                cevap4 = a.value.toLowerCase()
            }

            answers.push(cevap4);      
        }
        b++;
    })
    if(bos === false){    
        answers.forEach((r)=>{

            if(almancaCumlelerTwoStage.indexOf(r) !== -1)
            {            
                if(r === almancaCumlelerTwoStage[answers.indexOf(r)]){                      
                    dogru2++;
                    dogru++;               
                    let c = 0;    
                    document.querySelectorAll('#twoStageCard input').forEach((a)=>{        

                        let cevap2 = "";
                        
                        if(c === 1){
                            cevap2 = a.value.toLowerCase().substring(0,9)
                         }else if(c === 3){
                            cevap2 = a.value.toLowerCase().substring(0,13)
                         }else if(c === 5){
                            cevap2 = a.value.toLowerCase().substring(0,7)             
                         }else{
                            cevap2 = a.value.toLowerCase()
                         }

                         console.log("inputtan alınan cevap2 "+ cevap2)
                         console.log("Answerda ki cevap: "+r)
                        if(cevap2 === r){
                            dogrular2.push(a.parentElement.previousElementSibling.firstElementChild.textContent+"-"+a.value);
                            a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-success'  
                        }
                        c++;
                    })      
                }else{
                    yanlis++;   
                    yanlis1++;    
                    
                    let y = 0;

                    document.querySelectorAll('#twoStageCard input').forEach((a)=>{

                        let cevap3 = "";

                        if(y === 1){
                            cevap3 = a.value.toLowerCase().substring(0,9)
                         }else if(y === 3){
                            cevap3 = a.value.toLowerCase().substring(0,13)
                         }else if(y === 5){
                            cevap3 = a.value.toLowerCase().substring(0,7)             
                         }else{
                            cevap3 = a.value.toLowerCase()
                         }

                        if(cevap3 === r){
                            a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-danger'                           
                        }
                        y++;
                    })                                
                }    
            }else{
                yanlis++;     
                yanlis1++; 
               
        
                    let p = 0;
                document.querySelectorAll('#twoStageCard input').forEach((a)=>{

                    let cevap3 = "";

                    if(p === 1){
                        cevap3 = a.value.toLowerCase().substring(0,9)
                        }else if(p === 3){
                        cevap3 = a.value.toLowerCase().substring(0,13)
                        }else if(p === 5){
                        cevap3 = a.value.toLowerCase().substring(0,7)             
                        }else{
                        cevap3 = a.value.toLowerCase()
                        }

                    if(cevap3 === r){                       
                        a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-danger'    
                    }      
                    p++;                                    
                })     
            }        
        })   

        document.querySelectorAll('#twoStageCard span').forEach((a)=>{
            if(a.classList.contains('text-danger')){
                yanlislar2.push(a.textContent+"-"+a.parentElement.nextElementSibling.firstElementChild.value);
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