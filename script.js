//search button
document.querySelector('#searchButton').addEventListener('click', function() {
    const inputTitleName = document.getElementById('songTitle');
    const searchBtn = inputTitleName.value;
    fetch(`https://api.lyrics.ovh/suggest/${searchBtn}`)
        .then(res => res.json())
        .then(data => displaySongNames(data))
    document.querySelector('#songLyrics').style.display = 'none';

})

function displaySongNames(title) {
    const lyricsName = document.getElementsByClassName('lyrics-name');
    const singerName = document.getElementsByClassName('singer-name');
    const lyricsFull = document.getElementsByClassName('full-lyrics');
    document.querySelector('#searchList').style.display = 'block';



    for (let i = 0; i < 10; i++) {
        const songTitleName = title.data[i].title;
        const artistName = title.data[i].artist.name;

        lyricsName[i].innerHTML = songTitleName;
        singerName[i].innerHTML = artistName;
        document.querySelector('#songTitle').value = '';
/** search lyric */
        lyricsFull[i].addEventListener('click', function() {
            document.querySelector('#songLyrics').style.display = 'block';
            document.querySelector('#songDescription').innerHTML = `${songTitleName} Lyrics`;
            document.querySelector('#singerFullName').innerHTML = ` By ${artistName}`;
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitleName}`)
                .then(resp => resp.json())
                .then(json => {
                    if (json.lyrics == undefined) {
                        document.querySelector('#songWithLyrics').innerHTML = 'Lyrics Not Found';
                        document.querySelector('#songWithLyrics').style.color = 'white';
                    } else {
                        document.querySelector('#songWithLyrics').innerHTML = json.lyrics;
                    }
                })
        })
    }
}