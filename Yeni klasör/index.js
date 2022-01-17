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

var dogrular1 = [];
var yanlislar1 = [];
var sayilar = [];
var healt = 3;
var dogru = 0;
var yanlis1 = 0;
var ayniSoruYanlis = 0;

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

            if(ayniSoruYanlis === 1){
                dogru = 8
                yanlis1 = 1
            }else{
                dogru = 7
                yanlis1 = 2
            }
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

            let kontrol1 = false;
            yanlislar1.forEach(element => {
                let veri1 = element.split("-");

                if(veri1[0] === document.getElementById('soru').textContent){
                    kontrol1 = true;
                }
                
            });

            if(!kontrol1){
                yanlislar1.push(document.getElementById('soru').textContent+"-"+document.getElementById('cevap').value);
            }
            if(healt === 0){
                document.getElementById('anaCan').style.color='red';
                document.getElementById('ok').disabled = true;
                showResults();
            }
        }else{
            let deger1 = turkceCumleler.indexOf(document.getElementById('soru').textContent);
            let kontrol = false;
            if(deger === deger1){
                yanlislar1.forEach(element => {
                    let veri = element.split("-");

                    if(veri[0] === document.getElementById('soru').textContent){
                        kontrol = true;
                        ayniSoruYanlis++;
                    }
                    
                });

                if(!kontrol){
                    dogrular1.push(document.getElementById('soru').textContent+"-"+document.getElementById('cevap').value);
                }     
                 getQuestion();         
            }else{
                healt--;
                document.getElementById('can').textContent=healt;

                let kontrol2 = false;
                yanlislar1.forEach(element => {
                    let veri1 = element.split("-");

                    if(veri1[0] === document.getElementById('soru').textContent){
                        kontrol2 = true;
                    }
                
                });
                if(!kontrol2){
                    yanlislar1.push(document.getElementById('soru').textContent+"-"+document.getElementById('cevap').value);
                }
                   
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

    document.getElementById('contentDiv').className='col-md-12 pb-5';

    let anaHtml = `<div style='padding-top:40px;'>`;

    anaHtml +=`
        <h5 class='display-5' style='margin-bottom:5vh; background: -webkit-linear-gradient(#333, rgb(102, 226, 118) 60%, #333);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;'>Doğrular:${dogrular1.length+dogrular2.length}
        </h5>
    `;

    let altHtml = `<div id="confirms" style='overflow-y: scroll; max-height: 70vh; display:flex; flex-wrap:wrap;  text-align:center; width:80%; 
    font-family:Century Gothic;  
   '>`;

    if(dogrular1.length !== 0){

        altHtml+=`<h5 class='display-6' style='width:100%; text-align:center; background: -webkit-linear-gradient(#333, rgb(102, 226, 118) 60%, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;'>1. Aşama</h5>`;

        for (let index = 0; index < dogrular1.length; index++) {
        
            let o =  dogrular1[index].split("-");           

            altHtml+=` 
                <div class='w-50 p-3 border' style='font-size:1.3rem; background: -webkit-linear-gradient(#333, rgb(102, 226, 118) 60%, #333);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent; '>${o[0]}</div>
                        <div class='w-50 p-3 border' style='font-size:1.3rem;
                background: -webkit-linear-gradient(#333, rgb(102, 226, 118) 60%, #333);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent; '>${o[1]}</div>
            `;
            
        }
        
        altHtml+=`<div class='w-100 mb-5'></div>`;
    }

    
    if(dogrular2.length !== 0){

        altHtml+=`<h5 class='display-6' style='width:100%; text-align:center; background: -webkit-linear-gradient(#333, rgb(102, 226, 118) 60%, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;'>2. Aşama</h5>`;

        for (let index = 0; index < dogrular2.length; index++) {
            
            let o =  dogrular2[index].split("-");        
        
            altHtml+=` 
                <div class='w-50 p-3 border' style='font-size:1.3rem; background: -webkit-linear-gradient(#333, rgb(102, 226, 118) 60%, #333);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent; '>${o[0]}</div>
                            <div class='w-50 p-3 border' style='font-size:1.3rem;
                background: -webkit-linear-gradient(#333, rgb(102, 226, 118) 60%, #333);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent; '>${o[1]}</div>
            `;
        
        }
    }
  

    altHtml += `</div>`;
    anaHtml+=altHtml;


    anaHtml +=`<h5 class='display-5 mt-5' style='margin-bottom:5vh; background: -webkit-linear-gradient(#333, rgb(239, 31, 31) 60%, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;'>Yanlışlar:${yanlislar1.length+yanlislar2.length}</h5>
    `;

    let altHtml1 = `<div id="wrongs" style='overflow-y: scroll; max-height: 70vh; display:flex; flex-wrap:wrap;  text-align:center; width:80%; 
    font-family:Century Gothic;  
    '>`
    ;

    if(yanlislar1.length !== 0){

        altHtml1+=`<h5 class='display-6' style='width:100%; text-align:center; background: -webkit-linear-gradient(#333, rgb(239, 31, 31) 60%, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;'>1. Aşama</h5>`;


        for (let index = 0; index < yanlislar1.length; index++) {
                
            let o =  yanlislar1[index].split("-");

            altHtml1+=` 
                <div class='w-50 p-3 border' style='font-size:1.3rem; background: -webkit-linear-gradient(#333, rgb(239, 31, 31) 60%, #333);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent; '>${o[0]}</div>
                            <div class='w-50 p-3 border' style='font-size:1.3rem;
                background: -webkit-linear-gradient(#333, rgb(239, 31, 31) 60%, #333);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent; '>${o[1]}</div>
            `;
            
        }

        altHtml1+=`<div class='w-100 mb-5'></div>`;
    }


    if(yanlislar2.length !== 0){

        altHtml1+=`<h5 class='display-6' style='width:100%; text-align:center; background: -webkit-linear-gradient(#333, rgb(239, 31, 31) 60%, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;'>2. Aşama</h5>`;


        for (let index = 0; index < yanlislar2.length; index++) {
            
            let o =  yanlislar2[index].split("-");

            altHtml1+=` 
                <div class='w-50 p-3 border' style='font-size:1.3rem; background: -webkit-linear-gradient(#333, rgb(239, 31, 31) 60%, #333);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent; '>${o[0]}</div>
                            <div class='w-50 p-3 border' style='font-size:1.3rem;
                background: -webkit-linear-gradient(#333, rgb(239, 31, 31) 60%, #333);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent; '>${o[1]}</div>
            `;

        }
    }



    altHtml1 += `</div>`;
    anaHtml+=altHtml1;
    anaHtml+=` </div>`;

    $('#indexCssLink').append('<link rel="stylesheet" href="results.css" type="text/css">');
    $('#contentDiv').html(anaHtml);
})