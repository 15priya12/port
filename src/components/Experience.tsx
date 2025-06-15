'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    title: "Software Development Intern",
    company: "PRAMATA Knowledge Solutions Pvt. Ltd.",
    location: "Bangalore, India",
    period: "Jan 2024–Present ; Aug 2023–Oct 2023",
    description: [
      "Developed an OCR and ElasticSearch-driven system to extract and enrich party data from contracts",
      "Improved title classification algorithms for enhanced contract data organization",
      "Enhanced party extraction accuracy and collaborated with cross-functional teams for platform integration"
    ]
  },
  {
    title: "AI Intern",
    company: "National Chung Cheng University",
    period: "Sept 2024–Dec 2024",
    description: [
      "Designed machine learning models using Hyperspectral and Narrow-Band Imaging for melanoma diagnosis",
      "Trained models on 3,396 augmented images, achieving 97% accuracy",
      "Demonstrated the superiority of SAVE imaging over traditional RGB imaging for skin cancer detection"
    ]
  },
  {
    title: "Freelance Developer",
    company: "Fiverr",
    location: "Taiwan",
    period: "Sept 2022–Present",
    description: [
      "Built responsive web applications using Flask, React, Angular, and Vue",
      "Integrated MongoDB and MySQL databases with RESTAPIs",
      "Deployed scalable applications on AWS with Docker, focusing on security and UI/UX optimization",
      "Utilized Git, Bitbucket, and JIRA for efficient project management and collaboration"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-pink-100 rounded-full blur-3xl opacity-50"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-gray-600">
            My professional journey
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-pink-200 to-orange-200"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-12 ${index % 2 === 0 ? 'md:ml-auto md:mr-8' : 'md:mr-auto md:ml-8'} md:w-1/2`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full shadow-lg"></div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-100 to-orange-100 rounded-full blur-2xl opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                    <span className="text-sm text-gray-500">{exp.period}</span>
                  </div>
                  
                  <h4 className="text-lg text-pink-600 mb-4">{exp.company}</h4>
                  
                  <p className="text-gray-600 mb-6">{exp.description.join('\n')}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 