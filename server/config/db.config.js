require("dotenv").config();

export const dbURL =
  process.env.NODE_ENV === "test"
    ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tffnx.mongodb.net/${process.env.DB_NAME_TEST}?retryWrites=true&w=majority&ssl=true`
    : `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tffnx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&ssl=true`;
