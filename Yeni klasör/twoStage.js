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
    "ich komme aus der türkie",
    "wo wohnst du?",
    "ich wohne in istanbul",
    "wo lebst du?",
    "ich lebe in der türkie"
];

var answers = [];
var dogru2 = 0;
var yanlis = 0;
const compareQuestionAnswerTwoStage = () =>{
    let bos=false;
    answers = [];
    document.querySelectorAll('#twoStageCard input').forEach((a)=>{
        if(a.value === ""){
            a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-danger'
            bos = true;
        }else{
            a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-primary'
            answers.push(a.value.toLowerCase());
        }
    })
    if(bos === false){    
        answers.forEach((r)=>{
            if(almancaCumlelerTwoStage.indexOf(r)!==-1)
            {            
                if(r === almancaCumlelerTwoStage[answers.indexOf(r)]){         
                    dogru++;
                    dogru2++;
                    // document.querySelectorAll('#twoStageCard input').forEach((a)=>{
                    //     if(a.value.toLowerCase() === r){
                    //         a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-danger'                           
                    //     }else{
                    //         a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-primary'  
                    //     }
                    // })      
                }else{
                    yanlis++;      
                    document.querySelectorAll('#twoStageCard input').forEach((a)=>{
                        if(a.value.toLowerCase() === r){
                            a.parentElement.previousElementSibling.firstElementChild.className = 'card-text text-danger'                           
                        }
                    })                                
                }    
            }        
        })
        

        showResultsTwoStage();
    }
} 

const showResultsTwoStage = () =>{
    document.getElementById('durum').style.fontWeight='600';
    document.getElementById('nextStage').style.display = 'none'; 
    document.getElementById('tryAgain').style.display = 'none';
    document.getElementById('eye').style.display='block'; 
    document.getElementById('durum').style.color = 'green';
    document.getElementById('durum').textContent=`Genel Doğru Sayısı ${dogru}`;
    $('#durum').append(`<p style='color=green'>Doğru sayısı: ${dogru2}</p>`);
    if(yanlis !==0){
        $('#durum').append(`<p style='color=red'>Yanlış sayısı: ${yanlis}</p>`);
    }

    $("#modalSonuc").modal("show");
}

document.getElementById('twoStageOk').addEventListener('click',compareQuestionAnswerTwoStage)