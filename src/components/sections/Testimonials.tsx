import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Raj Patel",
      location: "Mumbai",
      text: "Outstanding quality work! Our restaurant signage looks absolutely professional.",
      rating: 5,
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Pune",
      text: "The car window tinting service was excellent. Professional installation and great results.",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      id: 3,
      name: "Amit Kumar",
      location: "Delhi",
      text: "Fast delivery and beautiful custom lettering for our office. Highly recommended!",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
    },
    {
      id: 4,
      name: "Sneha Joshi",
      location: "Bangalore",
      text: "Creative logo design that perfectly captured our brand vision.",
      rating: 5,
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
    },
    {
      id: 5,
      name: "Vikram Singh",
      location: "Ahmedabad",
      text: "The radium board looks amazing! Great attention to detail and customer service.",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
    },
    {
      id: 6,
      name: "Kavita Reddy",
      location: "Hyderabad",
      text: "Professional banner design for our event. Exceeded our expectations completely!",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    }
  ];

  return (
    <section className="py-16 bg-bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold text-text mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card rounded-lg shadow-md p-6 relative hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-4 right-4 text-primary/20">
                <Quote className="w-8 h-8" />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-muted mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-text">{testimonial.name}</h4>
                  <p className="text-sm text-muted">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.9</div>
            <div className="text-muted">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted">Projects Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;