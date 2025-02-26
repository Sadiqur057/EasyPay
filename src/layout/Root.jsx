import { Outlet } from 'react-router-dom';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';
import { Toaster } from 'react-hot-toast';

const Root = () => {
  return (
    <>
      <NavBar />
      <Toaster/>
      <main className="md:min-h-[calc(100vh-134px)] min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;