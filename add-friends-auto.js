var countOfPagesScrolled = 3;
var contactsNum = 0;

function pageScroll(countOfPagesScrolled){

    sendRequest();
    var btnNext = document.querySelector('[aria-label="Next"]');

    setTimeout(function(){

		if(countOfPagesScrolled > 0){
		    btnNext.click();
			pageScroll(--countOfPagesScrolled);
		}else
			return;
	}, 15000);
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
          await sleep(1000);
      }
  }

	console.log('Just added contacts: ' + contactsNum);
}

pageScroll(countOfPagesScrolled);
