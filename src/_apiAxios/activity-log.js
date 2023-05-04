import { axiosInstance } from '../utils/axios';

export const activityLogFetch = (fetchAPI, setLoading, setActivityList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const ACTIVITYLOGS = res.data.data.map((activity) => {
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
            get performedOn() {
              const desc = activity.description;
              let model = '';
              let capModel = ['Auth : '];
              let modelName = '';

              if (desc.split('/')[3] === 'auth') {
                model = desc.split('/')[4].split('-');
                model.map((word) => capModel.push(`${word.charAt(0).toUpperCase()}${word.slice(1)}`));
                modelName = capModel.join(' ');
              } else {
                capModel = [];
                model = desc.split('/')[3] ? desc.split('/')[3].split('-') : ['root'];
                capModel = model.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`);
                modelName = capModel.join(' ');
              }

              return modelName;
            },
            description: activity.description,
            createdBy: activity.user,
            createdAt: new Date(activity.created_at),
          };
        }

        return ACTIVITY;
      });
      setLoading(false);
      setActivityList(ACTIVITYLOGS.filter((activity) => activity.id !== null));
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setActivityList([]);
    });
};
