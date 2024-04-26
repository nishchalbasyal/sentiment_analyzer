


$(document).ready(function () {
    $(".error").hide();
    $(".register-error").hide();
    $(".chart-section").hide();
   });



const checkSentimentScore = () => {
    window.location.href = "/checkscore"
}

const login_func = () => {
    window.location.href = "/login"

}
const makeMeRegister = () => {
    window.location.href = "/register"

}

const logout_func = () => {
    window.location.href = "/logout";
};


/* Register *****/

let email_error = true;
function email_validation() {
  let email = $("#eemail").val();
  let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;

  if (email.length == 0) {
    $(".register-email-error").show();
    $(".register-email-error").text("** please enter email");
    email_error = true;
    return false;
  } else if (!regex.test(email)) {
    $(".register-email-error").show();
    $(".register-email-error").text("** email is invalid");
    email_error = true;
    return false;
  } else {
    $(".register-email-error").hide();
    email_error = false;
    return true;
  }
}

let password_error = true;
function passwordError() {
  let password = $("#ppassword").val();

  if (password.length < 4 || password.length > 20) {
    $(".register-password-error").show();
    $(".register-password-error").text(
      "password length must be between 4 and 20"
    );
    password_error = true;
    return false;
  } else {
    $(".register-password-error").hide();
    password_error = false;
    return true;
  }
}

let fullname_error = true;
function fullnameError() {
  let fullname = $("#ffullname").val();

  if (
    fullname.length == 0 ||
    fullname == "" ||
    fullname == null ||
    fullname == undefined
  ) {
    $(".register-fullname-error").show();
    $(".register-fullname-error").text("name must not be empty");
    fullname_error = true;
    return false;
  } else {
    $(".register-fullname-error").hide();
    fullname_error = false;
    return true;
  }
}


$("#sign-up").click(function (event) {
    event.preventDefault();
    if (email_validation() && passwordError() && fullnameError()) {
      $(".register-form").submit();
    }
  });


  /****  Send a json request */

let speed = 0;
var prevSpeed = 0;
var currentScale = 1;

let positiveScore = 0;
let negativeScore = 0;

  function checkSentiment() {

    decreaseSpeed()
    
    speed = 0
    prevSpeed = 0;
    currentScale = 1;
    // Get the CSRF token from the cookie
    var csrftoken = getCookie('csrftoken');

    // Get the text entered by the user
    var text = document.getElementById('textToCheckSentiment').value;

    // Send an AJAX request to calculate sentiment score
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/checkscore', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    // Set the CSRF token in the request header
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            var sentiment = JSON.parse(xhr.responseText);

            // Update the speedometer with the positive score
        
            
            if (sentiment) {
              $('.result #sentimentScore').text(`Your Sentiment Score is ${sentiment.positive}`);
              speedometer(sentiment.positive);
              GenerateChart(sentiment.positive,sentiment.negative)
            }
        }
    };
    xhr.send('textToCheckSentiment=' + encodeURIComponent(text));
}

// for csrf token

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Check if the cookie name matches the CSRF token
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}



  /*** Speedometer *********/




function speedometer(prob){
  n = prob/100;
  n = n * 10;

  for(var i =0 ;i<n;i++){
    increaseSpeed()
  }


}

function increaseSpeed() {
  
    if (speed < 100) {
        speed = speed + 10;
        addClass();
        currentScale = currentScale + 1;
        changeActive();
        changeText();
    }
}

function decreaseSpeed() {
    if (speed > 0){

       while (speed>=0){
         addClass();
         changeActive();
         currentScale = currentScale - 1;
         changeText();
         speed = speed - 10;
        

       }
    }
}

function addClass() {
    let newClass = "speed-" + speed;
    let prevClass = "speed-" + prevSpeed;
    let el = document.getElementsByClassName("arrow-wrapper")[0];
    if (el.classList.contains(prevClass)) {
        el.classList.remove(prevClass);
        el.classList.add(newClass);
    }
    prevSpeed = speed;
}

function changeActive() {
    let tempClass = "speedometer-scale-" + currentScale;
    let el = document.getElementsByClassName(tempClass)[0];
    el.classList.toggle("active");
}

function changeText() {
    let el = document.getElementsByClassName("km")[0];
    el.innerText = speed;
}


/**** */


// Get the canvas element

function GenerateChart(positiveScore,negativeScore){


  $(".chart-section").show();

  if (window.myBar) {
    window.myBar.destroy();
}
if (window.myPie) {
    window.myPie.destroy();
}


var ctxBar = document.getElementById('sentimentChartBar').getContext('2d');
var ctxPie = document.getElementById('sentimentChartPie').getContext('2d');

// Create the chart
window.myBar = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Positive', 'Negative'],
        datasets: [{
            label: 'Sentiment Score',
            data: [positiveScore, negativeScore],
            backgroundColor: [
                'rgba(54, 162, 235, 1)', // Blue for positive
                'rgba(255, 99, 132, 1)'   // Red for negative
            ],
            
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


xValues = ['Positive','Negative']
yValues = [positiveScore,negativeScore]
var barColors = [  "rgba(194, 0, 52, 1)",
"rgba(0, 158, 155, 1)"
];
window.myPie = new Chart(ctxPie, {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "World Wide Wine Production"
    }
  }
});

}
