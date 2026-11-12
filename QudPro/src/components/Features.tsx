import { Users, Briefcase, TrendingUp } from 'lucide-react'

const features = [
  {
    name: 'Professional Network',
    description: 'Connect with industry leaders and professionals across Egypt',
    icon: Users
  },
  {
    name: 'Career Opportunities',
    description: 'Discover job opportunities that match your skills and ambitions',
    icon: Briefcase
  },
  {
    name: 'Growth & Learning',
    description: 'Access resources and insights to advance your professional journey',
    icon: TrendingUp
  }
]

export function Features() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
