const lowercaseLetters = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
  "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

const numericalCharacters = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];

const specialCharacters = [
  "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+",
  "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"
];

const uppercaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
  "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

let slider = document.getElementById("password-range");
let display = document.getElementById("password-length");
let firstOption = document.getElementById("first-option");
let secondOption = document.getElementById("second-option");
const lowercase = document.getElementById("lower-case");
const numerical = document.getElementById("numerical-characters");
const special = document.getElementById("special-characters");
const uppercase = document.getElementById("upper-case");

display.innerText = slider.value;

// Update the display when the slider is moved.
slider.oninput = function() {
  display.innerText = this.value;
}

let secretPassword = "";
function gerneratePasswords() {
  // How many passwords we will gererate.
  passwords = 2;

  // Get selected character types.
  const lowercaseCheck = lowercase.checked;
  const numericalCheck = numerical.checked;
  const specialCheck = special.checked;
  const uppercaseCheck = uppercase.checked;

  // Ensure at least one character type is selected, otherwise
  // dislay an error.
  if (!lowercaseCheck && !numericalCheck && !specialCheck && !uppercaseCheck) {
    document.getElementById("error").hidden = false;
    return;
  } else if (
    (lowercaseCheck || numericalCheck || specialCheck || uppercaseCheck) &&
    document.getElementById("error").hidden === false
  ) {
    document.getElementById("error").hidden = true;
  }

  // Ensure only the checked character arrays are used to generate the passwords.
  const checkedCharacters = {
    ...(lowercaseCheck && {
      lowercaseLetters
    }),
    ...(numericalCheck && {
      numericalCharacters
    }),
    ...specialCheck && ({
      specialCharacters
    }),
    ...(uppercaseCheck && {
      uppercaseLetters
    }),
  }

  // Create an array of character arrays from those in the checkedCharcters object.
  const characterArrays = [];
  Object.keys(checkedCharacters).map(array => characterArrays.push(checkedCharacters[array]));

  // Generate the passwords.
  for (let pwd = 0; pwd < passwords; pwd++) {
    for (let c = 0; c < slider.value; c++) {
      // Randomly pick a character array.
      const randomArrayIndex = Math.floor(Math.random() * characterArrays.length);
      const randomArray = characterArrays[randomArrayIndex];
      // Randomly pick a character within the array.
      const randomCharacterIndex = Math.floor(Math.random() * characterArrays[randomArrayIndex].length);
      const randomCharacter = randomArray[randomCharacterIndex];

      secretPassword = secretPassword.concat(randomCharacter);
    }

    if (pwd === 0) {
      firstOption.value = secretPassword;
    } else if (pwd === 1) {
      secondOption.value = secretPassword;
    }

    // Reset the password.
    secretPassword = ""
  }
}

function resetPasswords() {
  lowercase.checked = true;
  numerical.checked = true;
  special.checked = true;
  uppercase.checked = true;
  secretPassword = "";
  firstOption.value = "";
  secondOption.value = "";
  slider.value = 11;
  display.innerText = slider.value;
}

// Copy the Selected password to the clipboard.
function copyToClipboard(elementId) {
  const textToCopy = document.getElementById(elementId);

  // Select the text field
  textToCopy.select();
  // For mobile devices
  textToCopy.setSelectionRange(0, 99999);
  // Copy the text inside the text field
  navigator.clipboard.writeText(textToCopy.value);

  // Alert the copied text
  alert("Copied the text: " + textToCopy.value);
}