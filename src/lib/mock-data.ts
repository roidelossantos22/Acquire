// Mock data based on the Excel file structure
export const categories = [
  { name: 'Appointment Scheduling', count: 335, slug: 'appointment-scheduling' },
  { name: 'New Patient Workflow', count: 97, slug: 'new-patient' },
  { name: 'Weight Loss Services', count: 97, slug: 'weight-loss' },
  { name: 'Insurance & Billing', count: 382, slug: 'insurance-billing' },
  { name: 'Skin Care & Dermatology', count: 230, slug: 'skin-care-dermatology' },
  { name: 'Pain Care Management', count: 128, slug: 'pain-care' },
  { name: 'Hormone Health', count: 124, slug: 'hormone-health' },
  { name: 'Direct Primary Care', count: 26, slug: 'direct-primary-care' },
  { name: 'Peptide Therapy', count: 9, slug: 'peptide-therapy' },
  { name: 'Birthday Vouchers', count: 25, slug: 'birthday-vouchers' },
  { name: 'RPM/CCM Services', count: 460, slug: 'rpm-ccm' },
  { name: 'Medical Records', count: 152, slug: 'medical-records' },
  { name: 'Referrals', count: 39, slug: 'referrals' },
  { name: 'Office Policies', count: 321, slug: 'office-policies' },
  { name: 'Provider Information', count: 178, slug: 'provider-info' },
  { name: 'Allure Wellness Center', count: 107, slug: 'allure-wellness' },
  { name: 'CPT/Procedure Codes', count: 23, slug: 'cpt-codes' },
  { name: 'Websites & Logins', count: 171, slug: 'websites-logins' },
  { name: 'Phone System (GoToConnect)', count: 101, slug: 'phone-system' },
  { name: 'Social Media & Listings', count: 35, slug: 'social-media' },
  { name: 'Call Handling', count: 59, slug: 'call-handling' },
  { name: 'Promotions', count: 110, slug: 'promotions' },
  { name: 'CareSource Outreach', count: 75, slug: 'caresource-outreach' },
  { name: 'PCR Result Appointments', count: 92, slug: 'pcr-results' },
  { name: 'CoCM Services', count: 80, slug: 'cocm-services' },
  { name: 'Eligibility Services', count: 91, slug: 'eligibility-services' },
  { name: 'Frequently Asked Questions', count: 118, slug: 'faqs' }
]

