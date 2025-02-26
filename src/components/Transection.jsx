import { IoMdAddCircle } from "react-icons/io";
import { IoCashOutline } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../provider/AuthContext';
import api from '../interceptors/axiosInstance';
const Transaction = () => {

  const { user, loading } = useContext(AuthContext);
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const result = await api.get('/transaction');
      setData(result?.data?.data)
    }
    getData()
  }, [])

  const renderTransactionIcon = (type) => {
    switch (type) {
      case '1':
        return <BsFillSendFill className='text-white text-xl' />;
      case '2':
        return <IoCashOutline className='text-white text-xl' />;
      case '3':
        return <IoCashOutline className='text-white text-xl' />;
      case '4':
        return <IoMdAddCircle className='text-white text-xl' />;
      default:
        return "?"
    }
  };

  if (loading) {
    return "loading.."
  }
  return (
    <div>
      {data?.map((transaction, index) => (
        <div key={index} className='py-2 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='rounded-full w-12 h-12 bg-gray-900 flex justify-center items-center' alt="transaction_type" >
              {renderTransactionIcon(transaction?.transaction_type)}
            </div>
            <div>
              <p className='text-lg font-semibold'>{transaction.receiver_number === user?.phone ? transaction?.sender_number : transaction?.receiver_number}</p>
              <p className='text-sm'>{transaction.transaction_time}</p>
            </div>
          </div>
          <div>
            <p className='font-bold'>{transaction.receiver_number === user?.phone ? "+" : '-'} Tk. {transaction.amount}</p>
            <p className='text-sm'></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transaction;