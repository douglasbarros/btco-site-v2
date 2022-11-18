export type ServicePayment = {
  id: number;
  attributes: {
    date_ini: Date;
    hash: string;
    amount_hours: number;
    amount_btco: number;
    amount_paid: number;
    payment_state: string;
    error: string;
    source_account: string;
    destination_account: string;
    merchant_notified: boolean;
    token: string;
  };
};

export type Service = {
  id: number;
  attributes: {
    name: string;
    active: boolean;
    price_per_hour: number;
    description: string;
    image: string;
  };
};
