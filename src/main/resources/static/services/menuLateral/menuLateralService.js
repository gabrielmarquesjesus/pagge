
var isAberto = false;

export async function renderMenuLateral(){
    var menuLateral = await(await fetch('/menuLateral')).text();
    document.querySelector('.menuLateral').innerHTML = menuLateral;

    document.querySelector('.navBtn').addEventListener('click', onClickNav);
}

function onClickNav() {

    if (isAberto) {
        document.getElementById("menuLateral").style.width = "60px";
        var links = document.querySelectorAll(".link");
        for (let link of links) {
            link.querySelector('img').hidden = false;
            link.querySelector('label').hidden = true;
            setTimeout(() => {
                link.querySelector('img').style.opacity = 1;
                link.querySelector('label').style.opacity = 0;
            }, 100);
        }
        isAberto = false;
    } else {
        document.getElementById("menuLateral").style.width = "400px";
        var links = document.querySelectorAll(".link");
        for (let link of links) {
            link.querySelector('img').hidden = true;
            link.querySelector('label').hidden = false;
            setTimeout(() => {
                link.querySelector('img').style.opacity = 0;
                link.querySelector('label').style.opacity = 1;
            }, 235);
        }

        isAberto = true;
    }
}