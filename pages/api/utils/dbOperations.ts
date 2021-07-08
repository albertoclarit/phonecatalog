import {PhoneEntity} from "../../../entities/Phone.entity";
import {prepareConnection} from "./getDbConnection";
import {getConnection} from "typeorm";


export async function getAllPhones(): Promise<PhoneEntity[]>{
     await prepareConnection()
     let  connection  = await getConnection()
     let phoneRepository = connection.getRepository(PhoneEntity)

     return  await phoneRepository.find()
}
