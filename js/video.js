window.onload = () => {
    var params = new URLSearchParams(window.location.search);
    const url = params.get('url');
    const id = params.get('id');
    const offset = params.get('offset');
    console.log(id)
    if(url != null && id != null && offset != null){
        getAssetId(url)
        getSuggestions(id, offset)
    } else {
        window.location = "/"
    }
}
const getSuggestions = (id, offset) => {
    const url = `https://www.cartoonnetwork.com.co/api/filtered-contents?contentType=VIDEO&locale=es-CO&offset=${offset}&limit=5&device=DESKTOP&exclude_id=${id}`
    fetch(url)
    .then(response => response.json())
    .then(data => {setSuggestions(data)})
}
const setSuggestions = (data) => {
    for(let i = 0; i < data.length; i++){
        $("#suggested").append(addSuggestion(data[i].data.title,data[i].data.card, data[i].data.show.title,data[i].data.friendlyUrl,i,data[i].id));
    }
}
const getAssetId = (id) => {
    const url = `https://www.cartoonnetwork.com.co/api/content-by-friendly-url?friendly_url=${id}&locale=es-CO&kind=video&device=DESKTOP`
    fetch(url)
    .then(response => response.json())
    .then(data => {getVideo(data.video.asset_id, data.video.thumb20); setInfo(data.localization.title, data.show.name)})
}
const setInfo = (title, show) => {
    $("#title").text(title);
    $("#show").text(show);
}
const getVideo = (assetID, poster) => {
    const url = `https://avsvideoapi.dmti.cloud/api/publicvideo?id=${assetID}&channel=CN_APAC_CO&language=SPA`
    fetch(url)
    .then(response => response.json())
    .then(data => $("#video").append(loadVideo(data.source, poster)))
}
const loadVideo = (url, poster) => {
    return `<video class="embed-responsive-item" 
    controls 
    src="${url}"
    id="video" 
    data-dashjs-player="" 
    width="100%" 
    height="100%"
    autoplay 
    poster="${poster}">
    </video> 
    <script src="http://cdn.dashjs.org/latest/dash.all.min.js"></script>`
    // 
}
const addSuggestion = (title, image, show,url,offset, vidID) => {
    return `
    <div class="col-12">
    <a href="video.html?url=${url}&offset=${offset}&id=${vidID}" style="text-decoration: none;">
    <div class="card">
        <div class="row no-gutters">
            <div class="col-sm-5" style="height: 120px; background: url(${image}); background-size: cover;">
            </div>
            <div class="col-sm-7">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${show}</p>
                </div>
            </div>
        </div>
    </div>
    </a>
    </div>
    `
    /*

     */
}