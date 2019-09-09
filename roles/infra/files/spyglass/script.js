(function($){
  var
    $doc = $(document),
    $win = $(window);

  $win.on('load', init);

  function init() {
    $doc.on('click', '.js-nav-bar-link', function(e) {
      var href = $(this).attr('href');
      e.preventDefault();

      $('.js-content-part').removeClass('active');

      $(href).addClass('active');

      href == '#terminals' && loadTerminals();
    });

    $doc.on('click', '.js-expand-terminal', function(e) {
      e.preventDefault();
      $(this).parent().addClass('active');
    });

    $doc.on('click', '.js-close', function(e) {
      e.preventDefault();
      $(this).parent().removeClass('active');
    })
  }

  function loadTerminals() {
    var
      config = getSettings(),
      $output = $('#terminals'),
      $list = $('<div>').addClass('terminals-list'),
      users = buildUsers(config);

    $output.html('');

    users.forEach(function(user) {
      $list.append(renderTerminalFor(user, config));
    });

    $output.append($list);
  }

  function buildUsers(config) {
    var
      users = [];

    if (config.portsCont > 0) {
      for (var i = 0; i < config.portsCont; i++) {
        users.push(buildUser(config.portFrom*1 + i, i));
      }
    } else {
      users = [config.portFrom];
    }

    return users;
  }

  function renderTerminalFor(user, config) {
    var $item = $('<div>').addClass('terminal-list-item ');

    $item.append($('<a>').attr('href', '#').addClass('close js-close').text('X'));

    $item.append(
      $('<div>').addClass('title js-expand-terminal')
                .text(buildTerminalTitle(user, config))
                .attr('title', ['pass: ', user.pass].join(''))
    );

    $item.append(
      $('<div>').addClass('terminal-wrapper').append(
        $('<iframe>').attr('src', ['http://', config.host, ':', user.port].join(''))
      )
    );
    return $item;
  }

  function buildTerminalTitle(user, config) {
    return [user.userName, '@', config.host, ':', user.port].join('');
  }

  function buildUser(port, id) {
    return {
      port: port,
      userName: ['user', id].join(''),
      pass: md5(id + '').substring(0,4)
    }
  }


  function getSettings() {
    var
      $form = $('#js-settings-form'),
      config = {};
    $form.serializeArray().forEach(function(item) {
      config[item.name] = item.value;
    });

    return config;
  }
})($);
