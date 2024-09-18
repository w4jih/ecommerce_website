import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {
    customer: Customer|undefined;
    shippingAddress: Address=new Address();
    billingAddress: Address=new Address();
    order: Order|undefined;
    orderItems:OrderItem[]=[];
}
