var isAberto = true;

export async function renderMenuLateral() {
    var menuLateral = await (await fetch('/menuLateral')).text();
    document.querySelector('.menuLateral').innerHTML = menuLateral;
    onClickNav(true);
    document.querySelector('.navBtn').addEventListener('click', onClickNav);
}

function onClickNav(isRender) {

    if (isAberto) {
        document.getElementById("menuLateral").style.width = "60px";
        var links = document.querySelectorAll(".link");
        for (let link of links) {
            link.querySelector('img').hidden = false;
            link.querySelector('label').hidden = true;
            setTimeout(() => {
                link.querySelector('img').style.opacity = 1;
                link.querySelector('label').style.opacity = 0;
                if (!isRender) {
                    document.querySelector('.container').style.backgroundColor = "rgba(0, 0, 0, 0)";
                    setTimeout(function () {
                        document.querySelector('.container').remove();
                    }, 200)
                }
            }, 100);
        }
        isAberto = false;
    } else {
        var container = document.createElement('div');
        container.classList.add('container');
        document.querySelector('body').appendChild(container);
        document.getElementById("menuLateral").style.width = "400px";
        var links = document.querySelectorAll(".link");
        for (let link of links) {
            link.querySelector('img').hidden = true;
            link.querySelector('label').hidden = false;
            setTimeout(() => {
                link.querySelector('img').style.opacity = 0;
                link.querySelector('label').style.opacity = 1;
                document.querySelector('.container').style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            }, 235);
        }
        isAberto = true;
    }
}