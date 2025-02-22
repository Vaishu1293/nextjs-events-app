import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';
import { getAllEvents } from '../../helpers/api-util';
import Head from 'next/head';

export default function AllEventsPage(props){
    const events = props.events;
    const router = useRouter();
    function findEventsHandler(year, month){
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }
    return (<>
        <div>
        <Head>
            <title>All Events</title>
            <meta name="description" content="Find a lot of great events that allow you to evolve..." />
        </Head>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </div>
    </>);
}

export async function getStaticProps() {
    const events = await getAllEvents();
    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}