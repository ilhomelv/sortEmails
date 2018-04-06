
var mainBox = document.getElementById("mainBox");
var input = document.getElementById("input");
var output = document.getElementById("output");
var sortABC = document.getElementById("sortABC");
var removeInvalid = document.getElementById("removeInvalid");
var sortByCt = document.getElementById("sortByCt");

var data = [];
var allEmails = [];
var validEmails = [];
var invalidEmails = [];
var emailsNoDuplicates = [];
var ruEmails = [], usaEmails = [], ukEmails = [], unknownEmail = [], caEmails = [], auEmails = [], deEmails = [], czEmails = [], dkEmails = [], frEmails = [], orgEmails = [], zaEmails = [], hkEmails = [], cnEmails = [], inEmails = [], ieEmails = [];

var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


var domains = '.aero,.biz,.cat,.coop,.edu,.gov,.info,.int,.jobs,.mil,.mobi,.museum, .name,.net,.travel,.ac,.ad,.ae,.af,.ag,.ai,.al,.am,.an,.ao,.aq,.ar,.as,.at,.aw, .az,.ba,.bb,.bd,.be,.bf,.bg,.bh,.bi,.bj,.bm,.bn,.bo,.br,.bs,.bt,.bv,.bw,.by,.bz, .cc,.cd,.cf,.cg,.ch,.ci,.ck,.cl,.cm,.co,.cr,.cs,.cu,.cv,.cx,.cy,.dj,.dm, .do,.dz,.ec,.ee,.eg,.eh,.er,.es,.et,.eu,.fi,.fj,.fk,.fm,.fo,.ga,.gb,.gd,.ge,.gf,.gg,.gh, .gi,.gl,.gm,.gn,.gp,.gq,.gr,.gs,.gt,.gu,.gw,.gy,.hm,.hn,.hr,.ht,.hu,.id,.il,.im, .io,.iq,.ir,.is,.it,.je,.jm,.jo,.jp,.ke,.kg,.kh,.ki,.km,.kn,.kp,.kr,.kw,.ky,.kz,.la,.lb, .lc,.li,.lk,.lr,.ls,.lt,.lu,.lv,.ly,.ma,.mc,.md,.mg,.mh,.mk,.ml,.mm,.mn,.mo,.mp,.mq, .mr,.ms,.mt,.mu,.mv,.mw,.mx,.my,.mz,.na,.nc,.ne,.nf,.ng,.ni,.nl,.no,.np,.nr,.nu, .nz,.om,.pa,.pe,.pf,.pg,.ph,.pk,.pl,.pm,.pn,.pr,.ps,.pt,.pw,.py,.qa,.re,.ro,.rw, .sa,.sb,.sc,.sd,.se,.sg,.sh,.si,.sj,.sk,.sl,.sm,.sn,.so,.sr,.st,.su,.sv,.sy,.sz,.tc,.td,.tf,.tg,.th,.tj,.tk,.tm,.tn,.to,.tp,.tr,.tt,.tv,.tw,.tz,.ua,.ug,.um,.us,.uy,.uz,.va,.vc,.ve,.vg,.vi,.vn,.vu,.wf,.ws,.ye,.yt,.yu,.zm,.zr,.zw;'


//button is disables as long as textarea is empty
removeInvalid.disabled = true;

input.addEventListener("input", activateButton, false);
function activateButton(){
  if(input.value.length >0) {
    removeInvalid.disabled = false;
  }
}

//button Remove invalid emails
removeInvalid.addEventListener("click", doValidation, false);
function doValidation(e){
  if(e.target.id === "removeInvalid") {
      doRemoveInvalid();
  }
  else
  {
    //error
  }
  e.stopPropagation();
}

function doRemoveInvalid(){
  //get all data and split/ separate valid emails by comma
  data = input.value;
  var dataL = data.toLowerCase();
  console.log(dataL);
  var regexSplitter = /\r\n|\r|\n|,/;
  var allEmailsS = dataL.split(regexSplitter);
  allEmails = allEmailsS.map(e =>  e.trim() );

  //check each email with the regex pattern validation rule
  allEmails.forEach(function(email, i){
      allEmails[i] = validate(email, regex);
  });

  function validate(email, regex){
      if(regex.test(email)){
        console.log("valid: " + email);
        //push to validEmails
        validEmails.push(email);
      }
      else
      {
        console.log("invalid: " + email);
        //push to invalidEmails
        //var regexSplitter = /\r\n|\r|\n|,/;

        if(email != ''|','|'\r'|'\n')
        invalidEmails.push(email);
      }
  }
  removeDuplicates();
}

