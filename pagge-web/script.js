/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */

var isAberto = false;

function onClickNav() {
    if(!isAberto){
        document.getElementById("menuLateral").style.width = "400px";
        var links = document.querySelectorAll(".link");
        for(let link of links){
            link.querySelector('img').hidden = true;
            
            setTimeout(() => {
                link.querySelector('label').hidden = false;
            }, 200);
        }
        isAberto = true;
    }else{
        document.getElementById("menuLateral").style.width = "60px";
        var links = document.querySelectorAll(".link");
        for(let link of links){
            link.querySelector('img').hidden = false;
            link.querySelector('label').hidden = true;
        }
        isAberto = false;
    }
}