let articleAmount = 5;
function changeH2Text() {
  const inputText = document.getElementById("change-h2-text-input");
  // console.log(inputText.value);
  $(document).ready(function() {
    $("h2").text(`${inputText.value}`);
  });
}

function validateNumber() {
  let num = document.getElementById("jerseyNumber-input");
  if (
    num.value < 0 ||
    num.value === "" ||
    num.value != parseInt(num.value, 10)
  ) {
    $("#jerseyNumber-input").css({
      borderColor: "red"
    });
    alert("Jersey number field has to be a positive INTEGER and is required");
    console.log("failed: ", num.value);
    return false;
  } else
    $("#jerseyNumber-input").css({
      borderColor: "inherit"
    });
  return true;
}
function validateDate() {
  const dateInput = document.forms["survey"]["birthday-input"];
  let d = new Date(dateInput.value);
  let dateArr = dateInput.value.split("-");
  console.log("received date: ", d);
  console.log("Year: ", d.getFullYear() == dateArr[0]);
  console.log("month: ", d.getMonth() == dateArr[1], d.getMonth(), dateArr[1]);
  console.log("day: ", d.getDate() == dateArr[2]);

  if (
    d.getFullYear() == dateArr[0] &&
    d.getMonth()+1 == dateArr[1] &&
    d.getDate() == dateArr[2]
  ) {
    $("#birthday-input").css({
      borderColor: "inherit"
    });
    return true;
  } else {
    $("#birthday-input").css({
      borderColor: "red"
    });
    alert("invalid date");
    dateInput.focus();
    return false;
  }
}
function hideArticleText() {
  const inputVar = $("#checkbox-input");
  if (inputVar.is(":checked")) {
    $("p").hide();
  } else {
    $("p").show();
  }
  return true;
}
function validateForm() {
  $(document).ready(function() {
    if (validateDate() && validateNumber()) {
      submitToMyJSON();
      return true;
    } else return false;
  });
}
function removeSelectedListItem() {
  const selectedValue = $("#select-remove-list-items option:selected").text();
  $(`li:nth-child(${selectedValue})`).remove();
}

function appendArticle() {
  console.log("I want to append");
  const articleName = $("#input-article-name").val();
  const articleType = $("#select-article-type option:selected")
    .text()
    .toLowerCase();
  const articleContent = $("#input-article-content").val();
  console.log(
    `articleName: ${articleName}\narticleType: ${articleType}\narticleContent:${articleContent}`
  );
  //   var newElement = $(`<div id="${articleType}-article-${++articleAmount}">
  //   <article>
  //   <h3>${articleName}</h3>
  //   <p>
  //     ${articleContent}
  //   </p>
  // </article></div>`);
  //   newElement.appendTo(`#${articleType}-stories`);
  console.log(`${articleType.toLowerCase()}-article-${++articleAmount}`);
  console.log(`#${articleType}-stories`);
  $(`#${articleType}-stories`)
    .append(`<div id="${articleType.toLowerCase()}-article-${++articleAmount}">
  <article>
  <h3>${articleName}</h3>
  <p>
    ${articleContent}
  </p>
</article></div>`);
}

// API
function submitToMyJSON() {
  $.support.cors = true;
  // favourite sport
  var radios = document.getElementsByName("favourite-sport-choice");
  let selectedSport;
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      selectedSport = radios[i].value;
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
  var obj = {
    name: document.forms["survey"]["name"].value,
    jerseyNumber: document.forms["survey"]["jerseyNumber"].value,
    favouriteSport: selectedSport,
    favouriteColor: $("#colorpicker").val(),
    birthday: document.forms["survey"]["birthday-input"].value,
    email: $("#email-input").val(),
    rating: $("#select-rating option:selected").text()
  };
  console.log(obj);
  var data = JSON.stringify(obj);
  let url;
  // POST
  $.ajax({
    url: "https://api.myjson.com/bins",
    type: "POST",
    data: data,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      var json = JSON.stringify(data);
      $("#data").val(json);
      url = data.uri;
      console.log(data);
      alert("POST SUCCESS");
      // GET
      $.get(url, function(data, textStatus, jqXHR) {
        console.log("got data: ", data);
        $("#survey-table").append(
          `<tr><td>${JSON.stringify(data)}</td><td></td></tr>`
        );
      });
    }
  });
}
