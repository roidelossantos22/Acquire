'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Phone, Search, Copy, Check, RotateCcw, AlertTriangle, RefreshCw } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'

// Mock workflow data for live call mode
const mockWorkflow = {
  id: 1,
  title: 'New Patient Reservation Fee',
  steps: [
    {
      id: 1,
      type: 'question',
      question: 'Is this a new patient?',
      options: ['Yes', 'No', 'Not sure']
    },
    {
      id: 2,
      type: 'question',
      question: 'Does the patient have a promotional voucher?',
      options: ['Yes', 'No']
    },
    {
      id: 3,
      type: 'instruction',
      title: 'Collect Reservation Fee',
      content: 'Inform the patient of the $50 reservation fee requirement',
      script: 'To secure your appointment, we require a $50 reservation fee. This will be applied toward your total bill.'
    },
    {
      id: 4,
      type: 'question',
      question: 'Does the patient qualify for an exemption?',
      options: ['Yes - Medicaid/Medicare', 'Yes - Birthday voucher', 'No exemption']
    },
    {
      id: 5,
      type: 'warning',
      title: 'Check Exemption Policy',
      content: 'Verify patient has valid documentation for exemption claim'
    },
    {
      id: 6,
      type: 'instruction',
      title: 'Explain Refund Policy',
      content: 'Inform patient about the 24-hour cancellation policy',
      script: 'Your fee is refundable if you cancel with 24+ hours notice. Late cancellations or no-shows forfeit the fee.'
    }
  ]
}

export default function LiveCallPage() {
  const params = useParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const [answers, setAnswers] = useState<string[]>([])

  const copyScript = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer])
    if (currentStep < mockWorkflow.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers([])
  }

  const currentStepData = mockWorkflow.steps[currentStep]
  const progress = ((currentStep + 1) / mockWorkflow.steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Simplified Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900">Live Call Mode</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Quick search another workflow..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {mockWorkflow.steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 mb-6">
          {currentStepData.type === 'question' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {currentStepData.question}
              </h2>
              <div className="space-y-4">
                {currentStepData.options?.map((option: string) => (
                  <Button
                    key={option}
                    size="lg"
                    variant="outline"
                    className="w-full h-16 text-lg justify-start text-left px-6"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {currentStepData.type === 'instruction' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentStepData.title}
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                {currentStepData.content}
              </p>
              
              {currentStepData.script && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-green-900 text-lg">Say This:</h3>
                    <Button
                      size="lg"
                      onClick={() => copyScript(currentStepData.script)}
                    >
                      {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
                      {copied ? 'Copied!' : 'Copy Script'}
                    </Button>
                  </div>
                  <p className="text-green-800 text-xl italic leading-relaxed">
                    "{currentStepData.script}"
                  </p>
                </div>
              )}

              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  if (currentStep < mockWorkflow.steps.length - 1) {
                    setCurrentStep(currentStep + 1)
                  }
                }}
              >
                Next Step
              </Button>
            </div>
          )}

          {currentStepData.type === 'warning' && (
            <div>
              <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-bold text-amber-900 mb-2">
                      {currentStepData.title}
                    </h2>
                    <p className="text-amber-800 text-lg">
                      {currentStepData.content}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  if (currentStep < mockWorkflow.steps.length - 1) {
                    setCurrentStep(currentStep + 1)
                  }
                }}
              >
                I've Verified, Continue
              </Button>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Previous Step
          </Button>

          {currentStep === mockWorkflow.steps.length - 1 && (
            <Button
              size="lg"
              variant="primary"
              onClick={() => router.push('/dashboard')}
            >
              Complete & Return to Dashboard
            </Button>
          )}
        </div>

        {/* Related Concern Button */}
        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={() => router.push('/search')}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Handle Different Concern
          </Button>
        </div>
      </main>
    </div>
  )
}
