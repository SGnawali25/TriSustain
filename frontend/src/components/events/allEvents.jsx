import React, { Fragment, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { load_events } from '../../actions/eventActions';
import Event from './event';
import { useParams } from 'react-router';


const allEvents = () => {
    const params = useParams();
    const dispatch = useDispatch();
    let {events, error} = useSelector(state => state.all_events)
    events = events.filter(event => event.eventType === params.type);

    useEffect(() => {
        dispatch(load_events())
    }, [dispatch, error])


  return (
    <Fragment>
        <div className="events">
          <h1>{params.type}</h1>
          <div></div>
            {events && events.map(event => (
                                                <Event key={event._id} id = {event._id} event={event} col={4}  name = {event.name}/>
                                            ))}
        </div>


    </Fragment>
  )
}

export default allEvents