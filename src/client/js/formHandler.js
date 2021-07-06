function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  let reqBody = {
    text: formText,
  };

  Client.checkForName(formText);

  console.log("::: Form Submitted :::");

  //post input data to our server then get cooked response that gives us nlp api res  then Updat UI
  fetch("http://localhost:8081/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  })
    .then((res) => {
      return res.json();
    })
    //updat UI
    .then(function (res) {
      document.getElementById("agreement").innerHTML = res.agreement;
      document.getElementById("subjectivity").innerHTML = res.subjectivity;
      document.getElementById("confidence").innerHTML = res.confidence;
      document.getElementById("irony").innerHTML = res.irony;
    });
}

export { handleSubmit };
