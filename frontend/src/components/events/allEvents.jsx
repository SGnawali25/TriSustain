import React, { Fragment, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { load_events } from '../../actions/eventActions';
import Event from './event';


const allEvents = () => {

    const dispatch = useDispatch();
    const {events, error} = useSelector(state => state.all_events)

    useEffect(() => {
        dispatch(load_events())
    }, [dispatch, error])


  return (
    <Fragment>
        <div className="events">
            {events && events.map(event => (
                                                <Event key={event._id} id = {event._id} event={event} col={4}  name = {event.name}/>
                                            ))}
        </div>


    </Fragment>
  )
}

export default allEvents