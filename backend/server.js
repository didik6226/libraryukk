const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. KONEKSI DATABASE ---
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "perpustakaan",
});

db.connect((err) => {
  if (err) console.error("Gagal konek DB:", err);
  else console.log("Database Konek!");
});

// --- 2. API LOGIN (Admin & User) ---
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query =
    "SELECT u.*, r.role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length > 0) {
      res.send({
        message: "Login Berhasil",
        user: { name: result[0].full_name, role: result[0].role_name },
      });
    } else {
      res.status(401).send({ message: "Email atau Password Salah" });
    }
  });
});

// --- 3. API CRUD BUKU ---
// Ambil semua buku
app.get("/buku", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});

// Tambah buku
app.post("/buku", (req, res) => {
  const { judul, pengarang, stok } = req.body;
  db.query(
    "INSERT INTO books (judul, pengarang, stok) VALUES (?, ?, ?)",
    [judul, pengarang, stok],
    (err, result) => {
      if (err) res.status(500).send(err);
      else res.send({ message: "Buku berhasil ditambah" });
    },
  );
});

// Hapus buku
app.delete("/buku/:id", (req, res) => {
  db.query("DELETE FROM books WHERE id = ?", [req.params.id], (err) => {
    if (err) res.status(500).send(err);
    else res.send({ message: "Buku berhasil dihapus" });
  });
});

// --- 4. RUN SERVER ---
app.listen(5000, () => console.log("Server jalan di port 5000"));
