import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Customer } from './customer';

@Entity({ tableName: 'Invoice' })
export class Invoice {
  @PrimaryKey({ fieldName: 'InvoiceId' })
  id!: number;

  @ManyToOne({
    entity: () => Customer,
    fieldName: 'CustomerId',
    index: 'IFK_InvoiceCustomerId',
  })
  customer!: Customer;

  @Property({ fieldName: 'InvoiceDate' })
  invoiceDate!: Date;

  @Property({ fieldName: 'BillingAddress', length: 70, nullable: true })
  billingAddress!: string;

  @Property({ fieldName: 'BillingCity', length: 40, nullable: true })
  billingCity?: string;

  @Property({ fieldName: 'BillingState', length: 40, nullable: true })
  billingState?: string;

  @Property({ fieldName: 'BillingCountry', length: 40, nullable: true })
  billingCountry?: string;

  @Property({ fieldName: 'BillingPostalCode', length: 10, nullable: true })
  billingPostalCode?: string;

  @Property({ fieldName: 'Total', columnType: 'decimal(10,2)' })
  total!: string;
}
