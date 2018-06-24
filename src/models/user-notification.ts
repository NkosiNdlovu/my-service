export class UserNotification {
  userId: string;
  title: string;
  tag: string;
  body: string;
  icon: string;
  id: string;
}


export const NOTIFICATION_MESSAGES = {
  job_accepted : 'Job Accepted.',
  job_ack : "Job has been acknowledged.",
  job_arrival : "Provider has arrived.",
  job_complete: 'Job has been completed, Please rate our service.',
  job_decline: 'Job request has been declined.'
}
