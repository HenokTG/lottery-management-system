import { axiosInstance } from '../utils/axios';

export const activityLogFetch = (fetchAPI, setLoading, setActivityList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const ACTIVITYLOGS =
        res.data.data !== undefined
          ? res.data.data.map((activity) => {
              let ACTIVITY = { id: null };
              if (activity.description !== '/api/v1/activity-log') {
                ACTIVITY = {
                  id: activity.id,
                  module: 'NO MODULE!',
                  get type() {
                    let action = '';
                    if (activity.action === 'C') {
                      action = 'Create';
                    } else if (activity.action === 'R') {
                      action = 'Read';
                    } else if (activity.action === 'U') {
                      action = 'Update';
                    } else {
                      action = 'Delete';
                    }

                    return action;
                  },
                  description: activity.description,
                  createdBy: activity.user && `${activity.user.first_name} ${activity.user.last_name}`,
                  role: activity.user && activity.user.role,
                  createdAt: new Date(activity.created_at),
                };
              }

              return ACTIVITY;
            })
          : [];
      setLoading(false);
      setActivityList(ACTIVITYLOGS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setActivityList([]);
    });
};
