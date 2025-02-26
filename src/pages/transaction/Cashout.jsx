import CreateTransaction from "./CreateTransaction";

const Cashout = () => {
  return (
    <CreateTransaction
      isCashOut={true}
      requiredPin={true}
      title="Cash Out"
      successMessage="Your Cash out is successful"
      transaction_type="2"
    />
  );
};

export default Cashout;
