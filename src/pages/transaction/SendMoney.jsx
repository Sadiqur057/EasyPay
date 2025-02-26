import CreateTransaction from "./CreateTransaction";

const SendMoney = () => {
  return (
    <CreateTransaction requiredPin={false} title="Send Money" successMessage="Your send money is successful" transaction_type="1"/>
  );
};

export default SendMoney;
