enterWord('3150390K005PB5', '#mat-input-2');

enterWord('SOFYNJEVAPAO', '#mat-input-3');  //mci_code

enterWord('viktar', '#mat-input-4');  //name

enterWord('chumakou', '#mat-input-5');  //surname

enterWord('KH2502875', '#mat-input-6');

enterWord('375', '#mat-input-7');  //code_country

enterWord('296644022', '#mat-input-8');  //phone_number

enterWord('vitkow@tut.by', '#mat-input-9');  //email

enterWord('15/03/1992', '#dateOfBirth'); 

enterWord('08/06/2025', '#passportExpirtyDate');

var sex = document.getElementById('mat-select-6');
sex.click();
setTimeout(function(){
    let male = document.getElementsByTagName('mat-option')[1];
    male.click();
}, 1500);


var nation = document.getElementById('mat-select-8');
nation.click();
setTimeout(function(){
    let blr = document.getElementsByTagName('mat-option')[19];
    blr.click();
}, 1500);



function enterWord(w, elem){
    var key;
    var pressEvent = document.createEvent("CustomEvent");
    pressEvent.initCustomEvent("keypress", true, false);

    for (var i =0; i < w.length; ++i)
    {
        key                     = w.charCodeAt(i);
        pressEvent.bubbles      = true;
        pressEvent.cancelBubble = false;
        pressEvent.returnValue  = true;
        pressEvent.key          = w.charAt(i);
        pressEvent.keyCode      = key;
        pressEvent.which        = key;
        pressEvent.charCode     = key;
        pressEvent.shiftKey     = false;
        pressEvent.ctrlKey      = false;
        pressEvent.metaKey      = false;

        document.querySelector(elem).focus();

        //keypress //beforeinput //input //sendkeys //select
        setTimeout(function() {
            var e = new window.KeyboardEvent('keypress', pressEvent);
            document.activeElement.dispatchEvent(e);
            e = new window.KeyboardEvent('input', pressEvent);
            document.activeElement.dispatchEvent(e);

        }, 10);

        document.querySelector(elem).value = document.querySelector(elem).value + w.charAt(i);
    }
};
