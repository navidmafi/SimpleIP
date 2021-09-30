
window.myApp = {
    onWindowClose: () => {
        Neutralino.app.exit();
    }
};
let APIRes;
let APIJson;
const sc1 = document.getElementById("sc1");
const sc2 =  document.getElementById("sc2");
const CF = document.getElementById("CF");

async function runCurl() {
    sc1.innerText = "Loading...";
    sc2.innerHTML = "";
    CF.innerHTML = "";
    let response = await Neutralino.os.execCommand({
        command: 'curl "https://api.myip.com"'
      });
      APIRes = response.output;
      APIJson = JSON.parse(APIRes.slice(APIRes.search(`{"ip`)));
      sc1.innerText = APIJson["ip"];
      CF.innerHTML = `<img src="https://www.countryflags.io/${APIJson["cc"]}/shiny/64.png">`;
      sc2.innerHTML = APIJson["country"];
      //return APIJson;
}

Neutralino.init();
Neutralino.events.on("windowClose", myApp.onWindowClose);
