// membuat fungsi submit untuk contact yang akan di kirim ke email

function submitHandler() {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  let subject = document.getElementById("input-subject").value;
  let message = document.getElementById("input-message").value;

  if (name === "") {
    return alert("please entered your name");
  } else if (email === "") {
    return alert("please entered your email");
  } else if (phone === "please entered your phone") {
    return alert("please entered your ");
  } else if (subject === "") {
    return alert("please entered your subject");
  } else if (message === "") {
    return alert("please entered your message ");
  }

  const data = {
    name,
    email,
    phone,
    subject,
    message,
  };

  const mailRecipient = "hasaelbutarbutar80@gmail.com";

  let a = document.createElement("a");
  a.href = `https://mail.google.com/mail?view=cm&fs=1&to=${mailRecipient}&su=${subject}&body=${message}`;
  a.click();

  console.log(data);
}
