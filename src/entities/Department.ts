import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./City";

@Entity()
export class Department extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    department: string;

    @OneToMany(() => City, (city) => city.department)
    cities: City[];
}