var countOfPagesScrolled = 10;
var contactsNum = 0;

async function pageScroll(countOfPagesScrolled){

    if (contactsNum > 0) {
        await sleep(7000);
    }

    scroll(0, document.body.clientHeight);

    await sendRequest();
    console.log('Pages left: ' + --countOfPagesScrolled);
    var btnNext = document.querySelector('[aria-label="Next"]');

    if(countOfPagesScrolled > 0){
        btnNext.click();
        pageScroll(countOfPagesScrolled);
    }else
        return;
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function elementConnectClick(el){

        contactsNum++;
        var name = el.ariaLabel.slice(7,-10);
        console.log(name + contactsNum);
        el.click();

        setTimeout(()=>{
            var btnSend = document.querySelector('[aria-label="Send now"]');
            if(btnSend) {
                btnSend.click();
            }else{
                var btnOther = document.querySelector('[aria-label="Other"]');
                btnOther.click();
                var btnConnect = document.querySelector('[aria-label="Connect"]');
                btnConnect.click();
            }
        }, 500);
}


async function sendRequest(){

	var elements = document.getElementsByClassName('artdeco-button artdeco-button--2 artdeco-button--secondary');

    for (var i = 0; i < elements.length; i++) {
        if(elements[i].outerText === "Connect"){
            elementConnectClick(elements[i]);
            await sleep(700);
        }
    }
}

pageScroll(countOfPagesScrolled);
