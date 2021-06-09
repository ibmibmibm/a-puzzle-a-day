'strict';
(function() {
  var Width = 60;
  function getDate() {
    return document.getElementById('date').valueAsDate;
  }
  function getMonthDay(date) {
    const month = date.getMonth();
    const day = date.getDate() - 1;
    return [month, day];
  }
  function getDateIndex(date) {
    const [month, day] = getMonthDay(date);
    return month * 31 + day;
  }
  function getMonthString(date) {
    return date.toDateString().substr(4, 3);
  }
  function getDayString(date) {
    return date.toDateString().substr(8, 2);
  }
  function getSolutionIndex() {
    return document.getElementById('index').value - 1;
  }
  function update() {
    const count = Data[getDateIndex(getDate())].length;
    document.getElementById('index').max = count;
    document.getElementById('index').value = 1;
  }
  function getStyle(c) {
    switch (c) {
    case '1': return 'rgb(146,131,116)';
    case '2': return 'rgb(251,73,52)';
    case '3': return 'rgb(184,187,38)';
    case '4': return 'rgb(250,189,47)';
    case '5': return 'rgb(131,165,152)';
    case '6': return 'rgb(211,134,155)';
    case '7': return 'rgb(142,192,124)';
    case '8': return 'rgb(254,128,25)';
    default:  return 'rgb(253,244,193)';
    }
  }
  function reveal() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    const date = getDate();
    const data = Data[getDateIndex(date)][getSolutionIndex()];
    const [month, day] = getMonthDay(date);
    ctx.fillStyle = 'rgb(253,244,193)';
    ctx.fillRect(0, 0, Width * 8, Width * 8);
    for (var y = 0; y < 7; ++y) {
      for (var x = 0; x < 7; ++x) {
        const c = data[y * 7 + x];
        ctx.fillStyle = getStyle(c);
        ctx.fillRect((x + 0.5) * Width, (y + 0.5) * Width, Width, Width);
      }
    }
    ctx.fillStyle = 'rgb(242,229,188)';
    ctx.fillRect((month % 6 + 0.5) * Width, (Math.floor(month / 6) + 0.5) * Width, Width, Width);
    ctx.fillRect((day % 7 + 0.5) * Width, (Math.floor(day / 7) + 2.5) * Width, Width, Width);

    ctx.font = (Width / 3) + 'pt Courier New';
    ctx.fillStyle = 'rgb(29,32,33)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const monthString = getMonthString(date);
    const dayString = getDayString(date);

    ctx.fillText(monthString, (month % 6 + 1) * Width, (Math.floor(month / 6) + 1) * Width);
    ctx.fillText(dayString, (day % 7 + 1) * Width, (Math.floor(day / 7) + 3) * Width);
  }
  function resize() {
    var content = document.getElementById('content');
    var board = Math.min(content.clientWidth, content.clientHeight) - 30;
    Width = Math.floor(board / 8);
    var canvas = document.getElementById('canvas');
    canvas.width = Width * 8;
    canvas.height = Width * 8;
    reveal();
  }
  function update_and_resize() {
    update();
    resize();
  }

  (function() {
    window.addEventListener('resize', resize);
    window.addEventListener('load', update_and_resize);
    let date = document.getElementById('date');
    date.addEventListener('change', update_and_resize);
    let index = document.getElementById('index');
    index.addEventListener('change', resize);
  })();
})();
