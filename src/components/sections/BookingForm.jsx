import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Copy, Phone, Send, Loader2 } from 'lucide-react';
import { business } from '../../data/site';
import { services, groups, getService } from '../../data/services';
import { getHours } from '../../data/hours';
import { todayISO } from '../../lib/openStatus';
import { submitBooking } from '../../lib/submitBooking';

// variant="book": the full booking form. variant="contact": name, phone, email and message only.
const FIELDS = {
  book: ['name', 'phone', 'email', 'reg', 'vehicle', 'service', 'date', 'slot', 'message', 'consent'],
  contact: ['name', 'phone', 'email', 'message', 'consent'],
};

const empty = { name: '', phone: '', email: '', reg: '', vehicle: '', service: '', date: '', slot: '', message: '', consent: false };

const dayName = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'long' });
const cleanReg = (v) => v.toUpperCase().replace(/[^A-Z0-9]/g, '');

function validate(v, variant) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';

  const phone = v.phone.replace(/[\s()-]/g, '');
  if (!phone) e.phone = 'Please enter a phone number so we can call you back.';
  else if (!/^(?:0|\+44)\d{9,10}$/.test(phone)) e.phone = 'Enter a UK number, e.g. 07123 456789 or 0161 123 4567.';

  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'That email address does not look right.';

  if (variant === 'book') {
    const reg = cleanReg(v.reg);
    if (!reg) e.reg = 'Please enter the registration.';
    else if (!/^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{2,8}$/.test(reg)) e.reg = 'Enter a UK registration, e.g. AB12 CDE.';

    if (v.vehicle.trim().length < 2) e.vehicle = 'Please enter the make and model, e.g. Ford Focus.';
    if (!v.service) e.service = 'Please choose a service.';

    if (!v.date) e.date = 'Please choose a date.';
    else if (v.date < todayISO()) e.date = 'Please choose today or a later date.';
    else if (getHours(dayName(v.date))?.closed) e.date = `We are closed on ${dayName(v.date)}. Please pick another day.`;
  } else if (v.message.trim().length < 5) {
    e.message = 'Please tell us how we can help.';
  }

  if (v.message.length > 600) e.message = 'Please keep it to 600 characters or fewer.';
  if (!v.consent) e.consent = 'Please tick this box so we can contact you about your request.';
  return e;
}

function Field({ id, label, error, optional, hint, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {optional ? <span className="ml-1 font-normal text-muted">(optional)</span> : <span className="ml-0.5 text-danger" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">{hint}</p>}
      <ErrorText id={id} error={error} />
    </div>
  );
}

function ErrorText({ id, error }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      {error}
    </p>
  );
}

function Result({ result, onReset }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
    } catch { /* clipboard blocked: the text is still selectable */ }
  };
  const lead = {
    whatsapp: 'WhatsApp has opened with your message. Press send there to reach us.',
    sms: 'Your messages app has opened with your details. Press send to reach us.',
    copy: 'Copy the message below and text it to us, or simply give us a call.',
  }[result.channel];

  return (
    <div className="card p-6 sm:p-8">
      <p className="flex items-center gap-2 font-heading text-xl font-bold text-ink">
        <CheckCircle2 className="h-6 w-6 text-success" aria-hidden="true" />
        Nearly done
      </p>
      <p className="mt-2 text-muted">{lead} We&rsquo;ll confirm by phone.</p>
      <label htmlFor="booking-summary" className="mt-6 block text-sm font-semibold">What you are sending</label>
      <textarea id="booking-summary" readOnly rows={Math.min(12, result.text.split('\n').length + 1)} value={result.text}
        className="input mt-2 resize-none bg-surface-2 font-mono text-sm" onFocus={(e) => e.target.select()} />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <a href={business.phoneHref} className="btn-primary">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {business.phone}
        </a>
        <button type="button" onClick={copy} className="btn-outline">
          <Copy className="h-4 w-4" aria-hidden="true" />
          {copied ? 'Copied' : 'Copy message'}
        </button>
        <button type="button" onClick={onReset} className="btn text-ink underline underline-offset-4 hover:bg-surface-2">
          Start again
        </button>
      </div>
    </div>
  );
}

