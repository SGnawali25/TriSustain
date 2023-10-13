import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { load_event } from '../../actions/eventActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import axios from 'axios';
import { useAlert } from 'react-alert';

const EventDescription = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [beforeImage, setBeforeImage] = useState("");
  const [afterImage, setAfterImage] = useState("");
  

  const {event, error, loading} = useSelector(state => state.event)
  const {user} = useSelector(state => state.auth)
  useEffect(()=>{
    dispatch(load_event(params.id))
  }, [])

  

  const registerEvent = async() => {
    try {
      const userId = user._id; 
      const eventId = event._id; 
  
      const response = await axios.post(`https://trisustainapi.sandeshgnawali.com.np/api/v1/user/${userId}/event/${eventId}`, {
        userId,
        eventId,
      });

      alert.success("Registered successfully")
      dispatch(load_event(params.id));
      
    } catch (error) {
      alert.error('Registration failed:', error);
    }
  }

  const submitHandler = async() => {
    try{
      const e_id = event._id;
      const imageOne = beforeImage;
      
      const response = await axios.put(`/api/v1/event/${e_id}`, {imageOne})

      alert.success("Before Image uploaded successfully.")
    }catch (error) {
      alert.success("Before Image uploaded successfully.");
    }
  }

  const onChange = (e) => {
        
    const reader = new FileReader();

    reader.onload = () => {
        if (reader.readyState === 2){
            setBeforeImage(reader.result)
        }

    }
    reader.readAsDataURL(e.target.files[0])
}


  return (
    <Fragment>
    {loading ? <Loader /> : (
        <Fragment>
            <MetaData title={`${event.name}`} />
            <div className="row f-flex justify-content-left">
                <div className="col-10 col-lg-5 img-fluid" id="product_image">
                </div>

                <div className="col-10 col-lg-5 mt-5">
                    <h1>{event.name}</h1>
                    <p id="product_id">{event._id}</p>

                    <hr />

              

                    <hr />

                    <p id="product_price">Price: {event.price} $VET </p>
                  
                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" onClick={registerEvent} disabled ={event.registration}>{event.registration ? "Registered": "Register"}</button>

                    <hr />


                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>{event.description}</p>
                    <hr />

                    <h4 className="mt-2">Type:</h4>
                    <p>{event.eventType}</p>
                    <hr />

                    <h4 className="mt-2">X-To-Earn:</h4>
                    <p>{event.xToEarn}</p>
                    <hr />
      
                    <p id="product_seller mb-3">Hosted by: <strong>{event.host}</strong></p>

                    {(event.registrar && event.registrar === user._id) ?(<form id='upload_images' className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Upload Images</h1>

                        <div className="form-group">
                            <label htmlFor="custom-file">Before Image</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className='avatar mr-3 item-rt1'>
                                        <img 
                                        src={beforeImage} 
                                        alt="Avatar Preview"
                                        className='rounded-circle' 
                                        />

                                    </figure>
                              </div>
                              <div className="custom-file">
                                  <input
                                      type="file"
                                      name='avatar'
                                      maxLength="10MB"
                                      accept = ".jpg, .png, .pdf"
                                      className='cutom-file-input'
                                      id='custom-file'
                                    //   accept='/iamges/*'
                                      onChange={onChange}
                                  />
                                  <label htmlFor="custom-file" className="custom-file-label">
                                      Choose Avatar
                                  </label>
                              </div>
                          </div>
        
                        </div>

                        <div className="form-group">
                            <label htmlFor="image_field">After Image</label>
                            <input
                                type="file"
                                id="image_field"
                                className="form-control"
                                name='afterImage'
                                value={afterImage}
                                onChange={(e) => setAfterImage(e.target.value)}
                            />
                        </div>

                      <button htmlFor="upload_images" type="button" className="btn btn-primary mt-4" onClick={submitHandler}>
                          Submit Your Pictures!!!
                      </button>

                    </form>): (<div></div>)}

                    <div className="row mt-2 mb-5">
                        <div className="rating w-50">

                            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">

                                            <ul className="stars" >
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                            </ul>

                                            <textarea name="review" id="review" className="form-control mt-3">

                                            </textarea>

                                            {/* <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </Fragment>
    )}
</Fragment>
  )
}

export default EventDescription