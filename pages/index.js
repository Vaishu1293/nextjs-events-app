import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import Head from "next/head";


export default function HomePage(props){
    return (<div>
        <Head>
            <title>NextJS Events</title>
            <meta name="description" content="Find a lot of great events that allow you to evolve..." />
        </Head>
        <EventList items={props.featuredEvents}/>
    </div>);
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            featuredEvents: featuredEvents
        },
        revalidate: 1800
    }
}