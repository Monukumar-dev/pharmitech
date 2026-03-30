"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "@/store/slices/eventSlice";

import Preloader from "@/components/Preloader";
import HeroSection from "./HeroSection";
import UpcomingSection from "./UpcomingSection";
import PastEvents from "./PastEvents";


export default function EventsPage() {

  const dispatch = useDispatch();
  const { loading, error, upcomingEvents, pastEvents } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents({ page: 1, recPerPg: 10 }));
  }, [dispatch]);


 if (loading) return <Preloader opacity={0.95} />

 if (error) {
    return (
      <div className="text-center py-5 text-danger">
        {error}
      </div>
    );
  }
  return (
    <div className="bgPattern1">
    <HeroSection upcomingCount={upcomingEvents.length}  pastEvents={pastEvents.length} />
    <UpcomingSection events={upcomingEvents} loading={loading} />
    <PastEvents events={pastEvents} loading={loading} />
    </div>
  );
}