import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { MenuItem } from "./models/menu.model.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });


app.get('/', (req, res) => {
  res.json('Hello World!')
})
const May_need_this_in_future = [
  {
    name: "South indian Thali",
    description: "Dosa + Idli + chutney",
    category: "south indian food",
    price: "100",
  },
  {
    name: "Rice plate",
    description: "Rice + Chole",
    category: "Rice",
    price: "40",
  },
  {
    name: "Chicken plate",
    description: "Chicken + 2 Chapati",
    category: "Chicken platter",
    price: "100",
  },
  {
    name: "Idli",
    description: "4 Idli + chutney",
    category: "South Breakfast",
    price: "40",
  },
  {
    name: "Veg north thali",
    description: "2 chapati + rice + dal + 2 bhaji",
    category: "Veg thali",
    price: "150",
  },
  {
    name: "Onion uttapa",
    description: "4 uttapa + chutney",
    category: "South indian breakfast",
    price: "70",
  },
];

/*



const app = Express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERRR: ", error);
      throw error;
    });
  } catch (error) {
    console.log(error);
    throw err;
    return;
  }
})();

*/
