import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Employee } from '../employee/employee';
import { strict as assert } from 'assert';
import * as EmailValidator from 'email-validator';

@Entity({ tableName: 'Customer' })
export class Customer {
  @PrimaryKey({ fieldName: 'CustomerId' })
  id: number;

  @Property({ fieldName: 'FirstName', length: 40 })
  firstName: string;

  @Property({ fieldName: 'LastName', length: 20 })
  lastName: string;

  @Property({ fieldName: 'Company', length: 80, nullable: true })
  company?: string;

  @Property({ fieldName: 'Address', length: 70, nullable: true })
  address?: string;

  @Property({ fieldName: 'City', length: 40, nullable: true })
  city?: string;

  @Property({ fieldName: 'State', length: 40, nullable: true })
  state?: string;

  @Property({ fieldName: 'Country', length: 40, nullable: true })
  country?: string;

  @Property({ fieldName: 'PostalCode', length: 10, nullable: true })
  postalCode?: string;

  @Property({ fieldName: 'Phone', length: 24, nullable: true })
  phone?: string;

  @Property({ fieldName: 'Fax', length: 24, nullable: true })
  fax?: string;

  @Property({ fieldName: 'Email', length: 60 })
  email: string;

  @ManyToOne({
    entity: () => Employee,
    fieldName: 'SupportRepId',
    nullable: true,
    index: 'IFK_CustomerSupportRepId',
  })
  SupportRepId?: Employee;

  private constructor(
    firstName: string,
    lastName: string,
    email: string,
    company?: string,
    address?: string,
    city?: string,
    state?: string,
    country?: string,
    postalCode?: string,
    phone?: string,
    fax?: string,
  ) {
    this.assertNotEmpty(firstName);
    this.assertNotEmpty(lastName);
    this.assertEmailIsValid(email);

    if (undefined !== company) {
      this.assertNotEmpty(company);
    }

    if (undefined !== address) {
      this.assertNotEmpty(address);
    }

    if (undefined !== city) {
      this.assertNotEmpty(city);
    }

    if (undefined !== state) {
      this.assertNotEmpty(state);
    }

    if (undefined !== country) {
      this.assertNotEmpty(country);
    }

    if (undefined !== postalCode) {
      this.assertNotEmpty(postalCode);
    }

    if (undefined !== phone) {
      this.assertNotEmpty(phone);
    }

    if (undefined !== fax) {
      this.assertNotEmpty(fax);
    }

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.company = company;
    this.address = address;
    this.city = city;
    this.state = state;
    this.country = country;
    this.phone = phone;
    this.postalCode = postalCode;
    this.fax = fax;
  }

  private assertNotEmpty = (string: string): void => {
    assert(string.length > 0);
  };

  private assertEmailIsValid = (email: string): void => {
    if (!EmailValidator.validate(email)) {
      throw new Error(`"${email}" is not a valid e-mail address`);
    }
  };

  static newWith = (
    firstName: string,
    lastName: string,
    email: string,
    company?: string,
    address?: string,
    city?: string,
    state?: string,
    country?: string,
    postalCode?: string,
    phone?: string,
    fax?: string,
  ) =>
    new Customer(
      firstName,
      lastName,
      email,
      company,
      address,
      city,
      state,
      country,
      postalCode,
      phone,
      fax,
    );
}
