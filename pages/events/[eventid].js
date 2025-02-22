import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import { Fragment } from "react";
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Head from "next/head";

export default function EventsDetailPage(props) {
    const event = props?.selectedEvent;
    if (!event) {
        return (
            <div className="center">
                <p>Loading...</p>
            </div>
        );
    }
    return (<Fragment>
        <Head>
            <title>{event.title}</title>
            <meta name="description" content="Find a lot of great events that allow you to evolve..." />
        </Head>
        <EventSummary title={event.title} />
        <EventLogistics
            date={event.date}
            address={event.location}
            image={event.image}
            imageAlt={event.title}
        />
        <EventContent>
            <p>{event.description}</p>
        </EventContent>
    </Fragment>);
}

export async function getStaticProps(context) {
    const eventId = context.params.eventid;
    const event = await getEventById(eventId);
    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30
    };
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({
        params: {
            eventid: event.id
        }
    }));
    return {
        paths: paths,
        fallback: 'blocking'
    };
}