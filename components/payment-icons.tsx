export default function PaymentIcons() {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
      <img src="/Visa.png" alt="Visa" className="h-8 w-auto" />
      <img src="/MasterCard.png" alt="Mastercard" className="h-8 w-auto" />
      <img
        src="/AmericanExpress.png"
        alt="American Express"
        className="h-8 w-auto"
      />
      <img src="/GooglePay.png" alt="Google Pay" className="h-8 w-auto" />
      <img src="/Applepay.png" alt="Apple Pay" className="h-8 w-auto" />
      <img src="/PayPal.png" alt="PayPal" className="h-8 w-auto" />
      <img src="/RevolutPay.png" alt="Revolut Pay" className="h-8 w-auto" />
      <img src="/stripe.png" alt="Stripe" className="h-8 w-auto" />
    </div>
  );
}
