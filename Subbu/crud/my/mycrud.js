//document.getElementById("tableId").hidden = true;
//document.getElementById("formid").hidden = false;

var selectedRow = null
let countrystate={
    "India":{
        "Andhra Pradesh":["Guntur","Krishna","Karnul","Kadapa"],
        "Telangana":["Nirmal","Adilabad","Nizmabad"],
    },
    "srilanka":{
        "Colombo":[ 'Kandy','Ratnapura'],
        "kjhsdh":['Anuradhapura','Colombo']
    }
}
window.onload=function(){
    let countrysel=document.getElementById('country');
    let statesel=document.getElementById('state');
    let citysel=document.getElementById('city');
    for(let x in countrystate){
        countrysel.options[countrysel.options.length]=new Option(x,x);
    }
    countrysel.onchange=function(){
        statesel.length=1;
        citysel.length=1;
        for(let y in countrystate[this.value]){
            statesel.options[statesel.options.length]=new Option(y,y);
        }
    }
    statesel.onchange=function(){
        citysel.length=1;
        let z=countrystate[countrysel.value][this.value];
        for(let i=0;i<z.length;i++){
            citysel.options[citysel.options.length]=new Option(z[i],z[i])
        }
    }
}

function onFormSubmit() {
  
    var name = document.getElementsByTagName("input")[0].value;
     var nameTest = name.search(/[a-zA-Z]/g);
   if (nameTest == -1||name == ""){
    document.getElementById("errorName").innerHTML="Please enter your Name in this field."
    return false;
   }
   else{
    errorName=true;
     document.getElementById("errorName").innerHTML = "";
    document.getElementById("errorName").style.color="red"
    
   }
   const indiaRegex1 = /^[A-Za-z._0-9]{3,20}@[a-z]{3,10}[.]{1}[a-z.]{3,5}$/;
   const inputText1 = document.getElementsByTagName("input")[1].value;
   if(inputText1.match(indiaRegex1)) {
    errorName=true;
    
     document.getElementById("errorEmail").innerHTML = "";
     document.getElementById("errorEmail").style.color="red"
        
   } else {
    document.getElementById("errorEmail").innerHTML="Please Enter valid Email Address"; 
    return false;
   }

    const indiaRegex = /^\+91\d{10}$/;
     const inputText = document.getElementsByTagName("input")[3].value;
      if(inputText.match(indiaRegex)) {
      errorName=true;
	 
         document.getElementById("errorPhone").innerHTML = "";
         document.getElementById("errorPhone").style.color="red"
            
       } else {
        document.getElementById("errorPhone").innerHTML="please Enter valid Phone Number"; 
        return false;
       }

    // if ( mail == "") {
    //     document.getElementById("errorEmail").innerHTML = "please select your email";
    //     return false;
    //   }

    // const indiaRegex2 =/https?:\/\/(a-z\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*$/; 
    //  const inputText2 = document.getElementsByTagName("input")[7].value;
    //   if(inputText2.match(indiaRegex2)) {
    //   errorName=true;
	 
    //      document.getElementById("errorWebUrl").innerHTML = "";
    //      document.getElementById("errorWebUrl").style.color="red"
            
    //    } else {
    //     document.getElementById("errorWebUrl").innerHTML="please Enter Valid Web Url"; 
    //     return false;
    //    }
    let url=document.getElementById("web").value;
    let urlRegex = /https?:\/\/(a-z\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*$/; 
    if (url.match(urlRegex)) {
    document.getElementById("errorWebUrl").innerHTML = "";
  }
  else if(url==""){
    document.getElementById("errorWebUrl").innerHTML = "pls provide url";
  }
  else {
    document.getElementById("errorWebUrl").innerHTML = "Url is not valid";
    return false;
  }
    

    if (validate()) {
        document.getElementById("tableId").hidden = false;
        document.getElementById("formid").hidden = true;
   
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
       
            updateRecord(formData);
        resetForm();
    }

   
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["email"] = document.getElementById("email").value;
    formData["dob"] = document.getElementById("dob").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["country"] = document.getElementById("country").value;
    formData["state"] = document.getElementById("state").value;
    formData["city"] = document.getElementById("city").value;
    formData["web"] = document.getElementById("web").value;
    
    return formData;
}

function insertNewRecord(data) {
    
   
    var table = document.getElementById("tableId").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    age = document.getElementById("dob").value;
    let years = new Date(new Date() - new Date(age)).getFullYear() - 1970;
    
    cell1 = newRow.insertCell(0);
    cell1.innerHTML =data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML =years;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.phone;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.country;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.state;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.city;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.web;
    
    cell9 = newRow.insertCell(8);
    cell9.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("country").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    document.getElementById("web").value = "";
    
    selectedRow = null;
}

function onEdit(td) {
    document.getElementById("formid").hidden = false;
    document.getElementById("tableId").hidden = true;
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("dob").value = selectedRow.cells[2].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[3].innerHTML;
    document.getElementById("country").value = selectedRow.cells[4].innerHTML;
    document.getElementById("state").value = selectedRow.cells[5].innerHTML;
    document.getElementById("city").value = selectedRow.cells[6].innerHTML;
    document.getElementById("web").value = selectedRow.cells[7].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.dob;
    selectedRow.cells[3].innerHTML = formData.phone;
    selectedRow.cells[4].innerHTML = formData.country;
    selectedRow.cells[5].innerHTML = formData.state;
    selectedRow.cells[6].innerHTML = formData.city;
    selectedRow.cells[7].innerHTML = formData.web;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("tableId").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
   
    return isValid;
}