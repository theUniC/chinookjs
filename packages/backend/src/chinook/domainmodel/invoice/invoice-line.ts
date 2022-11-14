import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Invoice } from './invoice';
import { Track } from '../track/track';

@Entity({ tableName: 'InvoiceLine' })
export class InvoiceLine {
  @PrimaryKey({ fieldName: 'InvoiceLineId' })
  id!: number;

  @ManyToOne({
    entity: () => Invoice,
    fieldName: 'InvoiceId',
    index: 'IFK_InvoiceLineInvoiceId',
  })
  invoice!: Invoice;

  @ManyToOne({
    entity: () => Track,
    fieldName: 'TrackId',
    index: 'IFK_InvoiceLineTrackId',
  })
  track!: Track;

  @Property({ fieldName: 'UnitPrice', columnType: 'decimal(10,2)' })
  unitPrice!: string;

  @Property({ fieldName: 'Quantity' })
  quantity!: number;
}
