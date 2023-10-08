import React, { Fragment, useState, useEffect } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Product from './product/product';


import Loader from './layout/Loader';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom'
import { loadUser, clearErrors } from '../actions/userActions';




const Home = () => {
    const params = useParams();

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1,1000])

    const products = [{"name": "Social", "_id": "1"},{"name": "Economic", "_id": 2},{"name": "Environmental", "_id": 3} ]
    const alert = useAlert();
    const dispatch = useDispatch()

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const {isAuthenticated, user, loading} = useSelector(state => state.auth);
    useEffect(() => {
        if (isAuthenticated){
            dispatch(loadUser);
        }
    }, [dispatch, alert, isAuthenticated]);
    

    

    

    

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Home' } />
                    
                    {isAuthenticated && (user.role =="user" ? <h1 id='products_heading'>Register for an event</h1> : <h1 id='products_heading'>Create an event</h1>)}
                    <section id="products" className="container mt-5">
                        <div className="row">
                        {isAuthenticated ? (
                                <Fragment>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} type={product.name}/>
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                <h1>Please Login to view the resources</h1>
                                )}
                        </div>
                    </section>



                </Fragment>
            )}

        </Fragment>
    )
}

export default Home