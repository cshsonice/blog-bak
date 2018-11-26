//after the page loaded
function after_load(){
    var content_div = document.getElementById("content")
    var load_div = document.getElementById("loading");

    load_div.style.display="none";
    content_div.style.display="show";
}