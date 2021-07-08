import {MigrationInterface, QueryRunner} from "typeorm";

export class createPhoneTable1625722765995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
         
         CREATE TABLE public.phone (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" varchar NULL,
                manufacturer varchar NULL,
                description varchar NULL,
                color varchar NULL,
                price numeric(15,2) NULL,
                imagefilename varchar NULL,
                bucketfilename varchar NULL,
                screen varchar NULL,
                processor varchar NULL,
                ram numeric(15,2) NULL,
                date_created information_schema."time_stamp" NULL,
                date_updated information_schema."time_stamp" NULL,
                "version" int4 NULL
);

         ALTER TABLE public.phone ADD CONSTRAINT phone_pk PRIMARY KEY (id);

         
        `)
    }

    // @ts-ignore
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
