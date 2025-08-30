// components/ProfileDoctor/ProfileDoctor.jsx
import React from 'react';
import './ProfileDoctor.scss';
import { LANGUAGES } from '../../../utils';

const ProfileDoctor = ({ doctor, language, priceItem }) => {
  if (!doctor) return null;

  // Lấy tên bác sĩ theo ngôn ngữ
  const nameVi = `${doctor?.positionData?.valueVi || ''}, ${doctor?.lastName || ''} ${doctor?.firstName || ''}`;
  const nameEn = `${doctor?.positionData?.valueEn || ''}, ${doctor?.firstName || ''} ${doctor?.lastName || ''}`;

  return (
    <div className="profile-doctor-component">
      <div className="doctor-header">
        <div
          className="avatar"
          style={{ backgroundImage: `url(${doctor?.image || ''})` }}
        ></div>
        <div className="info">
          <div className="name">
            {language === LANGUAGES.VI ? nameVi : nameEn}
          </div>
          <div className="description">
            {doctor?.markdown?.description || ''}
          </div>
        </div>
      </div>

      <div className="doctor-price">
        <strong>Giá khám:</strong>{' '}
        {priceItem
          ? language === LANGUAGES.VI
            ? `${priceItem.valueVi.toLocaleString()}đ`
            : `$${priceItem.valueEn}`
          : '...'}
      </div>
    </div>
  );
};

export default ProfileDoctor;