export const workflows = [
  // Weight Loss Workflows
  {
    id: 1,
    title: 'New Patient Weight Loss Consultation',
    category: 'Weight Loss Services',
    description: 'Initial consultation process for new weight loss patients',
    tags: ['weight-loss', 'new-patient', 'consultation'],
    whenToUse: 'When scheduling a new patient for weight loss services',
    whenNotToUse: 'For established weight loss patients',
    status: 'published',
    lastUpdated: '2024-01-15',
    updatedBy: 'Dr. Smith',
    version: '2.1',
    readingTime: 5,
    content: [
      {
        type: 'action',
        title: 'Verify Patient Eligibility',
        content: 'Confirm patient meets BMI requirements for weight loss program'
      },
      {
        type: 'say',
        title: 'Welcome Script',
        content: 'Thank you for choosing our weight loss program. We\'re excited to help you achieve your health goals.'
      },
      {
        type: 'important',
        title: 'Required Documentation',
        content: 'Patient must bring recent lab work and medical history to first appointment'
      },
      {
        type: 'action',
        title: 'Schedule Initial Consultation',
        content: 'Book 60-minute consultation with weight loss provider'
      }
    ]
  },
  {
    id: 2,
    title: 'Weight Loss Medication Refill',
    category: 'Weight Loss Services',
    description: 'Process for handling weight loss medication refill requests',
    tags: ['weight-loss', 'medication', 'refill'],
    whenToUse: 'When established patient requests medication refill',
    whenNotToUse: 'For new patients or medication changes',
    status: 'published',
    lastUpdated: '2024-01-14',
    updatedBy: 'Dr. Johnson',
    version: '1.3',
    readingTime: 3,
    content: [
      {
        type: 'action',
        title: 'Verify Last Appointment',
        content: 'Confirm patient had weight loss follow-up within last 30 days'
      },
      {
        type: 'say',
        title: 'Refill Approval Script',
        content: 'I\'ll process your refill request. Please allow 24-48 hours for pharmacy processing.'
      }
    ]
  },
  // Scheduling Workflows
  {
    id: 3,
    title: 'New Patient Appointment Scheduling',
    category: 'Appointment Scheduling',
    description: 'Complete workflow for scheduling new patient appointments',
    tags: ['scheduling', 'new-patient', 'appointment'],
    whenToUse: 'When scheduling a first-time patient',
    whenNotToUse: 'For established patient appointments',
    status: 'published',
    lastUpdated: '2024-01-15',
    updatedBy: 'Admin',
    version: '3.0',
    readingTime: 7,
    content: [
      {
        type: 'action',
        title: 'Collect Patient Information',
        content: 'Gather full name, date of birth, contact information, and insurance details'
      },
      {
        type: 'important',
        title: 'Insurance Verification',
        content: 'Verify insurance coverage and authorization requirements before scheduling'
      },
      {
        type: 'say',
        title: 'Appointment Confirmation Script',
        content: 'Your appointment is scheduled for [date] at [time]. Please arrive 15 minutes early with your ID and insurance card.'
      },
      {
        type: 'exception',
        title: 'Same-Day Scheduling',
        content: 'Same-day new patient appointments require provider approval and are limited availability'
      }
    ]
  },
  {
    id: 4,
    title: 'Appointment Cancellation Policy',
    category: 'Appointment Scheduling',
    description: 'Guidelines for handling appointment cancellations and rescheduling',
    tags: ['scheduling', 'cancellation', 'policy'],
    whenToUse: 'When patient requests to cancel or reschedule',
    whenNotToUse: 'For no-show situations',
    status: 'published',
    lastUpdated: '2024-01-14',
    updatedBy: 'Admin',
    version: '2.2',
    readingTime: 4,
    content: [
      {
        type: 'important',
        title: '24-Hour Cancellation Policy',
        content: 'Cancellations must be made at least 24 hours before appointment time to avoid fees'
      },
      {
        type: 'say',
        title: 'Cancellation Confirmation Script',
        content: 'I\'ve cancelled your appointment for [date]. Is there anything else I can help you with today?'
      },
      {
        type: 'escalate',
        title: 'Late Cancellation Fee Disputes',
        content: 'Escalate to practice manager for any fee waiver requests'
      }
    ]
  },
  // Insurance Workflows
  {
    id: 5,
    title: 'Insurance Verification Process',
    category: 'Insurance & Billing',
    description: 'Steps to verify patient insurance coverage and benefits',
    tags: ['insurance', 'verification', 'billing'],
    whenToUse: 'For all new patient appointments and established patients with new insurance',
    whenNotToUse: 'For self-pay patients',
    status: 'published',
    lastUpdated: '2024-01-13',
    updatedBy: 'Billing Team',
    version: '1.8',
    readingTime: 6,
    content: [
      {
        type: 'action',
        title: 'Collect Insurance Information',
        content: 'Get insurance card, member ID, group number, and policy holder information'
      },
      {
        type: 'action',
        title: 'Verify Coverage',
        content: 'Check active coverage, deductibles, co-pays, and prior authorization requirements'
      },
      {
        type: 'important',
        title: 'FSSA Update Schedule',
        content: 'Insurance updates to FSSA only occur on 1st and 15th of each month. Schedule new patient appointments accordingly.'
      },
      {
        type: 'say',
        title: 'Coverage Explanation Script',
        content: 'I\'ve verified your insurance coverage. Your estimated co-pay for this visit is [amount].'
      }
    ]
  },
  {
    id: 6,
    title: 'COB Insurance Issues',
    category: 'Insurance & Billing',
    description: 'Handling Coordination of Benefits insurance problems',
    tags: ['insurance', 'cob', 'billing'],
    whenToUse: 'When patient has COB issues on their profile',
    whenNotToUse: 'For single insurance situations',
    status: 'published',
    lastUpdated: '2024-01-12',
    updatedBy: 'Billing Team',
    version: '1.2',
    readingTime: 3,
    content: [
      {
        type: 'important',
        title: 'COB Issue Resolution',
        content: 'Patient must call FSSA to have COB removed from their profile before we can process claims'
      },
      {
        type: 'say',
        title: 'COB Explanation Script',
        content: 'I see there\'s a coordination of benefits issue on your profile. You\'ll need to call FSSA at [number] to have this resolved before we can proceed.'
      }
    ]
  },
  // Skin Care Workflows
  {
    id: 7,
    title: 'Botox Consultation Workflow',
    category: 'Skin Care & Dermatology',
    description: 'Standard procedure for Botox and cosmetic consultations',
    tags: ['botox', 'cosmetic', 'consultation'],
    whenToUse: 'When scheduling or conducting Botox consultations',
    whenNotToUse: 'For medical dermatology consultations',
    status: 'published',
    lastUpdated: '2024-01-12',
    updatedBy: 'Dr. Johnson',
    version: '2.0',
    readingTime: 6,
    content: [
      {
        type: 'action',
        title: 'Consultation Requirements',
        content: 'Schedule 30-minute consultation for new Botox patients'
      },
      {
        type: 'important',
        title: 'Payment Policy',
        content: 'Cosmetic services require payment at time of service. Insurance does not cover cosmetic procedures.'
      },
      {
        type: 'say',
        title: 'Consultation Booking Script',
        content: 'Your Botox consultation is scheduled for [date]. The consultation fee is [amount], which will be applied toward your treatment if you proceed.'
      }
    ]
  },
  {
    id: 8,
    title: 'Skin Care Product Consultation',
    category: 'Skin Care & Dermatology',
    description: 'Guidelines for skin care product recommendations and sales',
    tags: ['skin-care', 'products', 'consultation'],
    whenToUse: 'When patient asks about skin care products',
    whenNotToUse: 'For prescription medication discussions',
    status: 'published',
    lastUpdated: '2024-01-11',
    updatedBy: 'Dr. Smith',
    version: '1.5',
    readingTime: 4,
    content: [
      {
        type: 'action',
      title: 'Assess Skin Type',
        content: 'Evaluate patient\'s skin type and concerns before making recommendations'
      },
      {
        type: 'say',
        title: 'Product Recommendation Script',
        content: 'Based on your skin type, I recommend [product]. This will help with [concern]. Would you like me to explain the benefits?'
      }
    ]
  },
  // RPM/CCM Workflows
  {
    id: 9,
    title: 'RPM Patient Enrollment',
    category: 'RPM/CCM Services',
    description: 'Process for enrolling patients in Remote Patient Monitoring',
    tags: ['rpm', 'enrollment', 'remote-monitoring'],
    whenToUse: 'When provider recommends RPM for eligible patient',
    whenNotToUse: 'For patients not meeting RPM criteria',
    status: 'published',
    lastUpdated: '2024-01-10',
    updatedBy: 'Care Team',
    version: '1.0',
    readingTime: 8,
    content: [
      {
        type: 'action',
        title: 'Verify RPM Eligibility',
        content: 'Confirm patient has qualifying chronic condition and meets RPM criteria'
      },
      {
        type: 'important',
        title: 'Patient Consent Required',
        content: 'Patient must sign RPM consent form before enrollment and device distribution'
      },
      {
        type: 'say',
        title: 'RPM Explanation Script',
        content: 'Your provider has recommended Remote Patient Monitoring to help manage your health. This involves using a device to track your vital signs at home.'
      }
    ]
  },
  {
    id: 10,
    title: 'CCM Care Coordination',
    category: 'RPM/CCM Services',
    description: 'Chronic Care Management coordination workflow',
    tags: ['ccm', 'care-coordination', 'chronic-care'],
    whenToUse: 'For patients enrolled in CCM program',
    whenNotToUse: 'For patients not in CCM program',
    status: 'published',
    lastUpdated: '2024-01-09',
    updatedBy: 'Care Team',
    version: '1.2',
    readingTime: 5,
    content: [
      {
        type: 'action',
        title: 'Monthly Care Contact',
        content: 'Ensure monthly contact with CCM patients for care coordination'
      },
      {
        type: 'important',
        title: 'Documentation Requirements',
        content: 'Document all care coordination activities in patient chart for billing compliance'
      }
    ]
  },
  // FAQ Workflows
  {
    id: 11,
    title: 'Peer to Peer Review Process',
    category: 'Frequently Asked Questions',
    description: 'Guidelines for Peer to Peer insurance reviews',
    tags: ['insurance', 'peer-review', 'prior-authorization'],
    whenToUse: 'When insurance requires Peer to Peer review',
    whenNotToUse: 'For routine prior authorizations',
    status: 'published',
    lastUpdated: '2024-01-08',
    updatedBy: 'Dr. Malek',
    version: '1.0',
    readingTime: 3,
    content: [
      {
        type: 'important',
        title: 'Provider Requirement',
        content: 'Peer to Peer review must be done by the provider who sent the order/prescription, per Dr. Malek\'s instructions'
      },
      {
        type: 'action',
        title: 'Schedule Review',
        content: 'Coordinate with provider\'s schedule for Peer to Peer review call'
      }
    ]
  },
  // Birthday Voucher Workflows
  {
    id: 12,
    title: 'Birthday Voucher Redemption',
    category: 'Birthday Vouchers',
    description: 'Process for handling birthday voucher redemptions',
    tags: ['birthday', 'voucher', 'promotion'],
    whenToUse: 'When patient presents birthday voucher',
    whenNotToUse: 'For other promotional vouchers',
    status: 'published',
    lastUpdated: '2024-01-07',
    updatedBy: 'Admin',
    version: '2.1',
    readingTime: 4,
    content: [
      {
        type: 'important',
        title: 'Voucher Exemption',
        content: 'Birthday vouchers are exempt from reservation fee requirements'
      },
      {
        type: 'say',
        title: 'Birthday Voucher Script',
        content: 'Happy birthday! I see you have a birthday voucher. This can be used for [service] and is exempt from our standard reservation fee.'
      }
    ]
  }
]

