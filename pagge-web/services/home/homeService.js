var isAberto = false;

async function fetchHtml(url) {
    return await (await fetch(url)).text();
}

function onClickNav() {
    if(!isAberto){
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
        isAberto = true;
    }else{
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
        isAberto = false;
    }
}

async function navigateUsuario(params) {
   document.querySelector(".conteudo").innerHTML = await fetchHtml("/pagge-web/views/grid/usuario/usuarioGrid.html");
}