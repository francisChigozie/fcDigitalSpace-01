const form = document.querySelector('#form');
const sentMsg = document.querySelector('#result');
const user = document.getElementById('user');
const subject = document.getElementById('subject');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const text = document.getElementById('text');

form.addEventListener('submit',(e) => {
    
    e.preventDefault();

    checkInputs();

    completeValidate();

});

function checkInputs() {
    // get the values from the inputs
    const userValue = user.value.trim();
    const subjectValue = subject.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const textValue = text.value.trim();

    if(userValue === '') {
        // show error
        // add error class
        setErrorFor(user, 'Please enter your name');
    }else{
        // add success class
        setSuccessFor(user)
    }

    if(subjectValue === '') {
        setErrorFor(subject, 'Please enter a subject');
    }else{
        // add success class
        setSuccessFor(subject)
    }

    if(emailValue === '') {
        setErrorFor(email, 'Please enter your email')
    }else if(!isEmail(emailValue)) {
        setErrorFor(email, 'Enter a valid email')
    }else{
        setSuccessFor(email);
    }

    if(phoneValue === '') {
        setErrorFor(phone, 'Please enter your mobile number');
    }else{
        // add success class
        setSuccessFor(phone)
    }

    if(textValue === '') {
        setErrorFor(text, 'Please write your message');
    }else{ // add success class
         setSuccessFor(text)
        } 
}

function setErrorFor(input, message) {
    const formControl = input.parentElement; //form-control
    const small = formControl.querySelector('small');

    // add error message inside small
    small.innerText = message;

    // add error class
    formControl.className = 'form-group error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-group success'
}

function isEmail(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
}

function completeValidate() {
    // get the values from the inputs
    const userValue = user.value.trim();
    const subjectValue = subject.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const textValue = text.value.trim();

    if (userValue !== '' && subjectValue !== '' &&
        emailValue !== '' && phoneValue !== '' && textValue !== '') {

             sendFormData();
        }
}

async function sendFormData(){
                   // get the values from the inputs
                    const userValue = user.value.trim();
                    const subjectValue = subject.value.trim();
                    const emailValue = email.value.trim();
                    const phoneValue = phone.value.trim();
                    const textValue = text.value.trim();
                    
                    // send data message
                    const data = {userValue,subjectValue,emailValue,phoneValue,textValue}

                    const options = {
                        method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }

                  await fetch("/infocontact", options)
                    .then((response) => {
                        response.json()
                        console.log(response)
                    })
                    .then((data) => {
                        console.log(data)
                         
                     var successMsg = document.getElementById('result').innerHTML = 
                        'Your message is sent and I will write you soon';

                    setInterval(() => {
                        window.location = '/contact';
                    }, 20000)
                    })
                    .catch((err) => {
                        console.error(err.message)
                    })
     
}

/**
 *function getFormData() {
 
     // get the values from the inputs
    const userValue = user.value.trim();
    const subjectValue = subject.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const textValue = text.value.trim();

         try{
          axios.post("/contact", {
                    user: userValue,
                    subject: subjectValue,
                    email: emailValue,
                    phone: phoneValue,
                    text: textValue
              }
          )
          .then((res) => {
              console.log(res)
          })
          .then((data) => {
              console.log(data)
          })
         }
          catch(err) {
             console.error(err.message)
         }
}
 * 
function sendForm() {
    var formData = new formData(form);

  fetch("/contact", {
      method:"POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          user: formData.get('name'),
          subject: formData.get('subject'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          text: formData.get('text'),
      })
      .then((res) => {
          res.json()
      }) 
      .then((data) => {
          console.log(data)
      })
      .catch((err) => {
          console.error(err)
      })
  })

}
          
 */