import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
        {/* Navbar */}
        <Navbar/>
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16 px-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">TaskMaster AI</h1>
            <p className="text-lg md:text-xl mb-6">
              Your ultimate AI-powered task manager to boost productivity and simplify your life.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link to="/signup" className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100">
                Get Started
              </Link>
              <Link to="/login" className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-800">
                Login
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Task Manager AI"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose TaskMaster AI?</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="AI Integration"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-gray-600">
              Get intelligent suggestions and insights to prioritize your tasks effectively.
            </p>
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Collaboration"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Seamless Collaboration</h3>
            <p className="text-gray-600">
              Work with your team in real-time and stay on top of your projects.
            </p>
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Customization"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Customizable Workflows</h3>
            <p className="text-gray-600">
              Tailor your task manager to fit your unique needs and preferences.
            </p>
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Reminders"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
            <p className="text-gray-600">
              Never miss a deadline with AI-powered reminders and notifications.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Productivity?</h2>
          <p className="text-lg mb-6">
            Join thousands of users who trust TaskMaster AI to manage their tasks and projects.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-gray-100"
          >
            Sign Up for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} TaskMaster AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;