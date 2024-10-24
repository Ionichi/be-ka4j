import server from "utils/server";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`App listening at port ${PORT}`));
