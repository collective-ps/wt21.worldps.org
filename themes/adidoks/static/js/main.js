// Set darkmode
document.getElementById("mode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}

var $countdown = document.getElementById("countdown");

if ($countdown) {
  var $days = document.getElementById("days");
  var $hours = document.getElementById("hours");
  var $minutes = document.getElementById("minutes");
  var $seconds = document.getElementById("seconds");

  var year = Number($countdown.dataset.year);
  var month = Number($countdown.dataset.month);
  var day = Number($countdown.dataset.day) + 1;
  var hour = 7; // +7 offset to account for PDT.
  var future = new Date(Date.UTC(year, month - 1, day, hour));

  function updateCountdown() {
    var now = Date.now();
    var difference_in_ms = Math.max(future - now, 0);

    if (difference_in_ms > 0) {
      var days = Math.floor(difference_in_ms / (1000 * 60 * 60 * 24));
      difference_in_ms = difference_in_ms - days * 1000 * 60 * 60 * 24;
      var hours = Math.floor(difference_in_ms / (1000 * 60 * 60));
      difference_in_ms = difference_in_ms - hours * 1000 * 60 * 60;
      var minutes = Math.floor(difference_in_ms / (1000 * 60));
      difference_in_ms = difference_in_ms - minutes * 1000 * 60;
      var seconds = Math.floor(difference_in_ms / 1000);

      var time_string = [];

      $days.textContent = days < 10 ? "0" + days.toString() : days.toString();
      $hours.textContent =
        hours < 10 ? "0" + hours.toString() : hours.toString();
      $minutes.textContent =
        minutes < 10 ? "0" + minutes.toString() : minutes.toString();
      $seconds.textContent =
        seconds < 10 ? "0" + seconds.toString() : seconds.toString();

      window.requestAnimationFrame(updateCountdown);
    } else {
      $countdown.className += " has-concluded";
      $countdown.innerHTML =
        "Deadline has concluded!\r\n\r\nFor any late submissions or inquiries, please contact <a href='mailto:penspinningwt@gmail.com'>penspinningwt@gmail.com</a>.";
    }
  }

  window.requestAnimationFrame(updateCountdown);
}
