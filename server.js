const fs = require("fs");
const express = require("express");
const app = express();

// midleware untuk membaca json dari req body ke kita
app.use(express.json());

//default URL
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success!",
    message: "Aplication is running...",
  });
});

const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8")
);
// /api/v1/collection
app.get("/api/v1/cars", (req, res) => {
  try {
    res.status(200).json({
      status: "Success!",
      message: "Success get cars data",
      totalData: cars.length,
      data: { cars },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed!",
      message: "failed get cars data..",
      isSuccess: false,
      data: null,
    });
  }
});

app.get("/rizal", (req, res) => {
  res.status(200).json({
    message: "Ping successfully!",
  });
  // if (app.get('/', (req, res) => {
  //     res.end("RAWR")
  // })) {

  // } else {
  //     console.log("err")
  // }
});

// get params
app.get("/api/v1/cars/:name/:id", (req, res) => {
  // SELECT * FROM
  console.log({ data: req.params.id });
  const newCar = req.body;

  cars.push(newCar);
  fs.writeFile(
    `${__dirname}/assets/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        status: "Success!",
        message: "Success get cars data",
        data: { car: newCar },
      });
    }
  );
});

// get params by id
app.get("/api/v1/cars/:id", (req, res) => {
  // SELECT * FROM
  const id = req.params.id;
  console.log(id);
  const car = cars.find((i) => i.id == id);

  if (!car) {
    return res.status(404).json({
      status: "Failed!",
      message: `Failed get data from id: ${id}`,
      isSuccess: false,
      data: null,
    });
  }

  res.status(200).json({
    status: "Success",
    car: { car },
  });
});

// app.post adding body
app.post("/api/v1/cars", (req, res) => {
  const newCar = req.body;

  cars.push(newCar);
  fs.writeFile(
    `${__dirname}/assets/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        status: "Success!",
        message: "Success get cars data",
        data: { car: newCar },
      });
    }
  );
});

app.patch("/api/v1/cars/:id", (req, res) => {
  // UPDATE... FROM (table) WHERE id=req.params.id
  const id = req.params.id;
  const newCar = cars.find((i) => i.id == id);

  // object destructuring
  const { name, year, type } = req.body;
  console.log(id);
  const car = cars.find((c) => c.id == id);

  // mencari car by id
  const carIndex = cars.findIndex((c) => c.id == id);
  console.log(carIndex);

  // error handling
  if (!car) {
    return res.status(404).json({
      status: "Failed!",
      message: `Failed update data from id: ${id}`,
      isSuccess: false,
      data: null,
    });
  }
  // update sesuai request body
  // object assign = menggunakan object spread operator
  cars[carIndex] = { ...cars[carIndex], ...req.body };

  // rewrite
  fs.writeFile(
    `${__dirname}/assets/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        status: "Success!",
        message: "Success get cars data",
      });
    }
  );

  res.status(200).json({
    status: "Success",
    message: "Update data",
    data: { car: newCar },
  });
});

//delete
app.delete("/api/v1/cars/:id", (req, res) => {
  // UPDATE... FROM (table) WHERE id=req.params.id
  const id = req.params.id;
  const newCar = cars.find((i) => i.id == id);

  // object destructuring
  const { name, year, type } = req.body;
  console.log(id);
  const car = cars.find((c) => c.id == id);

  // mencari car by id
  const carIndex = cars.findIndex((c) => c.id == id);
  console.log(carIndex);

  // error handling
  if (!car) {
    return res.status(404).json({
      status: "Failed!",
      message: `Failed update data from id: ${id}`,
      isSuccess: false,
      data: null,
    });
  }
  // update sesuai request body
  // object assign = menggunakan object spread operator
  cars[carIndex] = { ...cars[carIndex], ...req.body };
  cars.splice(carIndex, 1);
  // rewrite
  fs.writeFile(
    `${__dirname}/assets/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        status: "Success!",
        message: "Success get cars data",
      });
    }
  );

  res.status(200).json({
    status: "Success",
    message: "Update data",
    data: { car: newCar },
  });
});

// middleware / handler untuk URL yang tidak dapat diakses
app.use((req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "URL not exist",
  });
});

app.listen("3000", () => {
  console.log("Server berjalan di PORT 3000");
});
