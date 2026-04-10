(function() {
  // Theme toggle
  var btn = document.getElementById('themeToggle');
  var body = document.body;

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    body.classList.remove('dark', 'light');
    if (theme !== 'system') body.classList.add(theme);
    var effective = theme === 'system' ? getSystemTheme() : theme;
    btn.textContent = effective === 'dark' ? '\u2600' : '\u263E';
  }

  var saved = localStorage.getItem('theme');
  applyTheme(saved || 'system');

  btn.addEventListener('click', function() {
    var isDark = body.classList.contains('dark') || (!body.classList.contains('light') && getSystemTheme() === 'dark');
    var next = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
    if (!localStorage.getItem('theme')) applyTheme('system');
  });

  // Seminar gallery
  var grid = document.getElementById('seminarGrid');
  var empty = document.getElementById('seminarEmpty');

  fetch('seminars.json')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var seminars = data.seminars;
      if (!seminars || seminars.length === 0) {
        empty.style.display = 'block';
        return;
      }
      seminars.forEach(function(s, i) {
        var card = document.createElement('article');
        card.className = 'seminar-card';
        if (i === 0) card.classList.add('seminar-card--latest');

        var dateLabel = s.date.replace('-', '.');

        var tagsHtml = '';
        if (s.tags && s.tags.length > 0) {
          tagsHtml = '<div class="seminar-card__tags">' +
            s.tags.map(function(t) {
              return '<span class="seminar-card__tag">' + t + '</span>';
            }).join('') +
          '</div>';
        }

        var metaHtml = '';
        if (s.slideCount) {
          metaHtml = '<div class="seminar-card__meta">' + s.slideCount + ' slides</div>';
        }

        card.innerHTML =
          (i === 0 ? '<div class="seminar-card__latest-badge">Latest</div>' : '') +
          '<div class="seminar-card__badge">' + dateLabel + '</div>' +
          '<h2 class="seminar-card__title">' + s.title + '</h2>' +
          '<p class="seminar-card__desc">' + (s.description || '') + '</p>' +
          tagsHtml +
          metaHtml +
          '<div class="seminar-card__actions">' +
            '<a href="seminars/' + s.id + '/slides.html" class="seminar-card__btn seminar-card__btn--primary">\uC2AC\uB77C\uC774\uB4DC \uBCF4\uAE30</a>' +
            '<a href="seminars/' + s.id + '/slides.pdf" class="seminar-card__btn seminar-card__btn--secondary">PDF \uB2E4\uC6B4\uB85C\uB4DC</a>' +
          '</div>';

        grid.appendChild(card);
      });
    })
    .catch(function(err) {
      console.error('Failed to load seminars.json:', err);
      empty.style.display = 'block';
    });
})();
