import Seo from '../components/layout/Seo';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import ReviewsBlock from '../components/sections/Reviews';
import CtaBand from '../components/ui/CtaBand';
import { MessageSquareQuote } from 'lucide-react';

export default function Reviews() {
  return (
    <>
      <Seo
        title="Customer Reviews for Our Old Trafford Garage"
        description="Read what customers say about DSY Automotive on Google, or leave a review of your visit to our Chorlton Road garage."
        path="/reviews"
      />
      <PageHero eyebrow="Reviews" title="What our customers say" intro="Honest feedback from local drivers helps us improve, and helps others choose a garage." icon={MessageSquareQuote} />
      <Section>
        <div className="container-x">
          <ReviewsBlock />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
