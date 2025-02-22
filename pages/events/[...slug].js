import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/events/error-alert';
import Button from "../../components/ui/button";
import { getFilteredEvents } from "../../helpers/api-util";
import Head from "next/head";

export default function FilteredEventsPage(props) {
    const pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content={`All events for ${props.date.month}/${props.date.year}.`} />
        </Head>
    );
    if (!props.events) {
        return (
            <Fragment>
                {pageHeadData}
                <p className="center">Loading...</p>
            </Fragment>
        );
    }
    if (props.hasError) {
        return (<Fragment>
            {pageHeadData}
            <ErrorAlert>
                <p>
                    Invalid filter please adjust your values.
                </p>
            </ErrorAlert>
        </Fragment>);
    }
    const filteredEvents = props.events;
    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }
    const date = new Date(props.date.year, props.date.month - 1);
    return (<Fragment>
        {pageHeadData}
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
    </Fragment>);
}

export async function getServerSideProps(context) {
    const { params } = context;
    const filterData = params.slug;
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return {
            props: {
                hasError: true
            }
            // notFound: true,
            // redirect:{
            //     destination: '/error'
            // }
        }
    }
    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    });
    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    };
}