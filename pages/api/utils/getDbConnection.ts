import {Connection, createConnection} from "typeorm";
import {createSingleton} from "./createSingleton";


export async function  getDbConnection() : Promise<{connection:Connection}> {
    return await createSingleton('my-app-db-space',  async () => {
        return {
             connection: await createConnection(),
        }
    })
}
