import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn} from "typeorm";

@Entity("phone")
export class PhoneEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    manufacturer: string

    @Column()
    description: string

    @Column()
    color: string

    @Column()
    price: number

    @Column({name:"imagefilename"})
    imageFileName: string

    @Column()
    screen: string

    @Column()
    processor: string

    @Column()
    ram: number

    @CreateDateColumn({
        type:'timestamp',
        name:'date_created'
    })
    dateCreated: Date

    @UpdateDateColumn({
        type:'timestamp',
        name:'date_updated'
    })
    dateUpdated: Date

    @VersionColumn()
    version: number

}
