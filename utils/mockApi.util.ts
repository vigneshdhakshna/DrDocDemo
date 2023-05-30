// import express, { Request, Response } from "express";

// const app = express();
 export const port = 6969;

// app.use(express.json());

// interface WeatherData {
//   [city: string]: {
//     temperature: number;
//   };
// }

// const weatherData: WeatherData = {
//   Chennai: { temperature: 25 },
//   Coimbatore: { temperature: 28 },
//   Madurai: { temperature: 30 },
//   Trichy: { temperature: 27 },
//   Thanjavur: { temperature: 33 },
// };

// app.get("/", (req: Request, res: Response) => {
//   res.json(weatherData);
// });

// app.get("/:city", (req: Request, res: Response) => {
//   const { city } = req.params;

//   if (weatherData.hasOwnProperty(city)) {
//     const temperature = weatherData[city].temperature;
//     res.json({ city, temperature });
//   } else {
//     res.status(404).json({ error: "Weather data not found" });
//   }
// });

// app.post("/:city", (req: Request, res: Response) => {
//   const { city } = req.params;
//   const { temperature } = req.body;

//   if (typeof temperature !== "number") {
//     return res.status(400).json({ error: "Temperature must be a number" });
//   }

//   weatherData[city] = { temperature };
//   res.sendStatus(201);
// });

// app.put("/:city", (req: Request, res: Response) => {
//   const { city } = req.params;
//   const { temperature } = req.body;

//   if (typeof temperature !== "number") {
//     return res.status(400).json({ error: "Temperature must be a number" });
//   }

//   if (weatherData.hasOwnProperty(city)) {
//     weatherData[city].temperature = temperature;
//     res.sendStatus(200);
//   } else {
//     res.status(404).json({ error: "Weather data not found" });
//   }
// });

// app.delete("/:city", (req: Request, res: Response) => {
//   const { city } = req.params;

//   if (weatherData.hasOwnProperty(city)) {
//     delete weatherData[city];
//     res.sendStatus(200);
//   } else {
//     res.status(404).json({ error: "Weather data not found" });
//   }
// });

// export const apiServer = app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

