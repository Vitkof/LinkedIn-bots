var countOfPagesScrolled = 10;
var contactsNum = 0;
// specify your native language
var myLang = "Russian";
// is 'hi' only to those who learn your language?
// if NOT, then change to false instead of true
var checkPersonIsLearningMyLang = true;


async function pageScrollDown(height, countOfPagesScrolled){

    scroll(0, height);

    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    setTimeout(()=>{
        if(height != scrollHeight && countOfPagesScrolled > 0){
        pageScrollDown(scrollHeight, --countOfPagesScrolled);
        }else
            return sendRequest();
    }, 2000)
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function sendHiMessage(el){
    contactsNum++;
    let name = document.getElementsByClassName('identity-name is-title-1')[0]
    .outerText.slice(0,-3);
    let id = el.hash.slice(10);
    console.log(name);

    location.href = `https://www.speaky.com/app/#/messaging?userId=${id}`;
    await sleep(2000);

    var nocontent = document.getElementsByClassName('chat-not-started-msg');
    var txtarea= document.getElementsByTagName('textarea')[0];

    if(nocontent){
        
        txtarea.focus();
        txtarea.value = `Hi, ${name}.
        where does your name come from?`;

        var send = document.querySelector('[aria-label="Send"]');
        send.click();

        await sleep(1000);
        txtarea.value = "it's very interesting";
        send.click();
    }
}

async function elementProfileClick(el){
        el.click();
        await sleep(2000);
        
        if(checkPersonIsLearningMyLang == true){
            var lgNames = document.querySelector('.studylg-list')
                                .querySelectorAll('.lg-name');

            lgNames.forEach(function(lg){
                if(lg.innerText === myLang){ 
                    sendHiMessage(el);
                }
            });
        }
        else sendHiMessage(el);
}


async function sendRequest(){
    const elements = Array.from(
	    document.getElementsByClassName('new-card community-user-card'));

    for (let el of elements){
        var img = el.querySelector('img.user-picture');
	    
        if(img){
            var blob = null;
            var xhr = new XMLHttpRequest(); 
            xhr.open('GET', img.currentSrc, true); 
            xhr.responseType = 'blob';
            xhr.onload = function() 
            {
                blob = xhr.response;
                if(blob.size > 10000){
                    elementProfileClick(el);
                };
            }
            xhr.send();
            await sleep(6000);
        }
    }
	
	console.log('Just saw HI contacts: ' + contactsNum);
}

pageScrollDown(document.body.clientHeight, countOfPagesScrolled);
