import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/footer";
import supabase from '../../CONFIG/supabaseClient';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    'Area of Interest 1': '',
    'Area of Interest 2': '',
    'Area of Interest 3': '',
    'Area of Interest 4': ''
  });
  const [editMode, setEditMode] = useState(false);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in.");

      const userTable = user.user_metadata.type === "student" ? "student" : "supervisors";
      setUserType(userTable);

      const { data, error } = await supabase.from(userTable)
        .select('*')
        .eq('email', user.email)
        .single();
      if (error) throw error;
      
      setProfile(data);
      setFormData({
        'Area of Interest 1': data['Area of Interest 1'],
        'Area of Interest 2': data['Area of Interest 2'],
        'Area of Interest 3': data['Area of Interest 3'],
        'Area of Interest 4': data['Area of Interest 4']
      });
    }
    fetchProfile();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from(userType)
        .update(formData)
        .eq('email', profile.email);

      if (error) throw error;

      alert('Profile updated successfully!');
      setEditMode(false);  // Turn off edit mode after successful update
      setProfile({ ...profile, ...formData });  // Update the local profile state
    } catch (error) {
      alert(`Failed to update profile: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="card p-4 shadow-sm" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="card-body">
            <h2 className="card-title mb-4 text-primary">{userType.replace(/^\w/, c => c.toUpperCase())} Profile</h2>
            {editMode ? (
              <form onSubmit={onSubmit}>
                {['Area of Interest 1', 'Area of Interest 2', 'Area of Interest 3', 'Area of Interest 4'].map((field, index) => (
                  <div key={index} className="form-group">
                    <label>{field}</label>
                    <input type="text" className="form-control" name={field} value={formData[field]} onChange={handleChange} />
                  </div>
                ))}
                <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                <button type="button" onClick={() => setEditMode(false)} className="btn btn-secondary mt-3 ml-2">Cancel</button>
              </form>
            ) : (
              <>
                <h3 className="card-title text-primary">{profile.name}</h3>
                <p className="card-text">
                  <strong>Email:</strong> {profile.email}
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-group">
                      {['Area of Interest 1', 'Area of Interest 2', 'Area of Interest 3', 'Area of Interest 4'].map((field, index) => (
                        <li key={index} className="list-group-item">
                          <strong>{field}:</strong> {profile[field]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <button onClick={() => setEditMode(true)} className="btn btn-primary">Edit Profile</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
