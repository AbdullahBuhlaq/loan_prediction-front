import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [formData, setFormData] = useState({
    ApplicantIncome: '',
    CoapplicantIncome: '',
    Credit_History: '1',
    Dependents: '0',
    Education: 'Graduate',
    Gender: 'Male',
    LoanAmount: '',
    Loan_Amount_Term: '360',
    Married: 'No',
    Property_Area: 'Urban',
    Self_Employed: 'No'
  });
  
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Prediction error:', error);
      setResult({ error: 'Prediction failed' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Gender:</label>
        <select name="Gender" value={formData.Gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label>Married:</label>
        <select name="Married" value={formData.Married} onChange={handleChange}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div>
        <label>Dependents:</label>
        <select name="Dependents" value={formData.Dependents} onChange={handleChange}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3+">3+</option>
        </select>
      </div>

      <div>
        <label>Education:</label>
        <select name="Education" value={formData.Education} onChange={handleChange}>
          <option value="Graduate">Graduate</option>
          <option value="Not Graduate">Not Graduate</option>
        </select>
      </div>

      <div>
        <label>Self Employed:</label>
        <select name="Self_Employed" value={formData.Self_Employed} onChange={handleChange}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div>
        <label>Applicant Income:</label>
        <input 
          type="number" 
          name="ApplicantIncome" 
          value={formData.ApplicantIncome}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Coapplicant Income:</label>
        <input 
          type="number" 
          name="CoapplicantIncome" 
          value={formData.CoapplicantIncome}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Loan Amount:</label>
        <input 
          type="number" 
          name="LoanAmount" 
          value={formData.LoanAmount}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Loan Term (months):</label>
        <input 
          type="number" 
          name="Loan_Amount_Term" 
          value={formData.Loan_Amount_Term}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Credit History:</label>
        <select name="Credit_History" value={formData.Credit_History} onChange={handleChange}>
          <option value="1">Good (1)</option>
          <option value="0">Bad (0)</option>
        </select>
      </div>

      <div>
        <label>Property Area:</label>
        <select name="Property_Area" value={formData.Property_Area} onChange={handleChange}>
          <option value="Urban">Urban</option>
          <option value="Rural">Rural</option>
          <option value="Semiurban">Semiurban</option>
        </select>
      </div>

      <button type="submit">Predict Loan Approval</button>
      
      {result && (
        <div className="result">
          {result.error ? (
            <p className="error">{result.error}</p>
          ) : (
            <>
              <h3>Prediction: {result.prediction ? 'Approved' : 'Rejected'}</h3>
              <p>Probability: {(result.probability * 100).toFixed(2)}%</p>
            </>
          )}
        </div>
      )}
    </form>
  );
}

export default Form;