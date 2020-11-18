document.querySelector('.search-btn').addEventListener('click', () => {
    const getSong = document.getElementById('input-song').value;
    loadData(getSong);
    document.getElementById('input-song').value = ""
})

function loadData(song) {
    fetch(`https://api.lyrics.ovh/suggest/${song}`)
    .then(res => res.json())
    .then(data => {
        const limitData = data.data.slice(0, 10);
        limitData.forEach(item => {
            const showSongs = document.querySelector('.show-songs')
            const p = document.createElement('p');
            p.innerHTML = `
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-3">
                    <img src='${item.album.cover}' class="album-img"/>
                </div>
                <div class="col-md-6">
                    <h3 class="lyrics-name">${item.title_short}</h3>
                    <p class="author lead text-success"><span>${item.artist.name}</span></p>
                    <p class="author lead">Album by <span>${item.album.title}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" onClick="lyricsData('${item.artist.name}', '${item.title_short}')">Get Lyrics</button>
                </div>
            </div>`
            showSongs.appendChild(p);
        })
    })
}

function lyricsData(artist, title) { 
    const lyrics = document.querySelector('.lyric')
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {
        if(data.lyrics.length == 0){
            alert("lyrics not available")
        }
        lyrics.innerHTML = `
        <div>
            <div class="text-primary">
                <h3>${title}-By ${artist}</h3>
            </div>
            <div>
                <pre class="text-white">${data.lyrics}</pre>
            </div>
        </div>`
    })
}

