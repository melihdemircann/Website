// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa-NOgPxY2L1l4tOIh7FmIedhOXMLnVJ8",
  authDomain: "rezervasyon-bdd6f.firebaseapp.com",
  databaseURL: "https://rezervasyon-bdd6f-default-rtdb.firebaseio.com",
  projectId: "rezervasyon-bdd6f",
  storageBucket: "rezervasyon-bdd6f.firebasestorage.app",
  messagingSenderId: "185800357165",
  appId: "1:185800357165:web:b7f49b578af88266fc0fa4",
  measurementId: "G-PW5ZXYV45R"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var reservationDB = firebase.database().ref("reservations");

document.getElementById("reservationForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // Get form values
  var checkIn = getElementVal("checkIn");
  var checkOut = getElementVal("checkOut");
  var guests = getElementVal("guests");
  var roomType = getElementVal("roomType");
  var fullName = getElementVal("fullName");
  var email = getElementVal("email");
  var phone = getElementVal("phone");
  var specialRequests = getElementVal("specialRequests");

  // Save reservation data
  saveReservation(checkIn, checkOut, guests, roomType, fullName, email, phone, specialRequests);

  // Create and show alert message
  const alertContainer = document.createElement("div");
  alertContainer.className = "alert";
  alertContainer.style.display = "block";
  alertContainer.style.padding = "10px";
  alertContainer.style.backgroundColor = "#4CAF50";
  alertContainer.style.color = "white";
  alertContainer.style.borderRadius = "5px";
  alertContainer.style.marginTop = "20px";
  alertContainer.textContent = "Rezervasyonunuz başarıyla alındı!";
  
  // Add alert before form
  const formElement = document.getElementById("reservationForm");
  formElement.parentNode.insertBefore(alertContainer, formElement);

  // Remove the alert after 3 seconds
  setTimeout(() => {
    alertContainer.style.display = "none";
  }, 3000);

  // Reset the form
  document.getElementById("reservationForm").reset();
}

const saveReservation = (checkIn, checkOut, guests, roomType, fullName, email, phone, specialRequests) => {
  var newReservation = reservationDB.push();

  newReservation.set({
    checkIn: checkIn,
    checkOut: checkOut,
    guests: guests,
    roomType: roomType,
    fullName: fullName,
    email: email,
    phone: phone,
    specialRequests: specialRequests,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// Add date validation
document.getElementById("checkIn").addEventListener("change", function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(this.value);
  
  if (selectedDate < today) {
    alert("Geçmiş bir tarih seçemezsiniz!");
    this.value = "";
  }
  
  // Update minimum date for checkout
  if (this.value) {
    document.getElementById("checkOut").min = this.value;
  }
});

document.getElementById("checkOut").addEventListener("change", function() {
  const checkInDate = new Date(document.getElementById("checkIn").value);
  const checkOutDate = new Date(this.value);
  
  if (checkOutDate <= checkInDate) {
    alert("Çıkış tarihi, giriş tarihinden sonra olmalıdır!");
    this.value = "";
  }
});