export const scripts = [
  {
    id: 1,
    title: 'New Patient Welcome',
    content: 'Thank you for choosing our clinic. We\'re looking forward to seeing you for your first appointment on [date] at [time]. Please arrive 15 minutes early with your ID and insurance card.',
    channel: 'phone',
    situation: 'Confirming new patient appointment',
    workflowId: 3
  },
  {
    id: 2,
    title: 'Cancellation Confirmation',
    content: 'I\'ve cancelled your appointment for [date]. Would you like to reschedule for a different time?',
    channel: 'phone',
    situation: 'Confirming appointment cancellation',
    workflowId: 4
  },
  {
    id: 3,
    title: 'Insurance Coverage Explained',
    content: 'I\'ve verified your insurance coverage. Your estimated co-pay for this visit is [amount]. Please bring your insurance card to your appointment.',
    channel: 'phone',
    situation: 'Explaining insurance benefits',
    workflowId: 5
  },
  {
    id: 4,
    title: 'Botox Consultation Booking',
    content: 'Your Botox consultation is scheduled for [date]. The consultation fee is [amount], which will be applied toward your treatment if you proceed.',
    channel: 'phone',
    situation: 'Booking Botox consultation',
    workflowId: 7
  },
  {
    id: 5,
    title: 'RPM Program Explanation',
    content: 'Your provider has recommended Remote Patient Monitoring to help manage your health. This involves using a device to track your vital signs at home.',
    channel: 'phone',
    situation: 'Explaining RPM program',
    workflowId: 9
  },
  {
    id: 6,
    title: 'SMS Appointment Reminder',
    content: 'Reminder: You have an appointment at Allure Wellness Center on [date] at [time]. Reply CANCEL to reschedule or CALL with questions.',
    channel: 'sms',
    situation: 'Appointment reminder',
    workflowId: 3
  },
  {
    id: 7,
    title: 'SMS No-Follow Up',
    content: 'We missed you at your recent appointment. Please call us to reschedule at your earliest convenience.',
    channel: 'sms',
    situation: 'Following up on missed appointment',
    workflowId: 4
  }
]
