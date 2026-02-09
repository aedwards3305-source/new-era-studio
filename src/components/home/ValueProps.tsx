import {
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const props = [
  {
    icon: TruckIcon,
    title: 'Free Shipping',
    description: 'Complimentary shipping on all orders over $150',
  },
  {
    icon: ShieldCheckIcon,
    title: '100% Virgin Hair',
    description: 'Ethically sourced, unprocessed premium hair',
  },
  {
    icon: ArrowPathIcon,
    title: '30-Day Returns',
    description: 'Hassle-free returns on unaltered products',
  },
  {
    icon: SparklesIcon,
    title: 'Expert Install',
    description: 'Book professional installation with purchase',
  },
];

export function ValueProps() {
  return (
    <section className="section-padding py-16 lg:py-20 border-y border-brand-gray-100">
      <div className="section-width">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {props.map((prop) => (
            <div key={prop.title} className="text-center">
              <prop.icon className="h-8 w-8 mx-auto mb-4 text-brand-gold" strokeWidth={1.2} />
              <h3 className="text-sm font-body font-semibold tracking-wider uppercase mb-2">
                {prop.title}
              </h3>
              <p className="text-xs font-body text-brand-gray-500 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