//removeDuplicateshere
function removeDuplicates(){
  var tempObj = {}, j =0;
  //we re storing key-value pair into tempObj
  //key must be unique, so each email will be saved as unique, if duplicate email found, email will be overwritten
  //we do not care about values,as we dont need them
  console.log(validEmails);
  for(var i=0; i<validEmails.length; i++){
    tempObj[validEmails[i]] = j; j++;
  }
  for(var key in tempObj) {
      emailsNoDuplicates.push(key);
  }
  console.log(emailsNoDuplicates);
  showValidInvalidOutput();
}


function showValidInvalidOutput(){
  output.style.display = "block";
  output.innerHTML = "valid emails: " + emailsNoDuplicates.length +"\n" + emailsNoDuplicates + "\n\n" + "invalid emails: \n" + invalidEmails;
  sortByCt.style.display = "inline-block";
  sortABC.style.display = "inline-block";
  removeInvalid.style.display = "none";
  input.style.display = "none";
}

//button Sort emails in alphabethical order
sortABC.addEventListener("click", doSortingABC, false);
function doSortingABC(e){
  if(e.target.id === "sortABC") {
    var sortedEmails = emailsNoDuplicates.sort();
    showSortedEmails(sortedEmails);
  }
  else
  {
    //error
  }
  e.stopPropagation();
}

function showSortedEmails(sortedEmails){
  output.style.display = "block";
  output.innerHTML = "Sorted Emails by Alphabeth order: \n" + sortedEmails;
  sortByCt.style.display = "inline-block";
  sortABC.style.display = "inline-block";
  removeInvalid.style.display = "none";
  input.style.display = "none";
}


//button Sort by Domain Extensison
sortByCt.addEventListener("click", doSortingByCt, false);
function doSortingByCt(e){
  if(e.target.id === "sortByCt") {
     separateEmailsByCountryExtension();
  }
  else
  {
    //error
  }
  e.stopPropagation();
}

function separateEmailsByCountryExtension(){

    usaEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-4) === '.com')
      return true;
    });

    ukEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.uk')
      return true;
    });

    caEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.ca')
      return true;
    });

    auEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.au')
      return true;
    });

    deEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.de')
      return true;
    });

    czEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.cz')
      return true;
    });

    dkEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.dk')
      return true;
    });

    frEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.fr')
      return true;
    });

    orgEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.org')
      return true;
    });

    zaEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.za')
      return true;
    });

    hkEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.hk')
      return true;
    });

    cnEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.cn')
      return true;
    });

    inEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.in')
      return true;
    });

    ieEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.ie')
      return true;
    });

    ruEmails = emailsNoDuplicates.filter(email=>{
      if(email.slice(-3) === '.ru')
      return true;
    });

    var domainsX = domains.split(',');
    unknownEmail = emailsNoDuplicates.filter(email=>{
      console.log(domainsX);
      if(doCheck(email.slice(-3)) === true)
      return true;
    });

    function doCheck(e){
      console.log(e);
      if(domainsX.find(el=> el===e)) return true;
    }

    var tempArr = [
      usaEmails,
      ukEmails,
      caEmails,
      auEmails,
      deEmails,
      czEmails,
      dkEmails,
      frEmails,
      orgEmails,
      zaEmails,
      hkEmails,
      cnEmails,
      inEmails,
      ieEmails,
      ruEmails,
      unknownEmail
    ];

    showSortedEmailsByCt(tempArr);
}

function showSortedEmailsByCt(tempArr){
  output.style.display = "block";
  output.innerHTML = "Sorted Emails by Domain Extension: \n" + viewArray(tempArr);
  console.log(tempArr);
  sortByCt.style.display = "inline-block";
  sortABC.style.display = "inline-block";
  removeInvalid.style.display = "none";
  input.style.display = "none";
}

function viewArray(arr){
    var arrX = arr.filter(e => e != '')
    return arrX;
}
