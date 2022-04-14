import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Header  from './HeaderComponent';
import Footer from './FooterComponent';
import { Routes, Route, Navigate, useParams, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

class Main extends Component {

    constructor(props) {
        super(props);

    }

    render() {       
        
        const DishWithId = () => {

            const params = useParams();

            return (
                <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(params.dishId, 10))[0]} comments={this.props.comments.filter((comment) => comment.dishId === parseInt(params.dishId, 10))} />
            );
        }
        
        return (
            <div>
                <Header />
                <Routes>
                    <Route path="home" element={<Home dish={this.props.dishes.filter((dish) => dish.featured)[0]} 
                    promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                    />} />
                    <Route exact path="menu" element={<Menu dishes={this.props.dishes} />} />
                    <Route path="menu/:dishId" element={<DishWithId />} />
                    <Route exact path="contactus" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
