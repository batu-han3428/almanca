var turkceCumleler = [
    "Merhaba",
    "İyi Sabahlar",
    "İyi Günler",
    "İyi Akşamlar",
    "İyi Geceler",
    "Tekrar Görüşmek Üzere(Yüz yüze)",
    "Tekrar Görüşmek Üzere(Tel.)",
    "Yakında Görüşürüz",
    "Güle Güle"
    ];
var almancaCumleler = [
    "hallo",
    "guten morgen",
    "guten tag",
    "guten abend",
    "gute nacht",
    "auf wiedersehen",
    "auf wiederhögen",
    "bis bald",
    "tschüss"
]

var sayilar = [];
var healt = 3;
var dogru=0;


const getQuestion = () =>{

    document.getElementById('can').textContent=healt;
    
    let rastgele = Math.floor(Math.random()*turkceCumleler.length);
  
    if(sayilar.indexOf(rastgele) === -1){
        sayilar.push(rastgele)
        document.getElementById('soru').textContent = turkceCumleler[rastgele];
        document.getElementById('cevap').value = ""
    }else if(sayilar.length === turkceCumleler.length){
        showResults();
    }else{
        getQuestion();
    }  
}

const showResults = () =>{
    document.getElementById('durum').style.fontWeight='600';
    if(healt === 0){
        document.getElementById('nextStage').style.display = 'none'; 
        document.getElementById('durum').textContent=`Üzgünüm. Kendini geliştirmen gerekiyor..`;
        document.getElementById('durum').style.color = 'red';
    }else{
        
        if(healt===3)
            dogru=9
        else if(healt===2)
            dogru=8
        else
            dogru=7
        document.getElementById('tryAgain').style.display = 'none'; 
        document.getElementById('durum').textContent=`Tebrikler. Doğru sayısı: ${dogru}`;
        document.getElementById('durum').style.color = 'green';
    }
    $("#modalSonuc").modal("show");
}

const compareQuestionAnswer = () =>{
    
    if(document.getElementById('cevap').value === ''){
        Swal.fire({
            title: 'Bu alan boş geçilemez..',
            icon: 'info',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Tamam',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            allowOutsideClick: false,
            backdrop: `
                rgba(38, 38, 38,0.6)
            `
          })
    }else{
        let deger = almancaCumleler.indexOf(document.getElementById('cevap').value.toLowerCase());
        
        if(deger === -1){
            healt--;
            document.getElementById('can').textContent=healt;
            if(healt === 0){
                document.getElementById('anaCan').style.color='red';
                document.getElementById('ok').disabled = true;
                showResults();
            }
        }else{
            let deger1 = turkceCumleler.indexOf(document.getElementById('soru').textContent);
            
            if(deger === deger1){
                getQuestion();
            }else{
                healt--;
                document.getElementById('can').textContent=healt;
                if(healt === 0){
                    document.getElementById('anaCan').style.color='red';
                    document.getElementById('ok').disabled = true;
                    showResults();
                }
            }
        }
    }
    
}

const callStageTwo = () =>{
    $("#modalSonuc").modal("hide");
    $.ajax({
        type: 'GET',   
        url: "twoStage.html",
        success: function(data){              
            $('#contentDiv').html(data);
            $('#indexScript').append('<script src="twoStage.js" />');
            $('#indexCssLink').append('<link rel="stylesheet" href="twoStage.css" type="text/css">');
        },
        error: function(data){           
          console.log("Hata:"+data);
        }       
    })
}

window.onload = getQuestion;
document.getElementById('ok').addEventListener('click',compareQuestionAnswer);
document.getElementById('anaCan').style.color='green';
document.getElementById('exit').addEventListener('click',function(){window.close()});
document.getElementById('tryAgain').addEventListener('click',function(){window.location.reload()});
document.getElementById('nextStage').addEventListener('click',callStageTwo);
document.getElementById('eye').style.display='none';