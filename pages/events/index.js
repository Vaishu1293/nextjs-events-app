import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';
import {getAllEvents} from '../../dummy-data';

export default function AllEventsPage(){
    const router = useRouter();
    const events = getAllEvents();
    function findEventsHandler(year, month){
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }
    return (<>
        <div>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </div>
    </>);
}