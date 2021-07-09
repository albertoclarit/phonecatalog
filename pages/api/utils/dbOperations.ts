import {PhoneEntity} from "../../../entities/Phone.entity";
import {prepareConnection} from "./getDbConnection";
import {getConnection} from "typeorm";

export async function upsertPhone(entity:PhoneEntity): Promise<PhoneEntity>{
     await prepareConnection()
     let  connection  = await getConnection()
     let phoneRepository = connection.getRepository(PhoneEntity)
   /*  if(entity.id){
          entity = await phoneRepository.findOne(entity.id)
     }*/


    entity = await phoneRepository.save(entity)


     return entity

}
export async function getAllPhones(): Promise<PhoneEntity[]>{
     await prepareConnection()
     let  connection  = await getConnection()
     let phoneRepository = connection.getRepository(PhoneEntity)

     return  await phoneRepository.find({
         order: {
             name: "ASC",
         }
     })
}
export async function deletePhoneEntity(id:string) : Promise<boolean>{
    await prepareConnection()
    let  connection  = await getConnection()
    let phoneRepository = connection.getRepository(PhoneEntity)
    let entity = await phoneRepository.findOne(id)
     await phoneRepository.remove(entity)

    return true
}
