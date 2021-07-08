import "reflect-metadata";
import {Connection, createConnection, getConnectionOptions,getConnection} from "typeorm";
import {createSingleton} from "./createSingleton";
import {PhoneEntity} from "../../../entities/Phone.entity";


let connectionReadyPromise: Promise<void> | null = null;

export function prepareConnection() {
    if (!connectionReadyPromise) {
        connectionReadyPromise = (async () => {
            // clean up old connection that references outdated hot-reload classes
            try {
                const staleConnection = getConnection();
                await staleConnection.close();
            } catch (error) {
                // no stale connection to clean up
            }

            // wait for new default connection
            const connectionOptions = await getConnectionOptions();
            const options: any = {
                ...connectionOptions,
                entities: [PhoneEntity],
                migrations: []
            };

            await createConnection(options);
        })();
    }

    return connectionReadyPromise;
}

/*export async function  getDbConnection() : Promise<{connection:Connection}> {
    return await createSingleton('my-app-db-space',  async () => {

         const connectionOptions = await getConnectionOptions();
         const options: any = {
             ...connectionOptions,
             entities: [PhoneEntity],
             migrations: []
         };
        return {
             connection: await createConnection(options),
        }
    })
}*/
