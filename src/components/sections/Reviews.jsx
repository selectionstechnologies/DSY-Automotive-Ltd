import { motion } from 'framer-motion';
import { ExternalLink, PenLine } from 'lucide-react';
import { business } from '../../data/site';
import { reviews } from '../../data/reviews';
import { useFade, stagger } from '../ui/Section';

const googleUrl = business.googleReviewsUrl || business.mapLink;

export function ReviewCard({ review }) {
  const date = new Date(`${review.date}T00:00:00`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  return (
    <motion.li variants={useFade()} className="list-none">
      <figure className="card flex h-full flex-col p-6 sm:p-7">
        <blockquote className="flex-1 text-[17px] text-ink">&ldquo;{review.text}&rdquo;</blockquote>
        <figcaption className="mt-6 border-t border-line pt-4 text-sm text-muted">
          <span className="block font-semibold text-ink">{review.name}</span>
          {review.source} · {date}
        </figcaption>
      </figure>
    </motion.li>
  );
}

// Real reviews when the client has supplied them; until then, a link out to Google
export default function ReviewsBlock({ limit }) {
  if (reviews.length) {
    return (
      <motion.ul variants={stagger} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, limit).map((r) => <ReviewCard key={`${r.name}-${r.date}`} review={r} />)}
      </motion.ul>
    );
  }
  return (
    <div className="card flex flex-col items-start gap-6 p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <h3>See what our customers say on Google</h3>
        <p className="mt-2 text-muted">Read reviews from local drivers on our Google profile. Been in recently? We would really value your feedback.</p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="btn-dark">
          Read our Google reviews
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
          <PenLine className="h-4 w-4" aria-hidden="true" />
          Leave us a review
        </a>
      </div>
    </div>
  );
}
