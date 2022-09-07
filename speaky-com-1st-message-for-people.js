var countOfPagesScrolled = 3;
var contactsNum = 0;

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


async function elementProfileClick(el){

        el.click();
        await sleep(3000);
        var btnSendMessage = document.getElementsByClassName('altissia-main-button');

        contactsNum++;
        var name = document.getElementsByClassName('identity-name is-title-1');
        let id = el.hash.slice(10);

        console.log(name.innerText + contactsNum);

        location.href = `https://www.speaky.com/app/#/messaging?userId=${id}`;
}


async function sendRequest(){

    const elements = Array.from(document.getElementsByClassName('new-card community-user-card'));

    for (var i = 0; i < elements.length; i++) {
        var isImg = elements[i].getElementsByTagName('img').length;
        if(isImg){
            elementProfileClick(elements[i]);
            await sleep(6000);
        }
    }

	console.log('Just saw HI contacts: ' + contactsNum);
}

pageScrollDown(document.body.clientHeight, countOfPagesScrolled);