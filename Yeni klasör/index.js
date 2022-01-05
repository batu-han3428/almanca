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
];

var tumDogrular = [];
var tumYanlislar = [];
var sayilar = [];
var healt = 3;
var dogru = 0;
var yanlis1 = 0;

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
        
        if(healt===3){
            dogru = 9
            yanlis1 = 0;
        }
        else if(healt===2){
            dogru = 8
            yanlis1 = 1          
        }
        else{
            dogru = 7
            yanlis1 = 2
        }
        document.getElementById('tryAgain').style.display = 'none'; 
        document.getElementById('durum').textContent=`Tebrikler. Doğru sayısı: ${dogru}`;
        document.getElementById('durum').style.color = 'green';  
        document.getElementById('durum').insertAdjacentHTML("afterend", `<p id='indexYanlis' style='color:red; font-weight:600;'>Yanlış sayısı: ${yanlis1}</p>`);    
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
            tumYanlislar.push(document.getElementById('soru').textContent+"-"+document.getElementById('cevap').value);
            if(healt === 0){
                document.getElementById('anaCan').style.color='red';
                document.getElementById('ok').disabled = true;
                showResults();
            }
        }else{
            let deger1 = turkceCumleler.indexOf(document.getElementById('soru').textContent);
            
            if(deger === deger1){
                tumDogrular.push(document.getElementById('soru').textContent+"-"+document.getElementById('cevap').value);
                getQuestion();
            }else{
                healt--;
                document.getElementById('can').textContent=healt;
                tumYanlislar.push(document.getElementById('soru').textContent+"-"+document.getElementById('cevap').value);
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
document.getElementById('eye').addEventListener('click',function(){
    $("#modalSonuc").modal("hide");
   
    document.getElementById('contentDiv').className='col-md-12';

    let anaHtml = `<div style='padding-top:40px;'>`;

    let html =`<h5 class='display-5' style='margin-bottom:10vh;'>Doğrular:</h5>`;
    let i=0;

    for (let index = 0; index < Math.ceil(tumDogrular.length/3); index++) {

            html += `
            <ol style='max-width:100%' class="list-group list-group-numbered list-group-horizontal">
        `;

        for (let index = 0; index < Math.floor(tumDogrular.length/3); index++) {
            if(i+1 <=  tumDogrular.length){
                let o =  tumDogrular[i].split("-");
                i++

                html+=` 
                    <li class="w-50 list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">${o[0]}</div>
                            ${o[1]}
                        </div>
                        <span class="badge bg-success rounded-pill"><i class="bi bi-check-lg"></i></span>
                    </li>
                `;
            }
        }

        html+=`</ol>`;
    }

    html+=`<h5 class='display-5' style='margin-bottom:10vh; margin-top:6vh;'>Yanlışlar:</h5>`;

    let b=0;

    for (let index = 0; index < Math.ceil(tumYanlislar.length/3); index++) {

            html += `
            <ol style='max-width:100%' class="list-group list-group-numbered list-group-horizontal">
        `;

        for (let index = 0; index < Math.floor(tumYanlislar.length/3); index++) {
            if(b+1 <=  tumYanlislar.length){
                let o =  tumYanlislar[b].split("-");
                b++

                html+=` 
                    <li class="w-50 list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">${o[0]}</div>
                            ${o[1]}
                        </div>
                        <span class="badge bg-danger rounded-pill"><i class="bi bi-x-lg"></i></span>
                    </li>
                `;
            }
        }

        html+=`</ol>`;
    }

    anaHtml+=html;
    anaHtml+=` </div>`;


    $('#contentDiv').html(anaHtml);
})