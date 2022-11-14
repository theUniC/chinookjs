import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Employee' })
export class Employee {
  @PrimaryKey({ fieldName: 'EmployeeId' })
  id!: number;

  @Property({ fieldName: 'LastName', length: 20 })
  lastName!: string;

  @Property({ fieldName: 'FirstName', length: 20 })
  firstName!: string;

  @Property({ fieldName: 'Title', length: 30, nullable: true })
  title!: string;

  @ManyToOne({
    entity: () => Employee,
    fieldName: 'ReportsTo',
    nullable: true,
    index: 'IFK_EmployeeReportsTo',
  })
  ReportsTo?: Employee;

  @Property({ fieldName: 'BirthDate', nullable: true })
  birthDate!: Date;

  @Property({ fieldName: 'HireDate', nullable: true })
  hireDate!: Date;

  @Property({ fieldName: 'Address', length: 70, nullable: true })
  address!: string;

  @Property({ fieldName: 'City', length: 40, nullable: true })
  city!: string;

  @Property({ fieldName: 'State', length: 40, nullable: true })
  state!: string;

  @Property({ fieldName: 'Country', length: 40, nullable: true })
  country!: string;

  @Property({ fieldName: 'PostalCode', length: 10, nullable: true })
  postalCode!: string;

  @Property({ fieldName: 'Phone', length: 24, nullable: true })
  phone!: string;

  @Property({ fieldName: 'Fax', length: 24, nullable: true })
  fax!: string;

  @Property({ fieldName: 'Email', length: 60, nullable: true })
  email!: string;
}
