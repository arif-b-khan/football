import { Model } from 'sequelize';
import { Column, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
