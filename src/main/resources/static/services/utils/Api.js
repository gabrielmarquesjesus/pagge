
export function getApi(win) {
    const localhost = "http://localhost:8080/";
    var urlCompleta = win.srcElement.URL;
    var diretorio = win.srcElement.URL.split("/")[3];
    var parametros = win.srcElement.URL.split("/")[4];

    var api = {
        localhost : localhost,
        urlCompleta : urlCompleta,
        diretorio : diretorio,
        parametros : parametros,
    };

    return api;
    
}