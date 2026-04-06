const role = localStorage.getItem("user_role");

if (role !== "ADMIN") {
  alert("Hayo! Kamu bukan Admin!");
  window.location.href = "/shared/Login";
}
