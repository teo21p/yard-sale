import React, { useReducer } from 'react';
import { Layout } from "./Layout";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from "./Pages/Home";
import { Menu } from "./Pages/Menu";
import { Cart } from "./Pages/Cart";

// utils
import { initialState, reducer } from "./globalState";

// css
import './App.scss';
import { ActionType, StateInterface } from './globalTypes';

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState())

  React.useEffect(() => {
    try{
      fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => dispatch({ type: "ADD_INITIAL_ITEMS", payload: data }))
    }catch(err){
      dispatch({ type: "ERROR" })
    }
  }, [])

  return (
    <section className="App">
      <BrowserRouter>
        <Layout 
          dispatch={dispatch}
          notificationsFlag={state.shoppingCart.length}
          current={state.current}>
          <Routes>
            <Route path="/" element={
              <Home
                state={state as StateInterface}
                dispatch={dispatch}
              />
            }/>
            <Route path="/menu" element={
              <Menu 
                state={state as StateInterface}
                dispatch={dispatch}
              />
            }/>
            <Route path='/shopping-cart' element={
              <Cart 
                state={state as StateInterface}
                dispatch={dispatch}
              />
            }/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </section>
  );
}

export default App;
