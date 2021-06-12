let times = 0;
window.onload = () => {
    loadData(times);
}
const loadData = (offset) => {
    const url = "https://www.cartoonnetwork.com.co/api/filtered-contents?contentType=VIDEO&locale=es-CO&offset=" + offset + "&limit=12&showId=&device=DESKTOP";
    fetch(url)
        .then(response => response.json())
        .then(data => renderData(data))
}
const renderData = (data) => {
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        $('#content').append(addVideoElement(data[i].data.title, data[i].data.video.thumb, data[i].data.friendlyUrl, data[i].data.show.title,i, data[i].id))
    }
}
const addVideoElement = (title, imagepath, id, show, offset, vidID) => {
    return `
    <div class="col-4">
    <div class="card">
        <img src="${imagepath}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${show}</p>
          <a href="video.html?url=${id}&offset=${offset}&id=${vidID}" class="btn btn-primary">Ver</a>
        </div>
      </div>
    </div>
    `
}
function loadMore() {
    if (times == 0) {
        times = 12;
    } else {
        times = times * 2;
    }
    loadData(times);
}