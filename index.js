import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const PORT = 5000;
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employeesystem',
});

app.use(cors());
app.use(express.json());

app.post('/create', (req, res) => {
  const { name, age, country, position, wage } = req.body;

  db.query(
    'INSERT INTO employees SET ?',
    {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send('Values inserted');
      }
    }
  );
});

app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.put('/update', (req, res) => {
  const { id, name, age, country, position, wage } = req.body;
  db.query(
    'UPDATE employees SET wage = ? WHERE id = ?',
    [wage, id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM employees WHERE id = ?', id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
