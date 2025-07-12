import Login from "./components/common/Login";
import Home from "./components/admin/Home";
import Layout from "./components/Layout";
import CategoryAdd from "./components/admin/CategoryAdd";
import CategoryList from "./components/admin/CategoryList";
import Missing from "./components/auth/Missing";
import Unauthorized from "./components/auth/Unauthorized";
import ItemAdd from "./components/admin/ItemAdd";
import ItemList from "./components/admin/ItemList"
import LinkPage from "./components/admin/Sidebar";
import RequireAuth from "./components/auth/RequireAuth";
import Products from "./components/customer/Products";
import Cart from "./components/customer/Cart";
import Orders from "./components/customer/Orders";
import AddressAdd from "./components/customer/AddressAdd";
import AddressList from "./components/customer/AddressList";
import CustomerRegister from "./components/customer/CustomerRegister";
import Account from "./components/common/Account";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
    const token = localStorage.getItem("token");
    
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* public routes */}
                    <Route path="login" element={token ? <Navigate to="/" /> : <Login />} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                    <Route path="registration" element={token ? <Navigate to="/" /> : <CustomerRegister/>}/>
                    

                    {/* we want to protect these routes */}
                    <Route element={<RequireAuth allow_user={"admin"} />}>
                        {/* admin routes */}
                        <Route path="dashboard" element={<Home />} />
                    
                        <Route path="category-add" element={<CategoryAdd />} />
                        <Route path="category-edit/:cId/:cName" element={<CategoryAdd />} />
                    
                        <Route
                            path="category-list"
                            element={<CategoryList />}
                        />
                    
                        <Route path="item-add" element={<ItemAdd />} />
                        <Route path="item-edit/:iId/:cId/:iName/:iPrice" element={<ItemAdd />} />

                        <Route
                            path="item-list"
                            element={<ItemList />}
                        />
                    </Route>
                    <Route element={<RequireAuth allow_user={"customer"} />}>

                        {/* customer routes */}
                        <Route path="/" element={<Products/>}/>
                        <Route path="cart" element={<Cart/>}/>
                        <Route path="orders" element={<Orders/>}/>
                        <Route path="address-add" element={<AddressAdd/>}/>
                        <Route path="address-list" element={<AddressList/>}/>
                        
                        <Route path="account" element={<Account/>}/>
                    </Route>

                    {/* catch all */}
                    <Route path="*" element={<Missing />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
