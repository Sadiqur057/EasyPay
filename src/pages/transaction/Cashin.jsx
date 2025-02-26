import CreateTransaction from "./CreateTransaction";

const Cashin = () => {
  return (
    <CreateTransaction requiredPin={true} title="Cash In" successMessage="Your Cash In is successful" transaction_type="3" isCashIn={true}/>
  );
};

export default Cashin;
