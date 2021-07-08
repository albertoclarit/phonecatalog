import {MigrationInterface, QueryRunner} from "typeorm";

export class seedPhones1625749836281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        
 INSERT INTO phone(name,manufacturer,description,color,price,imagefilename,screen,processor,ram) VALUES
 ('Apple iPhone 7','Apple','Apple iPhone 7r.','black',769,'https://phonesdata.com/files/models/Apple-iPhone-7-188.jpg','4.7 inch IPS','A10 Fusion',2)
,('Apple iPhone 8','Apple','Apple iPhone 8.','white',9999,'https://phonesdata.com/files/models/Apple-iPhone-8-691.jpg','4.7", LED-backlit IPS LCD','Hexa-core (2x Monsoon + 4x Mistral)',2)
,('Apple iPhone 8 Plus','Apple','Apple iPhone 8 Plus.','white',9999,'https://phonesdata.com/files/models/Apple-iPhone-8-Plus-877.jpg','5.5", LED-backlit IPS LCD','Hexa-core (2x Monsoon + 4x Mistral)',3)
,('Apple iPhone SE (2020)','Apple','Apple iPhone SE (2020)','red',9999,'https://phonesdata.com/files/models/Apple--iPhone-SE-(2020)-644.jpg','4.7", Retina IPS LCD','Hexa-core (2x2.65 GHz Lightning + 4x1.8 GHz Thunder)',3)
,('Apple iPhone XS','Apple','Apple iPhone XS','black',9999,'https://phonesdata.com/files/models/Apple-iPhone-XS-730.jpg','5.8", Super AMOLED','Hexa-core (2x2.5 GHz Vortex + 4x1.6 GHz Tempest)',4)
,('Apple iPhone XS Max','Apple','Apple iPhone XS Max','black',9999,'https://phonesdata.com/files/models/Apple-iPhone-XS-Max-958.jpg','6.5", Super AMOLED','Hexa-core (2x2.5 GHz Vortex + 4x1.6 GHz Tempest)',4)
,('Apple iPhone XR','Apple','Apple iPhone XR.','black',9999,'https://phonesdata.com/files/models/Apple-iPhone-XR-181.jpg','6.1", IPS LCD','Hexa-core (2x2.5 GHz Vortex + 4x1.6 GHz Tempest)',3)
,('Apple iPhone X','Apple','Apple iPhone X.','black',9999,'https://phonesdata.com/files/models/Apple-iPhone-X-518.jpg','5.8", Super AMOLED','Hexa-core 2.39 GHz (2x Monsoon + 4x Mistral)',3)
,('Apple iPhone 11','Apple','Apple iPhone 11.','black',9999,'https://phonesdata.com/files/models/Apple--iPhone-11-736.jpg','6.1", IPS LCD','Hexa-core (2x2.65 GHz Lightning + 4x1.8 GHz Thunder)',4)
,('Apple iPhone 11 Pro','Apple','Apple iPhone 11 Pro.','grey',9999,'https://phonesdata.com/files/models/Apple--iPhone-11-Pro-566.jpg','5.8", XDR OLED','Hexa-core (2x2.65 GHz Lightning + 4x1.8 GHz Thunder)',4)
,('Apple iPhone 11 Pro Max','Apple','Apple iPhone 11 Pro Max.','black',9999,'https://phonesdata.com/files/models/Apple--iPhone-11-Pro-Max-609.jpg','6.5", OLED','Hexa-core (2x2.65 GHz Lightning + 4x1.8 GHz Thunder)',4)
,('Apple iPhone 12','Apple','Apple iPhone 12.','black',9999,'https://phonesdata.com/files/models/Apple-iPhone-12-187.jpg','6.1", Super Retina XDR OLED','Hexa-core (2x3.1 GHz Firestorm + 4x1.8 GHz Icestorm)',4)
,('Apple iPhone 12 Pro','Apple','Apple iPhone 12 Pro.','black',9999,'https://phonesdata.com/files/models/Apple-iPhone-12-Pro-285.jpg','6.1", Super Retina XDR OLED','Hexa-core (2x3.1 GHz Firestorm + 4x1.8 GHz Icestorm)',6)
,('Apple iPhone 12 Pro Max','Apple','Apple iPhone 12 Pro Max.','black',9999,'https://phonesdata.com/files/models/Apple-iPhone-12-Pro-Max-959.jpg','6.7", Super Retina XDR OLED','Hexa-core (2x3.1 GHz Firestorm + 4x1.8 GHz Icestorm)',6)
,('Apple iPhone 12 Mini','Apple','Apple iPhone 12 Mini.','red',9999,'https://phonesdata.com/files/models/Apple-iPhone-12-mini-413.jpg','5.4", Super Retina XDR OLED','Hexa-core (2x3.1 GHz Firestorm + 4x1.8 GHz Icestorm)',4);



        
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
