$(document).ready(function() {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
  $('#current-temperature').text(data.main.temp);
})
  let $submit = $('input[type="submit"]');
    
  $submit.prop('disabled', true);
      $('input[type="text"]').on('input change', function() { //'input change keyup paste'
        $submit.prop('disabled', !$(this).val().length);
  });
  
  let thermostat = new Thermostat();
  updateTemperature();

  $('#temperature-up').click(function() {
    thermostat.up(1);
    updateTemperature();
  });

  $('#temperature-down').click(function() {
    thermostat.down(1);
    updateTemperature();
  });

  $('#temperature-reset').click(function() {
    thermostat.reset();
    updateTemperature();
  });

  $('#powersaving-on').click(function() {
    thermostat.powerSavingModeOn();
    $('#power-saving-status').text('on')
    updateTemperature();
  })

  $('#powersaving-off').click(function() {
    thermostat.powerSavingModeOff();
    $('#power-saving-status').text('off')
    updateTemperature();
  })

  displayWeather('London');

$('#select-city').submit(function(event) {
  event.preventDefault();
  let city = $('#current-city').val();
  displayWeather(city);
  $('#temp-in-city').text(city);
})

  function updateTemperature() {
    $('#temperature').text(`temp ${thermostat.temperature}°`);
    $('#temperature').attr('class', thermostat.energyUsage());
    $('#myBar').attr('class', thermostat.energyUsage());
  };

  function displayWeather(city) {
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    let token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    let units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp);
    });
  }


});