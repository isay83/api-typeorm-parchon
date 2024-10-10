import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./Department";
import { User } from "./User";

@Entity()
export class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @ManyToOne(() => Department, (department) => department.cities)
    @JoinColumn({ name: "id_department" })
    id_department: Department;

    @OneToMany(() => User, (user) => user.id_city)
    users: User[];
}