export default function BookingForm({ variant = 'book' }) {
  const fields = FIELDS[variant];
  const [params] = useSearchParams();
  const [values, setValues] = useState(empty);
  const [problems, setProblems] = useState({});
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [minDate, setMinDate] = useState(undefined);
  const statusRef = useRef(null);

  // Pre-select a service from ?service=<slug> (e.g. coming from a service page)
  useEffect(() => {
    const slug = params.get('service');
    if (slug && getService(slug)) setValues((v) => ({ ...v, service: slug }));
  }, [params]);

  useEffect(() => setMinDate(todayISO()), []);

  const update = (name, value) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setProblems(validate(next, variant));
  };

  const onChange = (e) => update(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);

  const onBlur = (e) => {
    const { name } = e.target;
    let next = values;
    if (name === 'reg') {
      next = { ...values, reg: cleanReg(values.reg) };
      setValues(next);
    }
    setTouched((t) => ({ ...t, [name]: true }));
    setProblems(validate(next, variant));
  };

  const show = (name) => (touched[name] ? problems[name] : undefined);
  const aria = (name, hint) => ({
    'aria-invalid': Boolean(show(name)),
    'aria-describedby': show(name) ? `${name}-error` : hint ? `${name}-hint` : undefined,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values, variant);
    setProblems(found);
    setTouched(fields.reduce((a, k) => ({ ...a, [k]: true }), {}));
    const first = fields.find((k) => found[k]);
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    setSending(true);
    const date = values.date
      ? new Date(`${values.date}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : '';
    const sent = submitBooking({
      heading: variant === 'book' ? 'I would like to book my car in.' : 'I have a question.',
      lines: [
        ['Name', values.name.trim()],
        ['Phone', values.phone.trim()],
        ['Email', values.email.trim()],
        ['Reg', cleanReg(values.reg)],
        ['Vehicle', values.vehicle.trim()],
        ['Service', values.service && (getService(values.service)?.title ?? 'Not sure, please advise')],
        ['Preferred date', date],
        ['Time', values.slot === 'am' ? 'Morning' : values.slot === 'pm' ? 'Afternoon' : ''],
        [variant === 'book' ? 'Problem' : 'Message', values.message.trim()],
      ],
    });
    setResult(sent);
    setSending(false);
    setValues(empty);
    setTouched({});
    setProblems({});
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const errorCount = Object.keys(problems).filter((k) => touched[k]).length;

  return (
    <div>
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {result && <Result result={result} onReset={() => setResult(null)} />}
        {!result && errorCount > 0 && (
          <p className="sr-only">{`There ${errorCount === 1 ? 'is 1 problem' : `are ${errorCount} problems`} with the form.`}</p>
        )}
      </div>

      {!result && (
        <form noValidate onSubmit={onSubmit} aria-label={variant === 'book' ? 'Booking form' : 'Contact form'}
          className="card grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
          <Field id="name" label="Full name" error={show('name')}>
            <input id="name" name="name" type="text" autoComplete="name" className="input"
              value={values.name} onChange={onChange} onBlur={onBlur} {...aria('name')} />
          </Field>

          <Field id="phone" label="Mobile number" error={show('phone')} hint="We call to confirm.">
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className="input" placeholder="07123 456789"
              value={values.phone} onChange={onChange} onBlur={onBlur} {...aria('phone', true)} />
          </Field>

          <Field id="email" label="Email" optional error={show('email')} className={variant === 'contact' ? 'sm:col-span-2' : ''}>
            <input id="email" name="email" type="email" autoComplete="email" className="input"
              value={values.email} onChange={onChange} onBlur={onBlur} {...aria('email')} />
          </Field>

          {variant === 'book' && (
            <>
              <Field id="reg" label="Vehicle registration" error={show('reg')}>
                <input id="reg" name="reg" type="text" autoComplete="off" autoCapitalize="characters" spellCheck={false}
                  className="input font-semibold uppercase tracking-wider" placeholder="AB12CDE"
                  value={values.reg} onChange={(e) => update('reg', e.target.value.toUpperCase())} onBlur={onBlur} {...aria('reg')} />
              </Field>

              <Field id="vehicle" label="Make & model" error={show('vehicle')} className="sm:col-span-2">
                <input id="vehicle" name="vehicle" type="text" autoComplete="off" className="input" placeholder="e.g. Vauxhall Corsa 1.2"
                  value={values.vehicle} onChange={onChange} onBlur={onBlur} {...aria('vehicle')} />
              </Field>

              <Field id="service" label="Service" error={show('service')} className="sm:col-span-2">
                <select id="service" name="service" className="input" value={values.service} onChange={onChange} onBlur={onBlur} {...aria('service')}>
                  <option value="">Choose a service</option>
                  {groups.map((g) => (
                    <optgroup key={g} label={g}>
                      {services.filter((s) => s.group === g).map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                    </optgroup>
                  ))}
                  <option value="not-sure">Not sure, please advise</option>
                </select>
              </Field>

              <Field id="date" label="Preferred date" error={show('date')}>
                <input id="date" name="date" type="date" min={minDate} className="input"
                  value={values.date} onChange={onChange} onBlur={onBlur} {...aria('date')} />
              </Field>

              <fieldset>
                <legend className="mb-2 block text-sm font-semibold text-ink">
                  Time of day <span className="font-normal text-muted">(optional)</span>
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {[['am', 'Morning'], ['pm', 'Afternoon']].map(([val, label]) => (
                    <label key={val} className={`flex min-h-[48px] cursor-pointer items-center justify-center rounded-ui border px-3 text-[15px] font-medium transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ${values.slot === val ? 'border-ink bg-brand text-brand-ink' : 'border-line-strong bg-surface hover:border-ink'}`}>
                      <input type="radio" name="slot" value={val} checked={values.slot === val} onChange={onChange} className="sr-only" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}

          <Field id="message" label={variant === 'book' ? 'What is the car doing?' : 'How can we help?'} optional={variant === 'book'} error={show('message')} className="sm:col-span-2">
            <textarea id="message" name="message" rows="4" maxLength={600} className="input resize-y"
              placeholder={variant === 'book' ? 'e.g. Squeal from the front when braking, started last week' : ''}
              value={values.message} onChange={onChange} onBlur={onBlur} {...aria('message')} />
          </Field>

          <div className="sm:col-span-2">
            <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-[15px]">
              <input id="consent" name="consent" type="checkbox" checked={values.consent} onChange={onChange} onBlur={onBlur}
                className="mt-0.5 h-5 w-5 shrink-0 rounded accent-charcoal" {...aria('consent')} />
              <span>
                I agree to {business.name} contacting me about this request, and I have read the{' '}
                <Link to="/privacy-policy" className="link">privacy policy</Link>.
                <span className="text-danger" aria-hidden="true"> *</span>
              </span>
            </label>
            <ErrorText id="consent" error={show('consent')} />
          </div>

          <div className="sm:col-span-2">
            <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto">
              {sending ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
              {sending ? 'Preparing…' : variant === 'book' ? 'Send booking request' : 'Send message'}
            </button>
            <p className="mt-3 text-sm text-muted">
              Prefer to talk? Call <a href={business.phoneHref} className="link">{business.phone}</a>.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
