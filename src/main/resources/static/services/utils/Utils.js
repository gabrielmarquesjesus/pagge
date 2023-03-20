export function getFormValue(field) {
    if(field != null && field != ""){
        var value = document.querySelector(field).value;
        return value != "" ? value : null;
    }
}