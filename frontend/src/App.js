import React from 'react';
import { Route } from 'react-router-dom';

import { Home, Cart, Login, Register, Profile, Admin, AdminLogin } from './pages';
import { Header, ModalForm } from './components';
import { ProtectedRoute } from './core/protected.route';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/profile" component={Profile} exact />
        <ProtectedRoute path="/admin" component={Admin} />{' '}
        <Route path="/admin-login" component={AdminLogin} exact />
      </div>{' '}
      <ModalForm />
    </div>
  );
}

export default App;

// class App extends React.Component {
//   componentDidMount() {
//     axios.get('http://localhost:3000/db.json').then(({ data }) => {
//       this.props.setPizzas(data.pizzas);
//     });
//   }
//   render() {
//     console.log(this.props);
//     return (
//       <div className="wrapper">
//         <Header />
//         <div className="content">
//           <Route path="/" render={() => <Home items={this.props.items} />} exact />
//           <Route path="/cart" component={Cart} exact />
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   items: state.pizzas.items,
//   filters: state.filters,
// });

// const mapDispatchToProps = {
//   setPizzas,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
