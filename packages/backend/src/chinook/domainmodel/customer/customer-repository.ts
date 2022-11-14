import { Customer } from './customer';

export interface CustomerRepository {
  add(customer: Customer): Promise<void>;
  byId(customerId: number): Promise<Customer | null>;
}
