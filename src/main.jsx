import { createRoot } from 'react-dom/client'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import NavBar from './landingPage/NavBar'
import Notfound from './NotFound'
import AllFunds from './landingPage/DashBoard/AllFunds'
import Dashboard from './landingPage/DashBoard/DashBoard.jsx'
import NewFundRaise from './landingPage/NewFundRaise.jsx/NewFundRaise.jsx'
import FundInfo from './landingPage/DashBoard/FundInfo.jsx'
import Login from './landingPage/Auth/Login.jsx'
import SignUp from './landingPage/Auth/SignUp.jsx'
import DonatePortal from './landingPage/Transactions/DonatePortal.jsx'
import TransactionHistory from './landingPage/Transactions/TransactionHistory.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <NavBar/>
  
  <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/donate/:id' element={<DonatePortal/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/allFunds' element={<AllFunds/>}/>
    <Route path='/newFundRaise/:id' element={<NewFundRaise/>}/>
    <Route path='/transactions/:id' element={<TransactionHistory/>}/>
    <Route path='/fund/:id' element={<FundInfo/>}/>
    <Route path='/*' element={<Notfound/>}/>
  </Routes>
  </BrowserRouter>

)
