document.querySelector('.navBtn').addEventListener('click',onClickNav);
document.querySelector('#linkHome').addEventListener('click', navigateHome);

var isAberto = false;

function onClickNav() {
    if(isAberto){
        document.getElementById("menuLateral").style.width = "60px";
        var links = document.querySelectorAll(".link");
        for(let link of links){
            link.querySelector('img').hidden = false;
            link.querySelector('label').hidden = true;
            setTimeout(() => {
                link.querySelector('img').style.opacity = 1;
                link.querySelector('label').style.opacity = 0;
            }, 100);
        }
            document.querySelector(".conteudo").style.backgroundColor = 'rgba(0,0,0,0)';
        isAberto = false;
    }else{
        document.getElementById("menuLateral").style.width = "400px";
        var links = document.querySelectorAll(".link");
        for(let link of links){
            link.querySelector('img').hidden = true;
            link.querySelector('label').hidden = false;
            setTimeout(() => {
                link.querySelector('img').style.opacity = 0;
                link.querySelector('label').style.opacity = 1;
            }, 235);
        }

            document.querySelector(".conteudo").style.backgroundColor = 'rgba(0,0,0,0.5)';
        isAberto = true;
    }
}

async function navigateHome() {
    document.querySelector(".conteudo").innerHTML = "";
}