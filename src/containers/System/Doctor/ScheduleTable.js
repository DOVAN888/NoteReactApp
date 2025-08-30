import React from 'react';
import { FormattedMessage } from 'react-intl';

const ScheduleTable = ({ schedules, allTimes, language ,onDelete}) => {
  const mapTimeKeyToLabel = (key) => {
    if (!allTimes || allTimes.length === 0) return key;
    const timeObj = allTimes.find(t => t.key === key);
    return timeObj ? (language === 'vi' ? timeObj.valueVi : timeObj.valueEn) : key;
  };

  return (
    <div className="schedule-list-container">
      {schedules && schedules.length > 0 ? (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th><FormattedMessage id="schedule-list.date" defaultMessage="Ngày khám" /></th>
                <th><FormattedMessage id="schedule-list.times" defaultMessage="Khung giờ" /></th>
                <th><FormattedMessage id="schedule-list.action" defaultMessage="Xóa" /></th>

            </tr>
          </thead>
          <tbody>
            {schedules.map((sch, idx) => (
              <tr key={idx}>
                <td>{sch.date}</td>
                <td>
                  {sch.times.map((timeKey) => mapTimeKeyToLabel(timeKey)).join(', ')}
                    </td>
                    <td>
               {onDelete && (
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(sch.date)}
                  >
                    <FormattedMessage id="schedule-list.delete" defaultMessage="Xóa" />
                  </button>
                )}
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p><FormattedMessage id="schedule-list.empty" defaultMessage="Không có lịch khám nào." /></p>
      )}
    </div>
  );
};

export default ScheduleTable;
