import React from 'react';

const GpaCalculator = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">GPA Calculator</h1>

      <p className="text-lg text-gray-300 mb-6">
        This GPA calculator helps you easily calculate your grade point average (GPA). It provides a user-friendly interface for entering course information, including:
      </p>

      <ul className="list-disc list-inside mb-6">
        <li className="text-gray-200">Course Name</li>
        <li className="text-gray-200">Number of Credits</li>
        <li className="text-gray-200">Grade (e.g., A, B, C, etc.)</li>
      </ul>

      <p className="text-lg text-gray-300 mb-6">
        The calculator then calculates your GPA based on a common 4.0 scale (adjust based on your institution&apos;s scale if needed).
      </p>

      <p className="text-lg text-gray-300 mb-6">
        To get started, simply input your course details and click the &quot;Calculate GPA&quot; button. The calculator will provide you with your overall GPA.
      </p>

      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Instructions</h2>
        <ol className="list-decimal list-inside">
          <li className="text-gray-950">Enter the name of each course.</li>
          <li className="text-gray-950">Input the number of credits for each course.</li>
          <li className="text-gray-950">Select your grade from the dropdown menu for each course.</li>
          <li className="text-gray-950">Click the &quot;Calculate GPA&quot; button.</li>
        </ol>
      </div>

      <div className="calculation-section">
        {/* Add your actual GPA calculation component here */}
      </div>

      <p className="text-gray-200 mb-4">
        **Disclaimer:** While this calculator provides a general estimate, it&apos;s recommended to consult the specific grading policies of your institution for accurate calculations.
      </p>

      <p className="text-gray-200 mb-4">
        For any queries about the calculator or its functionality, feel free to contact me at:
        <a href="mailto:abdul29112004@gmail.com" className="text-blue-500 underline">abdul29112004@gmail.com</a>
      </p>
    </div>
  );
};

export default GpaCalculator;