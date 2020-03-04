var api ="https://itunes.apple.com/search?term=";

document.getElementById('input').addEventListener('keypress', getApi);

var song;
var statusMsg = document.getElementById('status');


function getApi(){
    var input = document.getElementById('input');
    var table = document.getElementById('table');

    song = input.value;
    input.innerHTML = '';

    var url = api + song;

    var poziv = new XMLHttpRequest();
    poziv.open('GET', url, true);
    poziv.onload = function (){
        var data = JSON.parse(poziv.response);
        statusMsg.innerText = '';
        getList(data);
    }
    table.innerHTML = '';
    statusMsg.innerHTML = '<img src="assets/img/spiner.svg"> <p>Loading...<p>';
    poziv.send();
}

function getList(data){
    if(data.resultCount > 0){
        var table = document.getElementById('table');
        table.innerHTML = '';
        for(i = 0; i < data.resultCount; i++){ 
            var artworkLink = data.results[i].artworkUrl60;
            var songPlay = data.results[i].previewUrl;

            var tr = document.createElement('tr');
            var albumImg = document.createElement('img');
            albumImg.setAttribute("src", artworkLink);

            var playSample = document.createElement('audio');
            playSample.setAttribute("controls", "");
            var audioSrc = document.createElement('source');
            audioSrc.setAttribute("type"," audio/ogg");
            audioSrc.setAttribute("src", songPlay);
            playSample.appendChild(audioSrc);

            var tdArtwork = document.createElement('td');
            var tdSongInfo = document.createElement('td');
            var artist = document.createElement('p');
            var song = document.createElement('p');
            var album = document.createElement('p');
            tdSongInfo.append(artist, song, album);
            var tdSongPlay = document.createElement('td');
            tdSongPlay.appendChild(playSample);

            tdArtwork.appendChild(albumImg);
            tr.appendChild(tdArtwork);
            tr.appendChild(tdSongInfo);
            tr.appendChild(tdSongPlay);

            artist.innerText = data.results[i].artistName;
            song.innerText = data.results[i].trackName;
            album.innerText = data.results[i].collectionName;
            table.appendChild(tr);
        }
    } else{
        statusMsg.innerText = '';
        statusMsg.innerText = 'Nema rezultata';
    }
  }