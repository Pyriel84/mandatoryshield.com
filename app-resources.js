document.querySelectorAll('.video-thumbnail').forEach(function(thumb) {
    var playBtn = thumb.querySelector('.play-button');
    if (!playBtn) return;
    thumb.style.cursor = 'pointer';
    thumb.addEventListener('click', function(e) {
        e.preventDefault();
        var href = playBtn.getAttribute('href');
        var videoId = href.split('/').pop();
        if (!videoId || videoId.includes('[')) return;
        thumb.classList.add('is-playing');
        thumb.insertAdjacentHTML('beforeend',
            '<iframe src="https://www.youtube-nocookie.com/embed/' + videoId +
            '?autoplay=1&rel=0&modestbranding=1" ' +
            'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
            'allowfullscreen title="ShieldAD Video"></iframe>'
        );
    });
});
