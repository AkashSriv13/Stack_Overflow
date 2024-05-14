import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import Avatar from '../../components/Avatar/Avatar';
import EditProfileForm from './EditProfileForm';
import ProfileBio from './ProfileBio';
import './UsersProfile.css';

const UserProfile = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.find((user) => user._id === id);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLocationButtonClick = () => {
    // Navigate to LocationPage when "Get Location" button is clicked
    navigate('/location');
  };

  return (
      <div className='home-container-1'>
        <LeftSidebar />
        <div className="home-container-2">
          <section>
            <div className="user-details-container">
              <div className='user-details'>
                <Avatar backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px'>
                  {currentProfile?.name.charAt(0).toUpperCase()}
                </Avatar>
                <div className="user-name">
                  <h1>{currentProfile?.name}</h1>
                  <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                </div>
              </div>
              {
                  currentUser?.result._id === id && (
                      <>
                        <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                          <FontAwesomeIcon icon={faPen} /> Edit Profile
                        </button>
                        <button type='button' onClick={handleLocationButtonClick} className='location-btn'>
                          Get Location
                        </button>
                      </>
                  )
              }
            </div>
            <>
              {
                Switch ? (
                    <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                ) : (
                    <ProfileBio currentProfile={currentProfile}/>
                )
              }
            </>
          </section>
        </div>
      </div>
  );
};

export default UserProfile;
