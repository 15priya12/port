'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Facial Expression Recognition Game',
    description: 'An interactive AI-based game that detects real-time facial expressions using webcam input. Leveraged computer vision and deep learning to dynamically recognize and respond to player emotions. Enhanced player engagement through real-time feedback and intuitive UI design.',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'Computer Vision', 'Deep Learning'],
    image: '/project1.jpg',
    link: '#',
    gradient: 'from-pink-100 to-orange-100',
  },
  {
    title: 'Doc-AI',
    description: 'Built an AI tool to automatically read and summarize doctor prescriptions. Utilized Optical Character Recognition (OCR) and Natural Language Processing (NLP) techniques. Improved healthcare accessibility and minimized prescription misinterpretation.',
    technologies: ['Python', 'OCR', 'NLP', 'Healthcare AI'],
    image: '/project2.jpg',
    link: '#',
    gradient: 'from-cyan-100 to-blue-100',
  },
  {
    title: 'Smart Budgeting and Expense Tracker',
    description: 'Designed and developed a web app for expense categorization, budget tracking, and financial goal setting. Integrated interactive visualizations for spending analysis using React dashboards. Delivered a personalized financial advisory tool with real-time user insights.',
    technologies: ['Python', 'Flask', 'React', 'MySQL'],
    image: '/project3.jpg',
    link: '#',
    gradient: 'from-purple-100 to-pink-100',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
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
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600">
            A showcase of my recent work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-100 to-orange-100 rounded-full blur-2xl opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Project Preview
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-medium text-pink-600 bg-pink-50 rounded-full border border-pink-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    View Project
                  </motion.a>
                </div>

                {/* Interactive Elements */}
                <motion.div
                  className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${project.gradient} rounded-full opacity-30`}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 45, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 