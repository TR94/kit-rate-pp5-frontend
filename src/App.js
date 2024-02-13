import styles from './App.module.css'
import './App.css';
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import ProductCreateForm from './pages/products/ProductCreateForm';
import ProductPage from './pages/products/ProductPage';
import ProductsPage from './pages/products/ProductsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || ""

  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <ProductsPage message="No results found. Adjust the search keyword"/>} />
              <Route exact path="/feed" render={() => (
                <ProductsPage 
                message="No results found. Adjust the search keyword or follow a category"
                filter= {`owner__subscribed__owner__profile=${profile_id}&`}
                />
              )}/>
              <Route exact path="/favourites" render={() => (
                <ProductsPage 
                message="No results found. Adjust the search keyword or favourite a product"
                filter={`favourites__owner__profile=${profile_id}&ordering=-favourites__created_at&`}
                />
              )}/>
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/products/create" render={() => <ProductCreateForm />} />
              <Route exact path="/products/:id" render={() => <ProductPage />}/>
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;