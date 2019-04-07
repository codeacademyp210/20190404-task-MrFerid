let cars = [];

function Car(id,manifac,model,year){
    this.id = id,
    this.manifac = manifac,
    this.model = model,
    this.year = year
}

let id = 0;

function init(){

    window.alerts = document.querySelector('.alerts');
    window.onlyTextRegex = /^[A-Za-z]+$/;
    window.yearRegex = /[\d]{4}/;

}

function send(event){
    event.preventDefault();
    alerts.innerHTML = "";

    let manifac = document.forms['carRegister']['Manifacturer'];
    let model = document.forms['carRegister']['Model'];
    let year = document.forms['carRegister']['Year'];
    let Elementid = document.forms['carRegister']['id'];

    if( validation(manifac.value,model.value,year.value)){
        if(Elementid.value == ""){
                id++;
                let newCar = new Car(id,manifac.value,model.value,year.value);
                cars.push(newCar);
                localStorage.setItem('manifac'+id,manifac.value);
                localStorage.setItem('model'+id,manifac.value);
                localStorage.setItem('year'+id,manifac.value);
                localStorage.setItem('id'+id,id);
        }
        else{
            for(let i=0; i< cars.length; i++){
                if(cars[i].id == Elementid.value){
                    cars[i].manifac = manifac.value;
                    cars[i].model = model.value;
                    cars[i].year = year.value;
                }
            }
        }

        reset(manifac,model,year,Elementid);
        drawList();
    }

   
} 

// editing inputs
function edit(event){

    let elementID = event.target.id -1;

    document.forms['carRegister']['Manifacturer'].value = cars[elementID].manifac;
    document.forms['carRegister']['Model'].value = cars[elementID].model;
    document.forms['carRegister']['Year'].value = cars[elementID].year;
    document.forms['carRegister']['id'].value = elementID + 1;
}

// removing elements

function remove(event){
    let id = event.target.parentElement.id;
    alerts.innerHTML = "";

            for(let i=0; i< cars.length; i++){
                if(cars[i].id == id){
                    
                        cars.splice(i,1);
                        greenWarning(' id nömrəsi '+ id +' olan istifadəçi silindi! ');
                        break;
                }
            }

        drawList();
}


// --- drawing list to body
function drawList(){
    let ul = document.querySelector('.list-group');
    let li = '';
    

    for(let i=0; i< cars.length; i++){
       let localId = i+1;

       li += '<li onclick="edit(event)" id="'+ localStorage.getItem('id'+localId) +'" class="list-group-item d-flex justify-content-between">' + localStorage.getItem('id'+localId) + '. '+
         localStorage.getItem('manifac'+localId) + ' ' + localStorage.getItem('model'+localId) + ' - ' + localStorage.getItem('year'+ localId) + ' <i onclick="remove(event)" class="fas fa-trash-alt text-danger"></i>';
    }

    ul.innerHTML = li;
}

// --- Resetting inputs
function reset(){
    for(let i=0; i< arguments.length; i++){
        arguments[i].value = "";
    }
}



// checking form validation
function validation(manifac,model,year){

    manifac = manifac.trim();
    model = model.trim();
    year = year.trim();
    let valid = 0;

        if(manifac =="" && model=="" && year == ""){
                    redWarning('Axtardığınız modeli yazın :) ');
        }
        else{
            valid++;
            
                if(manifac =="" || model=="" || year==""){
                    redWarning('Formda boş xana buraxmısız ! ');
                }
                else{
                    valid++;
                }
                if(!onlyTextRegex.test(manifac) && manifac != "" && model != "" || !onlyTextRegex.test(model) && model != "" && manifac != ""){
                    redWarning('Manifaktura model xanalarina yalniz text yazin');
                }
                else{
                    valid++;
                }
                if(!yearRegex.test(year) && year != ""){

                    redWarning('Maşın ilini düz yazmadınız');
                }
                else{
                    valid++;
                }
         }   

         if(valid == 4){
            return true;
         }
         else{
             return false;
         }
}






// ------- warnings
function redWarning(text){

    let wr =  '<div class="alert alert-danger"> <button type="button" class="close" data-dismiss="alert">&times;</button><strong>'+ text +'</strong></div>';
    alerts.innerHTML += wr;
}

function greenWarning(text){
    let wr =  '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert">&times;</button><strong>'+ text +'</strong></div>';
    alerts.innerHTML += wr;
}