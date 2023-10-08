import React, {useState, Fragment} from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux';


import { useAlert } from 'react-alert';
import { create_event } from '../../actions/eventActions';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const createEvent = () => {
    const params = useParams();
    const type = params.type;

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [event, setEvent] = useState({name: "", eventStartDate:"", eventEndDate:"", description :"", location :"", xToEarn: "", host: "", price: "", eventType:""})

    const setEvents = (e) => {

        const {name, value} = e.target;
        setEvent((prev) => {
            return {
                ...prev,[name] : value
            }
        }

        )
    }

    event.eventType = type;

    const {user} = useSelector(state => state.auth)
    if (user){
        event.host = user.name;
    }else{
        event.host = null;
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(create_event(event))
        alert.success("event created successfully");
        navigate("/")

    }
  return (
    <Fragment>

    <MetaData title={'Register User'} />

    <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                <h1 className="mb-3">Create an Event</h1>

                <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                        type="name"
                        id="name_field"
                        className="form-control"
                        name='name'
                        value={event.name}
                        onChange= {setEvents}
                    />
                </div>



                <div className="form-group">
                    <label htmlFor="startDate">Event Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        className="form-control"
                        name='eventStartDate'
                        value={event.eventStartDate}
                        onChange={setEvents}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">Event End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        className="form-control"
                        name='eventEndDate'
                        value={event.eventEndDate}
                        onChange={setEvents}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">location</label>
                    <input
                        type="name"
                        id="location"
                        className="form-control"
                        name='location'
                        value={event.location}
                        onChange={setEvents}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="name"
                        id="description"
                        className="form-control"
                        name='description'
                        value={event.description}
                        onChange={setEvents}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="xToEarn">x-to-earn</label>
                    <input
                        type="name"
                        id="xToEarn"
                        className="form-control"
                        name='xToEarn'
                        value={event.xToEarn}
                        onChange={setEvents}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Ticket Price</label>
                    <input
                        type="number"
                        id="price"
                        className="form-control"
                        name='price'
                        value={event.price}
                        onChange={setEvents}
                    />
                </div>


                

                <button
                    id="register_button"
                    type="submit"
                    className="btn btn-block py-3"
                    // disabled={loading ? true : false}
                >
                    REGISTER
                </button>
            </form>
        </div>
    </div>

</Fragment>
  )
}

export default createEvent