
window.myApp = {
    onWindowClose: () => {
        Neutralino.app.exit();
    }
};
let APIRes;
let APIJson;
const ip = document.getElementById("ip");
const sc1 = document.getElementById("sc1");
const sc2 = document.getElementById("sc2");
const CF = document.getElementById("CF");
const tooltip = document.getElementById("tooltip");
function Load() {
    sc1.style.filter = "blur(0px)";
    tooltip.style.opacity = 0;
    sc1.innerText = "Loading...";
    sc2.style.opacity = 0;
    CF.style.opacity = 0;
    setTimeout(() => {
        runCurl();
    }, 500);
}
async function runCurl() {

    let APIRes = await Neutralino.os.execCommand('curl "https://api.myip.com"');
    sc1.style.filter = "blur(10px)";

    console.log(APIRes);
    sc2.style.opacity = 1;
    CF.style.opacity = 1;
    APIJson = JSON.parse(APIRes.slice(APIRes.search(`{"ip`)));

    setTimeout(() => {
        sc1.innerText = APIJson["ip"];
    CF.innerHTML = `<img src="https://flagcdn.com/h40/${APIJson["cc"].toLowerCase()}.png">`;
    sc2.innerHTML = APIJson["country"];
    tooltip.style.opacity = 1;

    }, 100);

    sc1.addEventListener('mousedown', e => {
        sc1.style.filter = "blur(0px)";
        tooltip.style.opacity = 0;

    });
    sc1.addEventListener('mouseup', e => {
        sc1.style.filter = "blur(10px)";
        tooltip.style.opacity = 1;

    });
    //return APIJson;
}

Neutralino.init();
Neutralino.events.on("windowClose", myApp.onWindowClose);
