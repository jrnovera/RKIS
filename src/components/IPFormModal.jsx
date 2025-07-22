import React, { useState, useEffect } from 'react';
import { allBarangays } from './Brgylist';
import '../pages/SuperAdminDashboard.css';
import './IPFormModal.css';

function IPFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData, 
  isEditing = false,
  selectedBarangay = null 
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    civilStatus: '',
    educationLevel: '',
    occupation: '',
    lineage: '',
    barangay: selectedBarangay ? selectedBarangay.name : '',
    address: '',
    municipality: 'Catanauan',
    province: 'Quezon',
    healthCondition: '',
    householdMembers: '',
    familyTree: {
      grandfather: '',
      grandmother: '',
      father: '',
      mother: '',
      siblings: '',
      spouse: '',
      children: ''
    }
  });

  // Initialize form data when editing or when selectedBarangay changes
  useEffect(() => {
    if (isEditing && initialData) {
      setFormData(initialData);
    } else if (!isEditing) {
      setFormData(prev => ({
        ...prev,
        barangay: selectedBarangay ? selectedBarangay.name : prev.barangay
      }));
    }
  }, [isEditing, initialData, selectedBarangay]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle radio button changes
  const handleRadioChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Fill Up Form</h2>
        <form onSubmit={handleSubmit} className="ip-form">
          <table className="ip-form-table">
            <tr>
              <td>Name:</td>
              <td>
                <div className="name-inputs">
                  <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <input 
                    type="text" 
                    name="middleName" 
                    placeholder="Middle Name" 
                    value={formData.middleName}
                    onChange={handleInputChange}
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td>Date of Birth:</td>
              <td>
                <input 
                  type="date" 
                  name="dateOfBirth" 
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>
                <input 
                  type="number" 
                  name="age" 
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Gender:</td>
              <td>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="gender" 
                      checked={formData.gender === 'Male'}
                      onChange={() => handleRadioChange('gender', 'Male')}
                      required={!formData.gender}
                    /> Male
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="gender" 
                      checked={formData.gender === 'Female'}
                      onChange={() => handleRadioChange('gender', 'Female')}
                    /> Female
                  </label>
                </div>
              </td>
            </tr>

            <tr>
              <td>Civil Status:</td>
              <td>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="civilStatus" 
                      checked={formData.civilStatus === 'Single'}
                      onChange={() => handleRadioChange('civilStatus', 'Single')}
                      required={!formData.civilStatus}
                    /> Single
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="civilStatus" 
                      checked={formData.civilStatus === 'Married'}
                      onChange={() => handleRadioChange('civilStatus', 'Married')}
                    /> Married
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="civilStatus" 
                      checked={formData.civilStatus === 'Widowed'}
                      onChange={() => handleRadioChange('civilStatus', 'Widowed')}
                    /> Widowed
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="civilStatus" 
                      checked={formData.civilStatus === 'Separated'}
                      onChange={() => handleRadioChange('civilStatus', 'Separated')}
                    /> Separated
                  </label>
                </div>
              </td>
            </tr>

            <tr>
              <td>Education Level:</td>
              <td>
                <div className="radio-group education-group">
                  <label>
                    <input 
                      type="radio" 
                      name="educationLevel" 
                      checked={formData.educationLevel === 'No Formal Education'}
                      onChange={() => handleRadioChange('educationLevel', 'No Formal Education')}
                      required={!formData.educationLevel}
                    /> No Formal Education
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="educationLevel" 
                      checked={formData.educationLevel === 'Elementary'}
                      onChange={() => handleRadioChange('educationLevel', 'Elementary')}
                    /> Elementary
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="educationLevel" 
                      checked={formData.educationLevel === 'High School'}
                      onChange={() => handleRadioChange('educationLevel', 'High School')}
                    /> High School
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="educationLevel" 
                      checked={formData.educationLevel === 'College'}
                      onChange={() => handleRadioChange('educationLevel', 'College')}
                    /> College
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="educationLevel" 
                      checked={formData.educationLevel === 'Vocational'}
                      onChange={() => handleRadioChange('educationLevel', 'Vocational')}
                    /> Vocational
                  </label>
                </div>
              </td>
            </tr>

            <tr>
              <td>Occupation:</td>
              <td>
                <input 
                  type="text" 
                  name="occupation" 
                  value={formData.occupation}
                  onChange={handleInputChange}
                />
              </td>
            </tr>

            <tr>
              <td>Lineage:</td>
              <td>
                <input 
                  type="text" 
                  name="lineage" 
                  value={formData.lineage}
                  onChange={handleInputChange}
                />
              </td>
            </tr>

            <tr>
              <td>Barangay:</td>
              <td>
                <select
                  name="barangay"
                  value={formData.barangay}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Barangay</option>
                  {allBarangays.map(brgy => (
                    <option key={brgy.id} value={brgy.name}>{brgy.name}</option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <td>Address:</td>
              <td>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
          
            <tr>
              <td>Municipality:</td>
              <td>
                <input 
                  type="text" 
                  name="municipality" 
                  value={formData.municipality}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>Province:</td>
              <td>
                <input 
                  type="text" 
                  name="province" 
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </td>
            </tr>

            <tr>
              <td>Health Condition:</td>
              <td>
                <input 
                  type="text" 
                  name="healthCondition" 
                  value={formData.healthCondition}
                  onChange={handleInputChange}
                />
              </td>
            </tr>

            <tr>
              <td>Household Members:</td>
              <td>
                <input 
                  type="text" 
                  name="householdMembers" 
                  value={formData.householdMembers}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            
            <tr>
              <td>Family Tree:</td>
              <td className="family-tree-inputs">
                <div className="family-member-input">
                  <label>Grandfather:</label>
                  <input 
                    type="text" 
                    value={formData.familyTree.grandfather}
                    onChange={(e) => setFormData({
                      ...formData,
                      familyTree: {
                        ...formData.familyTree,
                        grandfather: e.target.value
                      }
                    })}
                    placeholder="Grandfather's name"
                  />
                </div>
                <div className="family-member-input">
                  <label>Grandmother:</label>
                  <input 
                    type="text" 
                    value={formData.familyTree.grandmother}
                    onChange={(e) => setFormData({
                      ...formData,
                      familyTree: {
                        ...formData.familyTree,
                        grandmother: e.target.value
                      }
                    })}
                    placeholder="Grandmother's name"
                  />
                </div>
                <div className="family-member-input">
                  <label>Father:</label>
                  <input 
                    type="text" 
                    value={formData.familyTree.father}
                    onChange={(e) => setFormData({
                      ...formData,
                      familyTree: {
                        ...formData.familyTree,
                        father: e.target.value
                      }
                    })}
                    placeholder="Father's name"
                  />
                </div>
                <div className="family-member-input">
                  <label>Mother:</label>
                  <input 
                    type="text" 
                    value={formData.familyTree.mother}
                    onChange={(e) => setFormData({
                      ...formData,
                      familyTree: {
                        ...formData.familyTree,
                        mother: e.target.value
                      }
                    })}
                    placeholder="Mother's name"
                  />
                </div>
                <div className="family-member-input">
                  <label>Siblings:</label>
                  <input 
                    type="text" 
                    value={formData.familyTree.siblings}
                    onChange={(e) => setFormData({
                      ...formData,
                      familyTree: {
                        ...formData.familyTree,
                        siblings: e.target.value
                      }
                    })}
                    placeholder="Siblings' names (comma separated)"
                  />
                </div>
                <div className="family-member-input">
                  <label>Spouse:</label>
                  <input 
                    type="text" 
                    value={formData.familyTree.spouse}
                    onChange={(e) => setFormData({
                      ...formData,
                      familyTree: {
                        ...formData.familyTree,
                        spouse: e.target.value
                      }
                    })}
                    placeholder="Spouse's name"
                  />
                </div>
                <div className="family-member-input">
                  <label>Children:</label>
                  <input 
                    type="text" 
                    value={formData.familyTree.children}
                    onChange={(e) => setFormData({
                      ...formData,
                      familyTree: {
                        ...formData.familyTree,
                        children: e.target.value
                      }
                    })}
                    placeholder="Children's names (comma separated)"
                  />
                </div>
              </td>
            </tr>

          </table>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className={isEditing ? "update-button" : "add-button"}>
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IPFormModal;
