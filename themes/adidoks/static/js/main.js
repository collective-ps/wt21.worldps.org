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
  var year = Number($countdown.dataset.year);
  var month = Number($countdown.dataset.month);
  var day = Number($countdown.dataset.day);
  var future = new Date(Date.UTC(year, month - 1, day));

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

      time_string.push(days.toString() + " days");
      time_string.push(hours.toString() + " hours");
      time_string.push(minutes.toString() + " minutes");
      time_string.push(seconds.toString() + " seconds");
      $countdown.textContent = time_string.join(", ");

      window.requestAnimationFrame(updateCountdown);
    } else {
      $countdown.className += " has-concluded";
      $countdown.textContent =
        "Deadline has concluded!\r\n\r\nSubmissions past this date will be marked as late submissions.";
    }
  }

  window.requestAnimationFrame(updateCountdown);
}
