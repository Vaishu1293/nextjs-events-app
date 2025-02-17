import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';
import {getAllEvents} from '../../dummy-data';

export default function AllEventsPage(){
    const events = getAllEvents();
    return (<>
        <div>
            <EventSearch />
            <EventList items={events} />
        </div>
    </>);
}