export interface Cart {
  getTotal(): number;
}

export class BasicCart implements Cart {
  private total: number;

  constructor(total: number) {
    this.total = total;
  }

  getTotal(): number {
    return this.total;
  }
}

export abstract class DiscountDecorator implements Cart {
  protected cart: Cart;

  constructor(cart: Cart) {
    this.cart = cart;
  }

  abstract getTotal(): number;
}

export class PercentageDiscountDecorator extends DiscountDecorator {
  private percentage: number;

  constructor(cart: Cart, percentage: number) {
    super(cart);
    this.percentage = percentage;
  }

  getTotal(): number {
    return this.cart.getTotal() * (1 - this.percentage / 100);
  }
}

export class FixedAmountDiscountDecorator extends DiscountDecorator {
  private discountAmount: number;

  constructor(cart: Cart, discountAmount: number) {
    super(cart);
    this.discountAmount = discountAmount;
  }

  getTotal(): number {
    return Math.max(0, this.cart.getTotal() - this.discountAmount);
  }
}