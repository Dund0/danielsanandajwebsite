const button = document.querySelector("#button");

function playVideo() {
    var s = document.getElementById("input").value;

    var equalPosition = s.indexOf('=');
    if(equalPosition != -1) {
        s = s.substring(equalPosition+1);
    }

    document.getElementById('embed').innerHTML = 
        //'<iframe width="852" height="480" src="https://www.youtube.com/embed/ZrF8X10U9-k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        '<iframe width="852" height="480" src="https://www.youtube.com/embed/'+ s + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

}

button.addEventListener('click', function(){
    playVideo();
});