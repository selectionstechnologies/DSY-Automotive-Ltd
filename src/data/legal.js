// TEMPLATE: owner must have this reviewed. These are starting points, not legal advice.
import { business, addressLine } from './site';

const contactLine = `${business.legalName}, ${addressLine}. Phone ${business.phone}${business.email ? `, email ${business.email}` : ''}.`;

export const privacy = {
  updated: '2026-10-28',
  sections: [
    { h: 'Who we are', p: [`This website is run by ${business.legalName} ("we", "us"). We are the data controller for the personal information you send us. ${contactLine}`] },
    {
      h: 'What we collect',
      p: ['When you use the booking or contact form, we collect what you type in:'],
      list: ['Your name and phone number', 'Your email address, if you give it', 'Your vehicle registration, make and model', 'The service you need, your preferred date and a description of the problem'],
    },
    {
      h: 'How it reaches us',
      p: [
        'The form does not store anything on a server. When you press send, your details are put into a message that opens in WhatsApp or your text messages app, or are shown on screen for you to copy. Nothing is sent until you send that message yourself. You can also call us instead.',
        'WhatsApp and your mobile network handle the message under their own privacy policies.',
      ],
    },
    { h: 'Why we use it', p: ['We use your details only to reply to you, arrange the booking, and carry out and invoice the work. Our lawful basis is taking steps at your request before entering into a contract, and performing that contract.'] },
    {
      h: 'Cookies and tracking',
      p: [
        'This site does not use cookies, analytics or advertising trackers.',
        'The map on our contact pages is not loaded until you press "Load map". When you do, Google Maps loads and Google may set cookies under its own policy. If you prefer, use the "Open in Google Maps" link instead.',
        'Fonts are served by Google Fonts, which receives your IP address to deliver them.',
      ],
    },
    { h: 'How long we keep it', p: ['We keep booking messages and job records for as long as we need them to deal with the job and meet our legal and tax obligations, usually up to six years for invoices, then delete them.'] }, // TODO(client): confirm retention
    {
      h: 'Your rights',
      p: ['Under UK GDPR you have the right to ask for a copy of your data, ask us to correct or delete it, object to how we use it, or ask us to restrict its use. Contact us using the details above.'],
    },
    { h: 'Complaints', p: ['If you are unhappy with how we handle your data, please tell us first. You can also complain to the Information Commissioner’s Office (ICO) at ico.org.uk.'] },
  ],
};

export const terms = {
  updated: '2026-10-28',
  sections: [
    { h: 'About these terms', p: [`These terms apply to work carried out by ${business.legalName} at ${addressLine}. Your statutory rights under the Consumer Rights Act 2015 are not affected.`] },
    { h: 'Quotes and estimates', p: ['A quote is a fixed price for the work described. An estimate is our best guess and may change once we start. We will tell you which one you are getting.'] },
    { h: 'Extra work', p: ['If we find something else that needs doing, we will contact you with the price first. We will not carry out extra work without your permission.'] },
    { h: 'Payment', p: ['Payment is due when you collect the vehicle, unless we agree otherwise in writing. We may keep the vehicle until the bill for the agreed work is paid.'] }, // TODO(client): payment methods
    { h: 'Parts', p: ['We fit new parts of suitable quality unless we agree to use part worn or customer-supplied parts. Old parts are kept for you to see if you ask before the work starts.'] },
    { h: 'Vehicles left with us', p: ['Please remove valuables before leaving your vehicle. Vehicles not collected within a reasonable time after we tell you the work is finished may be charged for storage, after we have given you notice.'] }, // TODO(client): storage terms
    { h: 'Our liability', p: ['We take reasonable care with your vehicle and carry out work with reasonable skill and care. We are not liable for faults not related to the work we carried out, or for losses we could not reasonably have foreseen. Nothing in these terms limits liability for death or personal injury caused by negligence.'] },
    { h: 'Guarantee', p: ['Ask us about the guarantee on parts and labour when we quote for your job.'] }, // TODO(client): warranty terms
  ],
};
